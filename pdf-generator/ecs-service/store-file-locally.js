const { writeFileSync } = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

function storeFileLocally (file, name) {
  const pathFile = join('/var/lib', name)
  console.log(execSync('whoami').toString())
  console.log(execSync('ls -l /var/lib').toString())
  writeFileSync(pathFile, file)
  return pathFile
}

module.exports = {
  storeFileLocally
}
