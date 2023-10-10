const request = require("request");
const fs = require("fs");

const certFile = fs.readFileSync("./credentials/cert2023.crt");
const keyFile = fs.readFileSync("./credentials/cert2023.key");
const caFile = fs.readFileSync("./credentials/CloudServicesRoot.pem");
const certPass = process.env["CERT_PW"];

exports.getArticle = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("Ares: " + "Calling Ares API - Optimo");
    const opts = {
      cert: `${certFile}`,
      key: `${keyFile}`,
      passphrase: `${certPass}`,
      ca: `${caFile}`,
      headers: {
        Accept: "application/json",
      },
      json: true,
      method: "GET",
      url: `https://ares-api.api.bbci.co.uk/api/article/${id}`,
    };
    request(opts, (err, res, body) => {
      if (err) {
        console.log("Ares: " + err);
      } else if (body === undefined || body === null) {
        console.log("Ares: " + body);
        resolve("404");
      } else {
        resolve(body);
      }
    });
  });
};

exports.getAsset = (assetUri) => {
  return new Promise(function (resolve, reject) {
    console.log(`Calling Ares API (CPS) for asset ${assetUri}`);
    const opts = {
      cert: `${certFile}`,
      key: `${keyFile}`,
      passphrase: `${certPass}`,
      ca: `${caFile}`,
      headers: {
        Accept: "application/json",
      },
      json: true,
      method: "GET",
      url: `https://ares-api.api.bbci.co.uk/api/asset/${assetUri}`,
    };
    request(opts, (err, res, body) => {
      if (err) {
        console.log("Ares: " + err);
      } else if (body === undefined || body === null) {
        console.log("Ares: " + body);
        resolve("404");
      } else if (body.status == 202) {
        resolve("202");
      } else {
        resolve(body);
        console.log(`Data for asset ${assetUri} has been extracted.`);
      }
    });
  });
};
