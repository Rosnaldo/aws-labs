const fs = require('fs')
const { join } = require('path')
const { storeHtmlFileLocally } = require('./ecs-service/store-html-file-locally')
const { generatePdf } = require('./ecs-service/generate-pdf')
const { uploadFile } = require('./ecs-service/uploadFile')
const { validateInput } = require('./ecs-service/validate')

const filePath = __dirname
const contentHtml = join(filePath, 'index.html')

const title = '211-West'
const decoded = fs.readFileSync(contentHtml).toString()
const pageN = '1'

;(async() => {
  validateInput(encoded, title, pageN)
  const htmlFile = storeHtmlFileLocally(filePath, title, decoded)
  const pdfFile = await generatePdf(htmlFile, filePath, title)
  uploadFile(pdfFile, title, pageN)
  
  console.log(htmlFile)
  console.log(pdfFile)
})()
