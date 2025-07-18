# confg ec2 user data

sudo yum update
sudo yum upgrade -y

sudo yum install nginx -y

sudo systemctl start nginx
sudo systemctl enable nginx

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

npm i pm2 -g

sudo yum install git -y
git clone https://github.com/Rosnaldo/aws-labs.git

pm2 start aws-labs/two-tier/redundancy/api.js --name my-nodejs-api

#### test inside ec2 ####
```bash
# should display "Hello, world!"
curl localhost:3000
# should display nginx
curl localhost:80
```
####