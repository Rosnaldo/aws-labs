## EventBridge Pipe

create policy `PipeEcsTaskPdfControllerPolicy`
  - rules: `pipe-ecs-task-pddf-controller-policy.json`

create role `EventBridgePipeRole`
- trust entity: file trust-policy.json
- policy: `PipeEcsTaskPdfControllerPolicy`

create eventbridge pipe
  - command: `create-pipe.sh`
