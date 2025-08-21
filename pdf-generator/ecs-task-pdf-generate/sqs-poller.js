const { SQSClient } = require('@aws-sdk/client-sqs')
const { storeHtmlFileLocally } = require('./store-html-file-locally')
const { generatePdf } = require('./generate-pdf')
const { uploadFile } = require('./upload-file')
const { join } = require('path')
const { validateInput } = require('./validate')
const { sqsReceiveMessage } = require('./sqs-receive-message')
const { deleteMessage } = require('./delete-message')

// Polling function
async function pollMessages() {
  const clientSQS = new SQSClient({ region: 'sa-east-1' })
  const pdfTitle = process.env.PDF_TITLE
  const bucket = process.env.S3_BUCKET
  const sqsUrl = process.env.SQS_URL

  try {
    const data = await sqsReceiveMessage(pdfTitle, clientSQS, sqsUrl)

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
        await uploadFile(pdfFile, title, pageN, bucket)

        await deleteMessage(sqsUrl, message)
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
