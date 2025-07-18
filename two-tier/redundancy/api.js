const express = require("express");
const app = express();
const port = 80;

// Parse JSON request bodies
app.use(express.json());

// Sample GET endpoint
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Sample POST endpoint
app.post("/add", (req, res) => {
  const data = req.body;
  res.json({ you_sent: data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
