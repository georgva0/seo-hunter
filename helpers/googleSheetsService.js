const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const sheets = google.sheets("v4");
require("dotenv").config();

const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: "./credentials/keys.json",
  });
  const authToken = await auth.getClient();
  return authToken;
};

const getSpreadSheet = async ({ spreadsheetId, auth }) => {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
};

const getSpreadSheetValues = async ({ spreadsheetId, auth, sheetName }) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
};

// getSpreadSheetValues(
//   "193MgNzp70iMZjLVFR0nZxLkwfw6JdX9GSymGDZ_M-08",
//   auth,
//   "Mundo"
// ).then((data) => console.log(data));

module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
};
