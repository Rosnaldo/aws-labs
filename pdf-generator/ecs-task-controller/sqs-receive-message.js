const { SQSClient, ReceiveMessageCommand } = require("@aws-sdk/client-sqs")

async function sqsReceiveMessage (pdfTitle, queueUrl) {
  const clientSQS = new SQSClient({ region: 'sa-east-1' })

  try {
    const data = await clientSQS.send(
        new ReceiveMessageCommand({
          MessageAttributeNames: ['All'], // request custom attributes
          AttributeNames: ['All'], // request system attributes
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 10, // up to 10 messages at once
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
