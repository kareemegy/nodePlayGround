const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//conect to database
const dbURI =
  "mongodb+srv://root:toot@nodetuts.leum2.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("conected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// set the view engine
app.set("view engine", "ejs");

// middlware
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
// blog routes
app.use("/blogs", blogRoutes);

// general routes
app.get("/about", (req, res) => {
  res.render("about", { title: "ABOUT" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
//404 route
app.use((req, res) => {
  res.status(404).render("404", { title: "PAGE NOT FOUND" });
});
app.listen(3000);
