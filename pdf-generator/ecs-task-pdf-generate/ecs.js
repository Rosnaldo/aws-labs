require('dotenv/config')
const { startPolling } = require('./sqs-poller')

const MAX_RUNTIME_MS = 10 * 60 * 1000; // 10 minutes

setTimeout(() => {
  console.log('Max runtime reached. Exiting...')
  process.exit(1)
}, MAX_RUNTIME_MS)

startPolling()
