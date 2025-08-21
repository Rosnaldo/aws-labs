const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3')

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const extractFirstNumber = (str) => {
  const match = str.match(/\d+(\.\d+)?/)
  return match ? Number(match[0]) : null
}
const neither = (...args) => !args.some(Boolean)

async function getPdfs (bucket, title) {
  const client = new S3Client({ region: 'sa-east-1' })

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: title,
  })

  async function getObjectAsBuffer(o) {
    const command = new GetObjectCommand({ 
      Bucket: bucket,
      Key: o.key,
      ContentType: 'application/pdf',
    })
    const response = await client.send(command)
    const buffer = await streamToBuffer(response.Body)
    return buffer
  }

  async function getListed(params) {
    const obj = params
          .filter(o => neither(o.Key.endsWith('/'), o.Key.includes('final'))) // filter folders and final.pdf
          .map(o => ({
            key: o.Key,
            page: extractFirstNumber(o.Key.replaceAll(title, '')),
          }))
          .filter(o => typeof o.page === 'number')
    return await Promise.all(
        obj
          .map(async (o) => ({
            buffer: await getObjectAsBuffer(o),
            page: o.page,
          }))
      )
  }

  try {
    const result = await client.send(command)
    const listed = await getListed(result.Contents)
    listed.sort((a, b) => a.page > b.page ? 1 : -1)
  
    const pdfBuffers = listed.map(p => p.buffer)
    return pdfBuffers
  } catch (err) {
    console.log('Error list pdfs: ', err)
    process.exit(1)
  }
}

module.exports = {
  getPdfs
}
