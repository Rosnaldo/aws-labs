# AWS Labs

<br />

## Lambda message broadcast
<img src="lambda-send-sms-and-email/architecture.png" width="50%">

The API Gateway exposes a POST endpoint to receive notification requests from lambda function that invokes a SNS.  
The SNS sends the message to 2 topics. (sms and email)  

[see lambda-send-sms-and-email.md](lambda-send-sms-and-email/readme.md)

<br />

## Two tier VPC
<img src="two-tier/simple/image.png" height="300" />

### Considerations
• Backend can only be ssh accessed via bastion host.  
• Backend allows frontend http requests on port 80.  
• Frontend and bastion host inside a public subnet and backend inside a private subnet.  
• Nginx redirects frontend requests to Api in a isolated URL.  
• Nginx allow https access to frontend on port 443.  
• IG allows public subnet to access internet.  
• NAT Gateway allows private subnet to access internet.  
• Api access DynamoDB via VPC endpoint.  

[see two-tier.md](two-tier/simple/readme.md)

<br />

## Pdf Generator Microservice
<img src="pdf-generator/image.png" width="50%">

A microservice high scalable to convert HTML into PDF.  

• The `SQS` receives a HTML as input.  
• `SQS` triggers `EventBridge Pipe` which then creates `ECS Controller`.  
• `ECS controller` manages the `ECS Generate PDF` and `ECS Merge PDF`.   
• `ECS controller` pulls `SQS` and creates `ECS Generate PDF` instances and wait them to finish the tasks.   
• The number of `ECS Generate` instances depends on the number of PDF pages.  
• `ECS Generate PDF` polls `SQS` messages and uses the HTML to generate PDF using puppetter browser chromium and then stores on `S3`.  
• Once all PDF pages are created `ECS Controller` creates the `ECS Merge PDF`.    
• `ECS Merge PDF` merges all pages into one final PDF.   
