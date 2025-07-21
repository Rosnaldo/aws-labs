#!/bin/bash
sudo yum update -y
sudo yum install -y httpd

sudo systemctl enable httpd
sudo systemctl start httpd

sudo yum install git -y

git clone https://github.com/Rosnaldo/aws-labs.git /home/ec2-user/aws-labs

cp ~/aws-labs/two-tier/simple/index.html /var/www/html/index.html

sudo systemctl restart httpd