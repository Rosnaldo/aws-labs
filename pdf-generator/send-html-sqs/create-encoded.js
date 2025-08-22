const { join } = require('path')
const { readFileSync } = require('fs')

function createEncoded () {
  const filePath = join(__dirname, 'index.html')
  const page1 = readFileSync(filePath).toString()
  const encoded = Buffer.from(page1).toString('base64')
  return encoded
}

module.exports = {
  createEncoded
}
