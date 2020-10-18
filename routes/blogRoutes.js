const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// get all blogs
router.get("/", blogController.blog_index);
// new blog  form
router.post("/", blogController.blog_create_post);
// insert new blog
router.get("/create", blogController.blog_create_get);
// view blog details
router.get("/:id", blogController.blog_details);
// view edit blog form
router.get("/edit/:id", blogController.edit_form);
// edit blog
router.post("/edit/:id", blogController.edit_blog);
// delete blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
