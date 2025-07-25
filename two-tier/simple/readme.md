# Considerations

• frontend has access to backend via bastion host ssh.  

[1 - Config Private Network](1-private-network)  
[2 - First create public ec2 frontend](2-first-create-public-ec2-frontend)  
[3 - Config public ec2 Ssl](3-config-punlic-ec2-ssl)  

<br />

## 1 - Config Private Network

- create a VPC
  - CIDR 10.0.0.0/16

- create public subnet
  - attach VPC
  - CIDR 10.0.0.0/24
  - auto assing public IP
  
- create a Internet Gateway
  - attach VPC

- create a public route table
  - attach VPC
  - asssociate public subnet
  - routes:
    - destination: 0.0.0.0/0; target: <internet_gateway>

- create a NAT Gateway
  - attach public subnet

- create a private route table
  - attach VPC
  - asssociate private subnet
  - routes:
    - destination: 0.0.0.0/0; target: <nat_gateway>

<br />

## 2 - First create public ec2 frontend

- create EC2 instance
  - name: frontend 
  - attach public subnet
  - auto assing public IP
  - attach secute group:
    - inbound rules:
      - type: HTTP; port: 80
      - type: HTTPS; port: 443
      - type: SSH; port: 22
  - user data: /web-server-user-data.sh

#### test connection ####
```bash
# access browser on url: <ec2_public_ip>  (should access)

#   (should access)
ssh -i <key> ec2-user@<ec2_public_ip>
```
####

<br />

## 2 - Config public ec2 Ssl
create A host on noip with ipv4 <public_ec2_public_ip>

```bash
brew install letsencrypt

# generate path to public and private key
sudo certbot certonly --standalone
```

instal nginx and config ssl:
```bash
sudo yum install nginx

# config nginx.conf
sudo nano /etc/nginx/nginx.conf

sudo systemctl restart nginx
```

#### test public ec2 https request ####
on browser `https://<public_ec2_public_ip>`
####

<br />

## create private ec2 app

- create new role
  - name: DemoRoleEC2-DBReadOnly
  - policy: AmazonDynamoDBReadOnlyAccess

- create EC2 instance
  - name: app 
  - attach private subnet
  - attach secute group:
    - inbound rules:
      - type: SSH; port: 22
  - attach role DemoRoleEC2-DBReadOnly

- create service endpoint
  - attach private route table
  - attach VPC
  - attach service dynamodb

#### test private ec2 access to dynamodb service ####

```bash
scp -i my-key.pem my-key.pem ec2-user@1<ec2_public_ip>:/home/ec2-user/
ssh -i <key> ec2-user@<ec2_public_ip>
# then from inside public ec2 access private ec2:
ssh -i <key> ec2-user@<ec2_private_ip>

# should work
aws ls dynamodb
```
####

