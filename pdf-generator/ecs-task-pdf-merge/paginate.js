const { PDFDocument, rgb, StandardFonts } = require('pdf-lib')

async function paginatePdf(pdf) {
  const pdfDoc = await PDFDocument.load(pdf)

  const pages = pdfDoc.getPages()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
  pages.forEach((page, idx) => {
    const { width } = page.getSize()
    const pageNumber = `${idx + 1} / ${pages.length}`
    
    // Draw page number at bottom-center
    page.drawText(pageNumber, {
      x: width / 2 - 20,    // adjust center
      y: 20,                // distance from bottom
      size: 12,
      font,
      color: rgb(0, 0, 0),
    })
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

module.exports = {
  paginatePdf
}
