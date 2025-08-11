// IMPORTS
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import morgan from "morgan";
import ejs from "ejs";

//APP INITIALISATION
const app = express();
const port = 3000;

// USAGES
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/jokes", async (req, res) => {
  const result = await axios.get(
    `https://official-joke-api.appspot.com/random_joke`,
  );

  res.render("index.ejs", { joke: result.data });
});

app.get("/cocktails", async (req, res) => {
  const result = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
  );
  let data = JSON.stringify(result.data.drinks[0]);
  console.log(JSON.parse(data));
  res.render("index.ejs", { cocktail: JSON.parse(data) });
});

//LISTENER
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
