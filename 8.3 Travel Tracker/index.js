import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "2907",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// FUNCTIONS
const getVisitedCountries = async function () {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    let visitedCountries = result.rows;
    let countries = [];
    visitedCountries.forEach((country) => {
      countries.push(country.country_code);
    });
    let total = visitedCountries.length;
    return { countries, total };
  } catch (error) {
    console.error(error.message);
  }
};

// ROUTES

// GET
app.get("/", async (req, res) => {
  const { countries, total } = await getVisitedCountries();
  res.render("index.ejs", { countries: countries, total: total });
});

// POST ADD
app.post("/add", async (req, res) => {
  const input = req.body.country.toLowerCase();

  // guard clause
  if (!input) {
    res.redirect("/");
    return;
  }

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [input],
    );

    const data = result.rows[0];
    let countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode],
      );
      res.redirect("/");
    } catch (error) {
      console.error(error.message);
      const { countries, total } = await getVisitedCountries();
      res.render("index.ejs", {
        countries: countries,
        total: total,
        error: "Country has already been added. Please try again.",
      });
    }
  } catch (err) {
    const { countries, total } = await getVisitedCountries();
    res.render("index.ejs", {
      countries: countries,
      total: total,
      error: "Specified country cannot be found. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
