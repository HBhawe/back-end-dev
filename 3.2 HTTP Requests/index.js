import express from "express";

// logger middleware
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send(
    `<h2>Hello</h2><a href="/about"><button>About</button></a><a href="/contact"><button>Contact</button></a>`,
  );
});

app.get("/about", (req, res) => {
  res.send(
    '<h1>About Me</h1><p>My name is Harshal</p><a href="/"><button>Home</button></a>',
  );
});

app.get("/contact", (req, res) => {
  res.send(
    '<h1>Contact Me</h1><p>Phone: +fkjgbdfklgjq374636</p><a href="/"><button>Home</button></a>',
  );
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
