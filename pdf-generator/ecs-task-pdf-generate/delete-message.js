async function  deleteMessage (sqsUrl, message) {
  try {
    await clientSQS.send(new DeleteMessageCommand({
      QueueUrl: sqsUrl,
      ReceiptHandle: message.ReceiptHandle
    }))

    console.log('Deleted message:', message.MessageId)
  } catch (err) {
    console.log('Error deleting message', message.MessageId)
  }
}

module.exports = {
  deleteMessage
}
