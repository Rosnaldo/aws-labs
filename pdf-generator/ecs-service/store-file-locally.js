const { writeFileSync } = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

function storeFileLocally (file, name) {
  const pathFile = join('/var/lib', name)
  console.log('LIB')
  writeFileSync(pathFile, file)
  console.log(execSync('whoami'))
  return pathFile
}

module.exports = {
  storeFileLocally
}
