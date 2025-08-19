const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')

const client = new S3Client({ region: 'sa-east-1' })

// S3 bucket and key
const bucketName = '211-west-pdfs'

async function uploadFile(pdfFile) {
  try {
    const fileStream = fs.createReadStream(pdfFile, title)

    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: title,
      Body: fileStream,
      ContentType: 'image/png', // optional, set MIME type
    }))

    console.log(`File uploaded successfully to s3://${bucketName}/${title}`)
  } catch (err) {
    console.error('Error uploading file:', err)
  }
}

module.exports = {
  uploadFile
}
