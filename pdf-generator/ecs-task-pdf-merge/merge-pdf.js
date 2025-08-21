const { PDFDocument } = require('pdf-lib')


async function mergePdf(pdfs) {
  try {
    const mergedPdf = await PDFDocument.create()
  
    for (const pdfBytes of pdfs) {
      const pdf = await PDFDocument.load(pdfBytes)
  
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => mergedPdf.addPage(page))
    }
  
    const mergedPdfFile = await mergedPdf.save()
    console.log('Merged PDF created: merged.pdf')
    return mergedPdfFile
  } catch (err) {
    console.log('Error merge pdf: ', err)
    process.exit(1)
  }
}

module.exports = {
  mergePdf
}
