const { logEvent } = require("./logEvent");
const errorHandler = (err, req, res, next) => {
  logEvent(`${err.nname} : ${err.message}`, "logEvent.txt");
  console.log(err.stack);
  res.status(500).send(err.message);
};
module.exports = errorHandler;
