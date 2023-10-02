const fs = require("fs");

exports.addNewLine = () => {
  const latestLog = `\n The calculation was last performed on ${new Date().toLocaleString(
    "en-GB"
  )}`;
  fs.appendFile("./log.txt", latestLog, (err) => {
    if (err) throw err;
  });
  console.log("The latest log was appended to file.");
};
