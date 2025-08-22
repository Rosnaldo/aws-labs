## ECS Generate PDF

#### Create and push container image to ECR  
```bash
# authenticate docker to ECR
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

aws ecr create-repository --repository-name pdf-generate
docker compose build

git rev-parse --short HEAD
docker tag pdf-generate:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-generate:latest

docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-generate:latest
```

#### Create ECS task  definition
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

#### dev environment
`docker compose build`  
`docker compose up`  
`docker cp ~/.aws pdf-generate:/root/.aws`
`docker run -it --rm pdf-generate`  

#### test services
`node test.js`
