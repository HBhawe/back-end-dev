import express from "express";
const app = express();
const port = 3000;
// const host = "127.0.0.1";

const html = `<!DOCTYPE html>
                        <body> 
                          <p>This is a test</p>
                          </body></html>`;
app.get("/", (req, res) => {
  res.send(html);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
