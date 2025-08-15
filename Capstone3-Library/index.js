"use strict";

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "library",
  password: "2907",
  port: 5432,
});
db.connect();

// usages
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));

// GLOBAL VARIABLES
let books = [];

// FUNCTIONS
const getBooks = async function () {
  try {
    const result = await db.query("SELECT * FROM books order by id asc");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const addBook = async function (title, author, dateRead, olid, note, rating) {
  try {
    const result = await db.query(
      `Insert into books (name, author, read_date, olid, note, rating) VALUES ($1,$2,$3,$4,$5, $6) returning *`,
      [title, author, dateRead, olid, note, rating],
    );
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async function (
  title,
  author,
  dateRead,
  olid,
  note,
  rating,
) {};

const deleteBook = async function (id) {
  try {
    await db.query(`DELETE FROM books WHERE id = ${id}`);
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  books = await getBooks();
  res.render("index.ejs", { books: books });
});

app.get("/new", (req, res) => {
  const newBook = true;
  res.render("new.ejs", { new: newBook });
});

app.post("/new", async (req, res) => {
  const { title, author, dateRead, olid, note, rating } = req.body;
  await addBook(title, author, dateRead, olid, note, rating);
  res.redirect("/");
});

app.post("/editBook", async (req, res) => {
  const id = parseInt(req.body.id);
  const bookIndex = books.findIndex((book) => {
    return book.id === id;
  });

  const currentBook = books[bookIndex];
  res.render("new.ejs", { book: currentBook, new: false });
});

app.post("/edit/:id", async (req, res) => {
  const { dateRead, note, rating } = req.body;
  const id = parseInt(req.params.id);
  console.log(dateRead, note, rating, id);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = parseInt(req.body.id);
  console.log(id);
  await deleteBook(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
