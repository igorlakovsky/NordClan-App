const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs/promises");

const app = express();

app.use(cors());

app.get("/recipes", async (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "data.json"));
});

app.get("/recipes/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile("data.json", "utf8"));
    const findValue = data.find((value) => {
      return value.id === req.params.id;
    });
    if (findValue === undefined) {
      res.status(404).send("Not Found!");
    } else {
      res.json(findValue);
    }
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
