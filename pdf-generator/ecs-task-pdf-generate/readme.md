```bash
# authenticate docker to ECR
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

aws ecr create-repository --repository-name pdf-generate
docker compose build

git rev-parse --short HEAD
docker tag pdf-generate:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-generate:latest

docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-generate:latest

# development environment
docker cp ~/.aws [container]:/root/.aws
```

#### test services
`node test.js`
