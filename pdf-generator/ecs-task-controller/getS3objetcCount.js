const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

async function getS3ObjectCount (bucket, title) {
  const res = await execPromise(`aws s3 ls s3://${bucket}/${title} --recursive | wc -l`)
  const count = Number(res.stdout.replaceAll(/\n/g, ''))
  return count
}

module.exports = {
  getS3ObjectCount
}
