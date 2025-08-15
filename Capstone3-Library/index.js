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

// get books
const getBooks = async function () {
  try {
    const result = await db.query("SELECT * FROM books order by id asc");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

// add a book
const addBook = async function (title, author, dateRead, olid, note, rating) {
  try {
    const creationDate = new Date();
    const result = await db.query(
      `Insert into books (name, author, read_date, olid, note, rating, creation_date) VALUES ($1,$2,$3,$4,$5, $6, $7) returning *`,
      [title, author, dateRead, olid, note, rating, creationDate],
    );
  } catch (error) {
    console.log(error);
  }
};

// update an existing book (only date, note, rating)
const updateBook = async function (dateRead, note, rating, id) {
  try {
    await db.query(
      `UPDATE books SET read_date = $1, note = $2, rating = $3  WHERE id = $4`,
      [dateRead, note, rating, id],
    );
  } catch (error) {
    console.log(error);
  }
};

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
  await updateBook(dateRead, note, rating, id);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = parseInt(req.body.id);
  await deleteBook(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
