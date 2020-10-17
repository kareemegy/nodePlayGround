const fs = require("fs");

// read files ( get the file data)
// fs.readFile("./blog.txt", (err, data) => {
//   err ? console.log(err) : console.log(data.toString());
// });

// write files (edit the data)
// fs.writeFile("./blog.txt", "hello world i'm the editor", () => {
//   console.log("file is edited :)");
// });

// create files
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    err ? console.log(err) : console.log("it's done");
  });
}

// delete   
// fs.rmdir("./assets", (err) => {
//   err ? console.log(err) : console.log("i deleted");
// });

if (fs.existsSync("./blog.txt")) {
  fs.unlink("./blog.txt", (err) => {
    console.log(err);
  });
}
