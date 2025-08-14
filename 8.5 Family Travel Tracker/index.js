import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "2907",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

const getUsers = async function () {
  try {
    const result = await db.query(`SELECT * FROM users order by id asc`);
    users = result.rows;
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUserCountries = async function () {
  try {
    const result = await db.query(
      `SELECT country_code FROM visited_countries JOIN users ON visited_countries.user_id = users.id WHERE user_id = $1`,
      [currentUserId],
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function checkVisited() {
  let countries = [];
  let result = await getCurrentUserCountries();
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  await getUsers();
  const countries = await checkVisited();

  let currentUser = users.find((user) => user.id === currentUserId);

  if (currentUser === 1) return;

  let color = currentUser.color;

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()],
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode, currentUserId],
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const id = parseInt(req.body.user);
  const add = req.body.add;

  if (add) {
    res.render("new.ejs");
  } else {
    currentUserId = id;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const { name, color } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO users (name, color)
VALUES ($1, $2) returning id;`,
      [name, color],
    );
    let currentID = result.rows[0].id;
    currentUserId = currentID;
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
