import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "authentication",
  password: "2907",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// functions
// GET USER
const getUser = async function (email) {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

// REGISTER USER
const registerUser = async function (email, password) {
  try {
    const result = await db.query(
      `INSERT INTO users (email, password) VALUES ($1, $2);`,
      [email, password],
    );
  } catch (error) {
    console.error(error);
  }
};

// routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const result = await getUser(email);
  if (result.length > 0) {
    res.send(`User already exists!`);
  }

  await registerUser(email, password);
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const user = await getUser(email);

  const userPassword = user?.password;
  if (userPassword === password) {
    res.render("secrets.ejs");
  } else res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
