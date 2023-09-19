const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs/promises");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/recipes/create", async function (req, res) {
  try {
    const data = JSON.parse(await fs.readFile("data.json", "utf8"));
    data.push({ ...req.body, id: (data.length + 1).toString(), rating: 0 });
    await fs.writeFile("data.json", JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).send("Error!");
  }
});

app.post("/recipes/update", async function (req, res) {
  try {
    const data = JSON.parse(await fs.readFile("data.json", "utf8"));
    const findRecipe = data.find((recipe) => {
      return recipe.id === req.body.id;
    });
    Object.assign(findRecipe, req.body);
    await fs.writeFile("data.json", JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).send("Error!");
  }
});

app.post("/auth", async function (req, res) {
  try {
    const data = JSON.parse(await fs.readFile("users.json", "utf8"));

    const findUser = data.find((user) => {
      return (
        user.login === req.body.login && user.password === req.body.password
      );
    });
    if (findUser === undefined) {
      res.status(404).send({ error: "Something failed!" });
    } else {
      res.json(findUser);
    }
  } catch (error) {
    res.status(500).send("Error!");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
