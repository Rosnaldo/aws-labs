const { getPdfs } = require('./get-pdfs')
const { mergePdf } = require('./merge-pdf')
const { uploadMergedPdf } = require('./upload-merge-pdf')

async function main () {
  try {
    const pdfs = await getPdfs()
    const merged = await mergePdf(pdfs)
    await uploadMergedPdf(merged)
  } catch (err) {
    console.log('Error task pdf-pdf: ', err)
  }
}

module.exports = {
  main
}
