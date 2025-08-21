```bash
# authenticate docker to ECR
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

aws ecr create-repository --repository-name pdf-merge
docker compose build

git rev-parse --short HEAD
docker tag pdf-merge:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-merge:latest

docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/pdf-merge:latest
```

#### dev environment
`docker compose build`  
`docker compose up`  
`docker cp ~/.aws pdf-merge:/root/.aws`
`docker run -it --rm pdf-merge`  
