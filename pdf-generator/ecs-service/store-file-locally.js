const { writeFileSync } = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

function storeFileLocally (file, name) {
  const pathFile = join('/var/lib', name)
  console.log(execSync('whoami'))
  console.log(execSync('ls -l /var/lib'))
  writeFileSync(pathFile, file)
  return pathFile
}

module.exports = {
  storeFileLocally
}
