- create dynamodb table

- create lambda
  - attach policy to lambda role
  ```
  {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"dynamodb:PutItem"
			],
			"Resource": "arn:aws:dynamodb:sa-east-1:<account>:table/<table_name>"
		}
	]
}
  ```
  -  attach code lambda.js

- create HTTP API
  - create route POST, path: register
    - attach lambda