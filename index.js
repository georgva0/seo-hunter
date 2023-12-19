const piano = require("./helpers/piano");
const ares = require("./helpers/ares");
const urlFix = require("./helpers/urlFix");
const google = require("./helpers/googleSheetsService");
const addLog = require("./helpers/addLog");
const data = require("./data.json");

const init = async () => {
  for (const serviceName of data.serviceNames_final) {
    const payload = await piano.findArticles(serviceName);

    for (const article of payload.DataFeed.Rows) {
      if (article.url.includes("articles")) {
        // const articleJson = await ares.getArticle(article.url.slice(-12));
        const articleJson = await ares.getArticle(
          urlFix.urlResolver(article.url)
        );

        //enrich Optimo article with ARES data
        article.seoHeadline = articleJson?.promo?.headlines?.seoHeadline ?? "Not available";
        article.headline =
          articleJson?.promo?.headlines?.promoHeadline?.blocks[0]?.model?.blocks[0]?.model?.text ?? "Not available" ;
        if (article.seoHeadline == article.headline) {
          article.seoOptimised = false;
        } else {
          article.seoOptimised = true;
        }
      } else {
        // const articleJson = await ares.getAsset(article.url.slice(21));
        const articleJson = await ares.getAsset(
          urlFix.urlResolver(article.url)
        );

        //enrich CPS article with ARES data
        article.headline =
          articleJson?.promo?.headlines?.shortHeadline ?? "Not available";
        article.seoHeadline =
          articleJson?.promo?.headlines?.headline ?? "Not available";

        if (article.seoHeadline == article.headline) {
          article.seoOptimised = false;
        } else {
          article.seoOptimised = true;
        }
      }
    }

    const dataToUpload = payload.DataFeed.Rows.map((item) =>
      Object.values(item)
    );

    await google.handleSpreadsheetData(serviceName, dataToUpload);
  }
  addLog.addNewLine();
};

//start run process

init();
