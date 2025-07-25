#!/bin/bash

exec > /var/log/user-data.log 2>&1
echo "Starting user data script..."

sudo yum update -y
sudo yum install -y nginx

sudo systemctl enable nginx
sudo systemctl start nginx

sudo yum install git -y

git clone https://github.com/Rosnaldo/aws-labs.git /home/ec2-user/aws-labs

sudo cp /home/ec2-user/aws-labs/two-tier/simple/index-init.html \
/var/www/html/index.html
sudo cp /home/ec2-user/aws-labs/two-tier/simple/nginx.init \
/etc/nginx/nginx.conf

sudo nginx -t
sudo systemctl restart nginx

echo "Complete script."