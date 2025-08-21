const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3')

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

async function getPdfs (bucket, title) {
  const client = new S3Client({ region: 'sa-east-1' })

  async function getObjectAsBuffer(bucket, key) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key })
    const response = await client.send(command);
    return streamToBuffer(response.Body) // Buffer
  }
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: title,
  })

  try {
    const listed = await client.send(command)
    const pdfBuffers = await Promise.all(
      listed.Contents.filter(o => o.Key).map(async (obj) => {
        const buffer = await getObjectAsBuffer(bucket, obj.Key)
        return { key: obj.Key, buffer }
      })
    )
  
    return pdfBuffers
  } catch (err) {
    console.log('Error list pdfs: ', err)
    process.exit(1)
  }
}

module.exports = {
  getPdfs
}
