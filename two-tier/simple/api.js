const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "sa-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

const port = 3000;

const scanCommand = new ScanCommand({
    TableName: 'Items',
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/items", async (req, res) => {
  const data = await docClient.send(scanCommand);
  return res.json({ result: data['Items'] });
});

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
