const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const { join } = require('path')

const client = new S3Client({ region: 'sa-east-1' })

// S3 bucket and key
const bucketName = '211-west-pdfs'

async function uploadFile(pdfFile, title, pageN) {
  try {
    const fileStream = fs.createReadStream(pdfFile)
    const s3FilePath = join(pageN, title + '.pdf')

    await client.send(new PutObjectCommand({
      Bucket: bucketName,
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
