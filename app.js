const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
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
// db routes for test
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "MOre about my blog ",
  });
  blog
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5f8848860b146b14c8ab5e3c")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.render("index", { title: "All blogs", blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "ABOUT" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((response) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "CREATE" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("details", { blog: data, title: "blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((data) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/edit/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("editBlog", { blogDATA: data, title: "edit" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/blogs/edit/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id)
    .then((data) => {
      res.render("editBlog", { blogDATA: data, title: "edit", updated: true });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "PAGE NOT FOUND" });
});
app.listen(3000);
