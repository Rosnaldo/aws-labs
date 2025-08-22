EventBridge Pipe
SQS -> ECS Task pdf-generate

create policy PipeEcsTaskPdfControllerPolicy
  - rules: file pipe-ecs-task-pddf-controller-policy.json

create role EventBridgePipeRole
- trust entity: file trust-policy.json
- policy: PipeEcsTaskPdfControllerPolicy

create eventbridge pipe
  - command: create-pipe.sh
