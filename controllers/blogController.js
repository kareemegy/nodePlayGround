const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .then((data) => {
      res.render("index", { title: "All blogs", blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("details", { blog: data, title: "blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_create_get = (req, res) => {
  res.render("create", { title: "CREATE" });
};
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((response) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((data) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const edit_form = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      res.render("editBlog", { blogDATA: data, title: "edit" });
    })
    .catch((err) => {
      console.log(err);
    });
};
const edit_blog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id)
    .then((data) => {
      res.render("editBlog", { blogDATA: data, title: "edit", updated: true });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  edit_form,
  edit_blog
};
