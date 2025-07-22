#!/bin/bash

exec > /var/log/user-data.log 2>&1

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

npm i --prefix /home/ec2-user/aws-labs/two-tier/simple
pm2 start /home/ec2-user/aws-labs/two-tier/simple/api.js

echo "Complete script."