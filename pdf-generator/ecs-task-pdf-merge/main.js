const { getPdfs } = require('./get-pdfs')
const { mergePdf } = require('./merge-pdf')
const { uploadMergedPdf } = require('./upload-merge-pdf')

async function main () {
  try {
    const bucket = process.env.S3_BUCKET
    const title = process.env.PDF_TITLE
    const pdfs = await getPdfs(bucket, title)
    const merged = await mergePdf(pdfs)
    await uploadMergedPdf(merged, bucket, title)
  } catch (err) {
    console.log('Error task pdf-pdf: ', err)
  }
}

module.exports = {
  main
}
