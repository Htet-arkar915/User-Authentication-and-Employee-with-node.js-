const fs = require("fs");

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("created");
  });
} else {
  fs.rmdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("removed");
  });
}
