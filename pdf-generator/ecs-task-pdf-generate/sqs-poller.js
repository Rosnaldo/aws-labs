const { SQSClient, DeleteMessageCommand } = require('@aws-sdk/client-sqs')
const { storeHtmlFileLocally } = require('./store-html-file-locally')
const { generatePdf } = require('./generate-pdf')
const { uploadFile } = require('./uploadFile')
const { join } = require('path')
const { validateInput } = require('./validate')

// AWS SQS client
const client = new SQSClient({ region: 'sa-east-1' })

// Your SQS queue URL
const queueUrl = 'https://sqs.sa-east-1.amazonaws.com/253490794521/pdf-page-queue'

// Polling function
async function pollMessages() {
  const pdfTitle = '211-West'
  try {
    const data = await sqsReceiveMessage(pdfTitle, client)

    if (!data.Messages || data.Messages.length === 0) {
      // No messages, immediately poll again
      console.log('No messages, process exiting')
      return process.exit(0)
    }

    for (const message of data.Messages) {
      try {
        const attributes = message.MessageAttributes

        const filePath = join('/app/data')
        const encoded = attributes?.HtmlContent?.StringValue
        const title = attributes?.Title?.StringValue
        const pageN = attributes?.Page?.StringValue
        validateInput(encoded, title, pageN)
        const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
        const htmlFile = storeHtmlFileLocally(filePath, title, decoded)
        const pdfFile = await generatePdf(htmlFile, filePath, title)
        uploadFile(pdfFile, title, pageN)

        // Delete message after successful processing
        await client.send(new DeleteMessageCommand({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle
        }))
        console.log('Deleted message:', message.MessageId)
      } catch (err) {
        console.error('Error processing message:', err)
        process.exit(1)
        // message stays in the queue, will become visible again
      }
    }
  } catch (err) {
    console.error('Error receiving messages:', err)
    process.exit(1)
  }
}

// Continuous polling loop
async function startPolling() {
  console.log('Initalize ecs task generate pdf...')
  await pollMessages()
  // optional small delay to prevent tight loop when queue is empty
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('SQS poller service started...')
}


module.exports = {
  startPolling
}
