import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = await response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);

  const type = req.body["type"];
  const participants = req.body["participants"];

  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?${type ? `type=${type}` : "type=''"}${participants ? `&participants=${participants}` : "&participants=''"}`,
    );
    const result = await response.data;
    let activity;
    let length = result.length;
    let randomElement = Math.floor(Math.random() * length);
    activity = result[randomElement];

    console.log(activity);
    res.render("index.ejs", { data: activity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    const errorMessage = `No activities that match your criteria`;
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
