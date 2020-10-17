const fs = require("fs");
let counter = 1;
const createStream = fs.createReadStream("./txt.txt");

createStream.on("data", (chunk) => {
  console.log(`data is here ${counter}`);
  console.log(chunk);
  counter++;
});
