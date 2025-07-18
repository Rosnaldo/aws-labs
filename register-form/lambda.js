import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "sa-east-1" }); // change to your region

const dynamo = DynamoDBDocumentClient.from(client);


export const handler = async (event) => {
    try {
        console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2))
        console.info("EVENT\n" + JSON.stringify(event, null, 2))
        console.warn("Event not processed.")
        const body = JSON.parse(event.body || '{}');
        const email = body.email;

        const item = {
            email,
        };

        const command = new PutCommand({
            TableName: "register-form", // <-- change to your table name
            Item: item
        });

        const newItem = await dynamo.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Item added",
                item
            })
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to add item" })
        };
    }
};