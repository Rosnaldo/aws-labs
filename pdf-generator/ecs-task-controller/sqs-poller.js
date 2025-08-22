const { createEcsTaskPdfGenerate } = require('./create-ecs-task-pdf-generate')
const { getS3ObjectCount } = require('./getS3objetcCount')
const { sqsReceiveMessage } = require('./sqs-receive-message')
const { getMessageGlobalAtributter } = require('./get-messages-global-atribbutes')

// Polling function
async function pollMessages() {
  try {
    const bucket = process.env.S3_BUCKET
    const sqsUrl = process.env.SQS_URL

    const { pdfTotalPage, pdfTitle } = await getMessageGlobalAtributter(pdfTitle, sqsUrl)
    
    const data = await sqsReceiveMessage(pdfTitle, sqsUrl)

    const noMessages = !data.Messages || data.Messages?.length === 0

    if (noMessages) {
      const count = await getS3ObjectCount(bucket, pdfTitle)

      if (count === pdfTotalPage) {
        console.log('pdf has finished')
        process.exit(0)
      }

      // No messages, immediately poll again
      console.log('No messages was found')
      process.exit(0)
    } else {
      await createEcsTaskPdfGenerate(sqsUrl, bucket, pdfTitle, pdfTotalPage)
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
