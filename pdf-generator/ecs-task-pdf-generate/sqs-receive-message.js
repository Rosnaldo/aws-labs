// Your SQS queue URL
const queueUrl = 'https://sqs.sa-east-1.amazonaws.com/253490794521/pdf-page-queue'

async function sqsReceiveMessage (pdfTitle, clientSQS) {
  try {
    const data = await clientSQS.send(
        new ReceiveMessageCommand({
          MessageAttributeNames: ['All'], // request custom attributes
          AttributeNames: ['All'], // request system attributes
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 5, // up to 5 messages at once
          WaitTimeSeconds: 20,     // long polling
          VisibilityTimeout: 30,
          MessageAttributes: {
          messageType: {
            DataType: "String",
            StringValue: pdfTitle
          }
        }    // time for processing messages
      }))
    return data
  } catch (err) {
    console.error('Error receiving the message:', err)
    process.exit(1)
  }
}

module.exports = {
  sqsReceiveMessage
}
