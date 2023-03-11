const fs = require("fs");
const rs = fs.createReadStream("./Files/text.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./Files/new-text");

rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
  console.log(dataChunk);
});

rs.pipe(ws);
