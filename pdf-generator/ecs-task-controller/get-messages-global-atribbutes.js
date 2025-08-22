const { sqsReceiveFirstMessage } = require("./sqs-receive-first-message")

async function getMessageGlobalAtributter (pdfTitle, sqsUrl) {
  const data = await sqsReceiveFirstMessage(pdfTitle, sqsUrl)

  const noMessages = !data.Messages || data.Messages?.length === 0

  if (noMessages) {
    process.exit(0)
  }

  const attributes = firstMessage.Messages[0]
  const { TotalPage, Title } = attributes
  return { pdfTotalPage: TotalPage, pdfTitle: Title }
}

module.exports = {
  getMessageGlobalAtributter
}
