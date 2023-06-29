const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/data", (req, res) => {
  const data = localStorage.getItem('data');
  res.json(data);

  if (!data) {
    return res.status(404).json({ error: "Data not found" });
  }
  res.json(JSON.parse(data));
});

app.post("/api/data", (req, res) => {
  const newData = req.body;

  const data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(newData);

  localStorage.setItem("data", JSON.stringify(data));

  res.json(data);
});