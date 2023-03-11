//const fs = require("fs");
//const path = require("node:path/posix");
//const { pathToFileURL } = require("url");
//
//fs.readFile("./Files/text.txt", (error, data) => {
//  if (error) console.log(error);
//  console.log(data);
//});
//
//fs.writeFile(
//  path.join(__dirname, "Files", "reply.txt"),
//  "Nice To meet you",
//  (error) => {
//    if (error) throw error;
//    console.log("write success");
//  }
//);
//fs.appendFile(
//  path.join(__dirname, "Files", "text.txt"),
//  "This is append text.",
//  (error) => {
//    if (error) throw error;
//    console.log("Added success");
//    fs.rename(
//      path.join(__dirname, "Files", "reply.txt"),
//      path.join(__dirname, "Files", "renameFile.txt"),
//      (err) => {
//        if (err) throw err;
//        console.log("Name Changed");
//      }
//    );
//  }
//);

const path = require("path");

//console.log("Hello");
const fsPromise = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "Files", "text.txt"),
      "utf8"
    );
    await fsPromise.writeFile(
      path.join(__dirname, "Files", "renameFile.txt"),
      data
    );
    await fsPromise.unlink(path.join(__dirname, "Files", "haha.txt"));
    await fsPromise.appendFile(
      path.join(__dirname, "Files", "text.txt"),
      "Hello this is append by fsPromise"
    );

    await fsPromise.rename(
      path.join(__dirname, "Files", "renameFile.txt"),
      path.join(__dirname, "Files", "promiseRenameFile.txt")
    );
    console.log(data);
  } catch (e) {}
};
fileOps();
