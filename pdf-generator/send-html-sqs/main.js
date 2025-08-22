const { createEncoded } = require('./create-encoded')
const { sendHtmlsToSQS } = require('./send-to-sqs')

async function main () {
  try {
    const sqsUrl = process.env.SQS_URL
    const title = process.env.PDF_TITLE

    const encoded = createEncoded()
    await sendHtmlsToSQS(sqsUrl, encoded, title)
  } catch (err) {
    console.log('Error send htmls to sqs: ', err)
  }
}

module.exports = {
  main
}
