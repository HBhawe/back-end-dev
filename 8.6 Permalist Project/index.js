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

let items = [];

// get all items ordered by ID in ASCENDING
const getItems = async function () {
  try {
    const result = await db.query(`SELECT * FROM items ORDER BY id asc`);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

// Add new item
const insertItem = async (item) => {
  try {
    const creationDate = new Date();
    await db.query(`Insert into items (title, creationdate) values ($1, $2)`, [
      item,
      creationDate,
    ]);
  } catch (error) {
    console.log(error);
  }
};

// update existing item
const updateItem = async (id, newTitle) => {
  try {
    await db.query(`UPDATE items SET title = $1 WHERE id = $2`, [newTitle, id]);
  } catch (error) {
    console.log(error);
  }
};

// delete item
const deleteItem = async (id) => {
  try {
    await db.query(`DELETE FROM items WHERE id = $1`, [id]);
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

// add new item
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await insertItem(item);
  res.redirect("/");
});

// edit item title
app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;
  await updateItem(updatedItemId, updatedItemTitle);
  res.redirect("/");
});

// mark item as done
app.post("/delete", async (req, res) => {
  const { deleteItemId } = req.body;
  await deleteItem(deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
