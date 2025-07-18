import json
import boto3

sns = boto3.client('sns', region_name='sa-east-1')

def lambda_handler(event, context):
    body = event['body']
    message = body['message']
    notification_type = body['type']
    topicArn='arn:aws:sns:region:account-id:send_message'
    
    if notification_type == 'sms':
        sns_response = sns.publish(
            PhoneNumber='+phone_number',
            Message=message
        )

    elif notification_type == 'email':
        sns_response = sns.publish(
            TopicArn=topicArn,
            Message=message,
            Subject="Notification"
        )
   
    return {
        'statusCode': 200,
        'body': json.dumps('Notification sent successfully!')
    }