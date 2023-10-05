const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
require("dotenv").config();

exports.handleSpreadsheetData = async (service, payload) => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: "./credentials/keys.json",
  });
  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "193MgNzp70iMZjLVFR0nZxLkwfw6JdX9GSymGDZ_M-08";

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: service,
  });

  //return getRows.data.values;

  //write rows to spreadsheet
  googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `${service}!A4:H9`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: payload,
    },
  });

  console.log(`Spreadsheet updated for ${service}`);
};
