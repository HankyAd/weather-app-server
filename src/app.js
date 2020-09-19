const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Defines paths for express config
const pubDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//sets public path for express
app.use(express.static(pubDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Adam Hankin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Adam Hankin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "This is a solution to your problem",
    name: "Adam Hankin",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, (err, geocode) => {
      if (err) {
        return res.send({ err });
      } else {
        forecast(geocode.lat, geocode.long, (err, forecast) => {
          if (err) {
            return res.send({ err });
          } else {
            const { desc, currentTemp, feelsLikeTemp, humidity } = forecast;
            return res.send({
              currentTemp,
              desc,
              feelsLikeTemp,
              location: geocode.placeName,
              humidity,
            });
          }
        });
      }
    });
  } else {
    res.send({
      error: "MUST PROVIDE ADDRESS",
    });
  }
});

app.get("/products", (req, res) => {
  if (req.query.search) {
    res.send({
      products: [req.query.search],
    });
  } else {
    res.send({
      error: "MUST PROVIDE SEARCH TERM",
    });
  }
});

//404 goes last
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Help Article not found",
    name: "Adam Hankin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Page not found",
    name: "Adam Hankin",
  });
});

app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT" + port);
});
