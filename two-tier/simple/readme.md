### First create public ec2 frontend

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

- create EC2 instance
  - name: frontend 
  - attach public subnet
  - auto assing public IP
  - attach secute group:
    - inbound rules:
      - type: HTTP; port: 80
      - type: HTTPS; port: 443
      - type: SSH; port: 22
  - user data:
    ```bash
      sudo yum update -y
      sudo yum install -y nginx
      sudo yum service nginx start
    ```

#### test connection ####
```bash
# access browser on url: <ec2_public_ip>  (should access)

#   (should access)
ssh -i <key> ec2-user@<ec2_public_ip>
```
####


## create private ec2 app

- create private subnet
  - attach VPC
  - CIDR 10.0.1.0/24
  
- create a private route table
  - attach VPC
  - asssociate private subnet

- create new role
  - name: DemoRoleEC2-S3RedOnly
  - policy: AmazonDynamoDBReadOnlyAccess

- create EC2 instance
  - name: app 
  - attach private subnet
  - attach secute group:
    - inbound rules:
      - type: SSH; port: 22
  - attach role DemoRoleEC2-S3RedOnly

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

