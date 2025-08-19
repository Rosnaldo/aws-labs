const puppeteer = require('puppeteer')

async function generatePdf(filePath) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Load a local HTML file
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' })
  const pdfFile = filePath + '.pdf'
  // Generate PDF
  await page.pdf({
    path: pdfFile,
    format: 'A4',
    printBackground: true, // keeps background colors/images
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  })

  await browser.close()
  console.log('PDF generated: ', pdfFile)

  return pdfFile
}

module.exports = {
  generatePdf
}