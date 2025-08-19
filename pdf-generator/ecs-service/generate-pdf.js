const puppeteer = require('puppeteer')
const { join } = require('path')

async function generatePdf(htmlFile, filePath, title) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const pdfFile = join(filePath, title + '.pdf')
  // Load a local HTML file
  await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0' })
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