const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs')


async function createEcsTaskPdfGenerate (sqsUrl, bucket, pdfTitle, pdfTotalPage) {
  const ecs = new ECSClient({ region: 'sa-east-1' })
  const taskN = Math.ceil(pdfTotalPage / 5)
  try {
    const command = new RunTaskCommand({
      cluster: 'cuddly-hippopotamus-bocwo8',
      taskDefinition: 'pdf-generate:3',
      launchType: 'FARGATE',
      count: taskN,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: ['subnet-004bef3b37d8a24d4'],
          securityGroups: ['sg-08b3d98cc37d5aec2'],
          assignPublicIp: 'ENABLED',
        }
      },
      overrides: {
        containerOverrides: [
          {
            name: 'pdf-generate',
            command: ['npm', 'run', 'start'],
            environment: [
              { name: 'SQS_URL', value: sqsUrl },
              { name: 'S3_BUCKET', value: bucket },
              { name: 'PDF_TITLE', value: pdfTitle },
            ]
          }
        ]
      }
    })

    console.log('PdfGenerate Task started:', response.tasks?.[0]?.taskArn)
    const response = await ecs.send(command)
    const taskArns = response.tasks.map(t => t.taskArn)
    await waitUntilTasksStopped(
      { client: ecs, maxWaitTime: 900 },
      { cluster: 'cuddly-hippopotamus-bocwo8', tasks: taskArns }
    )
  } catch (err) {
    console.error('Error running task:', err)
  }
}

module.exports = {
  createEcsTaskPdfGenerate
}
