const { getS3ObjectCount } = require('./getS3objetcCount')
const { sqsReceiveMessage } = require('./sqs-receive-message')

// Polling function
async function pollMessages() {
  try {
    const pdfPageCount = process.env.PDF_PAGE_COUNT
    const pdfTitle = process.env.PDF_TITLE
    const bucket = process.env.S3_BUCKET
    const sqsUrl = process.env.SQS_URL

    const data = await sqsReceiveMessage(pdfTitle, sqsUrl)

    const noMessages = !data.Messages || data.Messages?.length === 0

    console.log('Message count: ', data.Messages?.length)
    if (noMessages) {
      const count = await getS3ObjectCount(bucket)
      console.log('s3 object count ', count)
      if (count === pdfPageCount) {
        console.log('pdf has finished')
        process.exit(0)
      }

      // No messages, immediately poll again
      console.log('No messages, immedialy poll again')
      return
    }
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

// Continuous polling loop
async function startPolling() {
  while (true) {
    console.log('Initalize ecs task controller...')
    await pollMessages()
    // optional small delay to prevent tight loop when queue is empty
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('SQS poller service started...')
  }
}


module.exports = {
  startPolling
}
