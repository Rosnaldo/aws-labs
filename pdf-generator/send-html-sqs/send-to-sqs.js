const { SQSClient, SendMessageBatchCommand } = require('@aws-sdk/client-sqs')

const client = new SQSClient({ region: 'sa-east-1' })

async function sendHtmlsToSQS(sqsUrl, htmlContent, title) {
  const objs = [1, 2, 3].map(i => ({
    Id: i.toString(),
    MessageBody: JSON.stringify({
      eventType: 'GeneratePdf',
      timestamp: new Date().toISOString(),
    }),
    MessageAttributes: {
      HtmlContent: {
        DataType: 'String',
        StringValue: htmlContent,
      },
      Title: {
        DataType: 'String',
        StringValue: title,
      },
      Page: {
        DataType: 'String',
        StringValue: i.toString(),
      },
    },
  }))

  const params = {
    QueueUrl: sqsUrl,
    Entries: objs,
  }

  try {
    const result = await client.send(new SendMessageBatchCommand(params))
    console.log('Message sent:', result)
  } catch (err) {
    console.error('Error sending message:', err)
  }
}

module.exports = {
  sendHtmlsToSQS
}
