## lambda send sms and email

The API Gateway exposes a POST endpoint to receive notification requests from lambda function that invokes a SNS.  
The SNS sends the message to 2 topics. (sms and email)  

<img src="architecture.png" width="50%">

- create sns
  - attach topic protocol EMAIL
  - attach topic protocol SMS

- create lambda
  - attach code ./lambda.py
  - add SNS access to permission to the role

- create a API Gateway (REST API)
  - create POST endpoint
  - attach lambda
  - deploy stage "dev"
  
```bash
curl -X POST [endpoint] \
  -H "Content-Type: application/json" \
  -d '{"body": { "message": "value", "type": "sms"} }'
```