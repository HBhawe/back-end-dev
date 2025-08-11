import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "hbhawe";
const yourPassword = "darthvader480";
const yourAPIKey = "60b8469b-6c16-4baf-8a91-8dbb52c3cdf3";
const yourBearerToken = "d681ad2f-f4a9-414c-a319-cafdd8a9b1ac";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    const errorMessage = `No activities that match your criteria`;
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    const errorMessage = `No activities that match your criteria`;
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}filter?score=5&apiKey=${yourAPIKey}`,
    );
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    const errorMessage = `No activities that match your criteria`;
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    const errorMessage = `No activities that match your criteria`;
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
