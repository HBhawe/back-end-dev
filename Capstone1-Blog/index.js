// IMPORTS
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

// INITIALISE APP AND PORT
const app = express();
const port = 3000;

// USAGES
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

const posts = [];

app.get("/", (req, res) => {
  res.render("list.ejs", { posts: posts });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  const object = {
    title,
    content,
  };
  posts.push(object);
  res.render("list.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
