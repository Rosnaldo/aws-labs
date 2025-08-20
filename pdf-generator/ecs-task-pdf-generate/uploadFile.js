const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const { join } = require('path')


async function uploadFile(pdfFile, title, pageN, bucket) {
  const client = new S3Client({ region: 'sa-east-1' })
  try {
    const fileStream = fs.createReadStream(pdfFile)
    const s3FilePath = join(pageN, title + '.pdf')

    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: s3FilePath,
      Body: fileStream,
      ContentType: 'image/png', // optional, set MIME type
    }))

    console.log(`File uploaded successfully to s3://${s3Path}`)
    return s3FilePath
  } catch (err) {
    console.error('Error uploading file:', err)
    process.exit(1)
  }
}

module.exports = {
  uploadFile
}
