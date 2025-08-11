import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

// GET ROUTE
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/random`,
    );
    const data = response.data;
    res.render("index.ejs", {
      secret: data.secret,
      user: data.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
