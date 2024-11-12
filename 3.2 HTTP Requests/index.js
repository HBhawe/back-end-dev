import express from "express";

// logger middleware
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Harshal</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>Phone: +fkjgbdfklgjq374636</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
