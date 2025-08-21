const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { join } = require('path')
const { createReadStream, writeFileSync } = require('fs')

async function uploadMergedPdf(pdfFile, bucket, title) {
  const client = new S3Client({ region: 'sa-east-1' })
  try {
    const s3FilePath = join(title, 'final.pdf')
    const path = join(__dirname, 'final.pdf')
    writeFileSync(path, pdfFile)
    const fileStream = createReadStream(path)

    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: s3FilePath,
      Body: fileStream,
      ContentType: 'application/pdf', // optional, set MIME type
    }))

    console.log(`File uploaded successfully to s3://${s3FilePath}`)
  } catch (err) {
    console.error('Error uploading file:', err)
    process.exit(1)
  }
}

module.exports = {
  uploadMergedPdf
}
