import express from "express";

// logger middleware
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));

let navigator = `<nav><a href="/"><button>Home</button></a><a href="/about"><button>About</button></a><a href="/contact"><button>Contact</button></a></nav>`;

app.get("/", (req, res) => {
  res.send(`${navigator}<h2>Hello</h2>`);
});

app.get("/about", (req, res) => {
  res.send(`${navigator}<h1>About Me</h1><p>My name is Harshal</p>`);
});

app.get("/contact", (req, res) => {
  res.send(`${navigator}<h1>Contact Me</h1><p>Phone: +fkjgbdfklgjq374636</p>`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
