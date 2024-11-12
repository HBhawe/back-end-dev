import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

// directory settings
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const bandName = function (req) {
  let { street, pet } = req.body;
  return `${street}${pet}`;
};

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  let name = bandName(req);
  res.send(`<h1>Your band name is</h1>
                  <h2>${name}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
