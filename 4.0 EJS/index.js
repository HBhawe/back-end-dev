import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const generateAdvice = function (day) {
  const info = {};
  if (day === 0 || day === 6) {
    info.dayType = "weekend";
    info.advice = ", it's time to have fun";
  } else {
    info.dayType = "weekday";
    info.advice = ", it's time to work hard";
  }
  return info;
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let date = new Date();
  let day = date.getDay();
  let { dayType, advice } = generateAdvice(day);
  res.render(__dirname + "/views/index.ejs", {
    dayType: dayType,
    advice: advice,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
