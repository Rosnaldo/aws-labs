const { writeFileSync } = require('fs')
const { join } = require('path')

function storeFileLocally (file, name) {
  const pathFile = join('/var/lib', name)
  writeFileSync(pathFile, file)
  return pathFile
}

module.exports = {
  storeFileLocally
}
