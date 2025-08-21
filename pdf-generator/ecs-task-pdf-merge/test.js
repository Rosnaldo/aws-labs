require('dotenv/config')
const { mergePdf } = require('./merge-pdf')
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { getPdfs } = require('./get-pdfs')
const { uploadMergedPdf } = require('./upload-merge-pdf')

async function testGetPdfs () {
  const bucket = process.env.S3_BUCKET
  const title = process.env.PDF_TITLE
  const firstPath = join(__dirname, '1.pdf')
  const pdfs = await getPdfs(bucket, title)
  const firstPdf = pdfs[0].buffer
  writeFileSync(firstPath, firstPdf)
}

async function testPdfMerge () {
  const samplePath = join(__dirname, 'sample.pdf')
  const finalPath = join(__dirname, 'merged.pdf')
  const pdf = await readFileSync(samplePath)
  const pdf2 = await readFileSync(samplePath)
  const pdfs = [pdf, pdf2]

  const merged = await mergePdf(pdfs)

  writeFileSync(finalPath, merged)
}

async function testUploadPdf () {
  const bucket = process.env.S3_BUCKET
  const title = process.env.PDF_TITLE 
  const samplePath = join(__dirname, 'sample.pdf')
  const pdf = await readFileSync(samplePath)
  await uploadMergedPdf(pdf, bucket, title)
}

;(async () => {
  // await testGetPdfs()
  // await testPdfMerge()
  await testUploadPdf()
})()