function validateInput (encoded, title, pageN) {
  if (!encoded) throw Error('encoded is invalid: ', encoded)
  if (!title) throw Error('title is invalid: ', title)
  if (!pageN) throw Error('pageN is invalid: ', pageN)
}

module.exports = {
  validateInput
}
