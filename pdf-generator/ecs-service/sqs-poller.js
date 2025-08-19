const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs')
const { storeFileLocally } = require('./store-file-locally')
const { generatePdf } = require('./generate-pdf')
const { uploadFile } = require('./uploadFile')

// AWS SQS client
const client = new SQSClient({ region: 'sa-east-1' })

// Your SQS queue URL
const queueUrl = 'https://sqs.sa-east-1.amazonaws.com/253490794521/pdf-page-queue'

// Polling function
async function pollMessages() {
  try {
    const data = await client.send(new ReceiveMessageCommand({
      MessageAttributeNames: ['All'], // request custom attributes
      AttributeNames: ['All'], // request system attributes
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10, // up to 10 messages at once
      WaitTimeSeconds: 20,     // long polling
      VisibilityTimeout: 30    // time for processing messages
    }))

    console.log('data.Messages', data, data.Messages)

    if (!data.Messages || data.Messages.length === 0) {
      // No messages, immediately poll again
      return
    }

    for (const message of data.Messages) {
      try {
        const attributes = message.MessageAttributes
        console.log('Received message:', JSON.stringify(attributes))

        const encoded = attributes.HtmlContent
        const title = attributes.Title
        const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
        const pathFile = storeFileLocally(decoded, title)
        const pdfFile = generatePdf(pathFile)
        uploadFile(pdfFile)

        // Delete message after successful processing
        await client.send(new DeleteMessageCommand({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle
        }))
        console.log('Deleted message:', message.MessageId)
      } catch (err) {
        console.error('Error processing message:', err)
        // message stays in the queue, will become visible again
      }
    }
  } catch (err) {
    console.error('Error receiving messages:', err)
  }
}

// Continuous polling loop
async function startPolling() {
  while (true) {
    await pollMessages()
    // optional small delay to prevent tight loop when queue is empty
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('SQS poller service started...')
  }
}


module.exports = {
  startPolling
}
