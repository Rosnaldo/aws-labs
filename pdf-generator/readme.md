# authenticate docker to aws account

aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin [account_id].dkr.ecr.sa-east-1.amazonaws.com

aws ecr create-repository --repository-name [repo_name]
docker build -t [image_name] .

docker tag [image_name]:latest [account_id].dkr.ecr.sa-east-1.amazonaws.com/[image_name]:latest

docker push [account_id].dkr.ecr.sa-east-1.amazonaws.com/[image_name]:latest


# development environment
docker cp ~/.aws [container]:/root/.aws
