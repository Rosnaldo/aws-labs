const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const { readFileSync } = require('fs')
const path = require('path')

const client = new SQSClient({ region: 'sa-east-1' })

const filePath = path.join(__dirname, 'index.html')
const page1 = readFileSync(filePath).toString()
const encoded = Buffer.from(page1).toString('base64')

async function sendEvent() {
  const params = {
    QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/253490794521/pdf-page-queue',
    MessageBody: JSON.stringify({
      eventType: 'GeneratePdf',
      timestamp: new Date().toISOString(),
    }),
    MessageAttributes: {
      HtmlContent: {
        DataType: 'String',
        StringValue: encoded,
      },
      Title: {
        DataType: 'String',
        StringValue: '211-West',
      },
      Page: {
        DataType: 'String',
        StringValue: '1'
      }
    },
  }

  try {
    const result = await client.send(new SendMessageCommand(params))
    console.log('Message sent:', result.MessageId)
  } catch (err) {
    console.error('Error sending message:', err)
  }
}

sendEvent()
