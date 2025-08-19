const { writeFileSync } = require('fs')
const { join } = require('path')

function storeHtmlFileLocally (filePath, title, data) {
  const fileHtml = join(filePath, title, '.html')
  writeFileSync(fileHtml, data)
  return fileHtml
}

module.exports = {
  storeHtmlFileLocally
}
