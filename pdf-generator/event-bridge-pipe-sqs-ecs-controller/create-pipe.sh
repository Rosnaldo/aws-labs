aws pipes create-pipe \
  --name sqs-page-queue-to-ecs-pdf-controller-pipe \
  --role-arn arn:aws:iam::[account_id]:role/EventBridgePipeRole \
  --source arn:aws:sqs:sa-east-1:[account_id]:pdf-page-queue \
  --target arn:aws:ecs:sa-east-1:[account_id]:cluster/[ecs_cluster] \
  --target-parameters '{
    "EcsTaskParameters": {
      "TaskDefinitionArn": "arn:aws:ecs:sa-east-1:[account_id]:task-definition/my-pdf-controller:1",
      "LaunchType": "FARGATE",
      "NetworkConfiguration": {
        "awsvpcConfiguration": {
          "Subnets": ["public_subnet_id"],
          "AssignPublicIp": "ENABLED",
          "SecurityGroups": ["ecs_sg_id"]
        }
      }
    }
  }'