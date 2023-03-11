require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connnectDb = require("./config/dbConn");
const PORT = process.env.PORT || 3500;
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
connnectDb();

app.use(logger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
//app.use("/subdir", require("./routes/subdir"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

//app.get(
//  "/hello(.html)?",
//  (req, res, next) => {
//    console.log("attempt to load hello.html");
//    next();
//  },
//  (req, res) => {
//    res.send("Hello World!");
//  }
//);
//
//const one = (req, res, next) => {
//  console.log("one");
//  next();
//};
//const two = (req, res, next) => {
//  console.log("two");
//  next();
//};
//const three = (req, res) => {
//  console.log("three");
//  res.send("Finished!");
//};
//
//app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDb");
  app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
});

//const http = require("http");
//const pathdir = require("path");
//const fs = require("fs");
//const fsPromise = require("fs").promises;
//
//const logEvent = require("./logEvent");
//const EventEmitter = require("events");

//const { url } = require("inspector");
//class Emitter extends EventEmitter {}
//
//const myEmitter = new Emitter();
//
//myEmitter.on("log", (msg, fileName) => logEvent(msg, fileName));
//
//let contentType;

//
//
//const serveFile = async (filePath, contentType, response) => {
//  try {
//    const rawData = await fsPromise.readFile(
//      filePath,
//      !contentType.includes("image") ? "utf8" : ""
//    );
//    const data =
//      contentType === "application/json" ? JSON.parse(rawData) : rawData;
//    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
//      ContentType: contentType,
//    });
//    response.end(data);
//  } catch (err) {
//    console.log(err);
//    myEmitter.emit("log", `${err.name} \t ${err.message}`, "errLog.txt");
//    response.statusCode = 500;
//    response.end();
//  }
//};
//
//const server = http.createServer((req, res) => {
//  console.log(req.url, req.method);
//  const extension = pathdir.extname(req.url);
//  myEmitter.emit("log", `${req.url} \t ${req.method}`, "reqLog.txt");
//
//  // let path;
//  //res.statusCode = 200;
//  //res.setHeader("Content-Type", "text/html");
//  //path = pathdir.join(__dirname, "views", "index.html");
//  //fs.readFile(path, "utf8", (err, data) => {
//  //  res.end(data);
//  //});
//  switch (extension) {
//    case ".css":
//      contentType = "text/css";
//      break;
//    case ".js":
//      contentType = "text/javascript";
//      break;
//    case ".json":
//      contentType = "application/json";
//      break;
//    case ".jpg":
//      contentType = "image/jpeg";
//      break;
//    case ".png":
//      contentType = "image/.png";
//      break;
//    case ".txt":
//      contentType = "text/plain";
//      break;
//    default:
//      contentType = "text/html";
//      break;
//  }
//
//  let filePath =
//    contentType === "text/html" && req.url === "/"
//      ? path.join(__dirname, "views", "index.html")
//      : contentType === "text/html" && req.url.slice(-1) === "/"
//      ? path.join(__dirname, "views", req.url, "index.html")
//      : contentType === "text/html"
//      ? path.join(__dirname, "views", req.url)
//      : path.join(__dirname, req.url);
//
//  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
//
//  const fileExist = fs.existsSync(filePath);
//
//  if (!fileExist) {
//    switch (path.parse(filePath).base) {
//      case "old-page.html":
//        res.writeHead(301, { Location: "/new-page.html" });
//        res.end();
//        break;
//      case "www-page.html":
//        res.writeHead(301, { Location: "/" });
//        res.end();
//        break;
//      default:
//        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
//    }
//  } else {
//    serveFile(filePath, contentType, res);
//  }
//});

//myEmitter.on("log", (msg) => logEvent(msg));
//
//  myEmitter.emit("log", "event log emitted");
