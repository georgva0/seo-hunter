const piano = require("./helpers/piano");
const ares = require("./helpers/ares");
const urlFix = require("./helpers/urlFix");
const google = require("./helpers/googleSheetsService");
const data = require("./data.json");

const init = async () => {
  for (const serviceName of data.serviceNames) {
    const payload = await piano.findArticles(serviceName);

    for (const article of payload.DataFeed.Rows.slice(0, 6)) {
      if (article.url.includes("articles")) {
        // const articleJson = await ares.getArticle(article.url.slice(-12));
        const articleJson = await ares.getArticle(
          urlFix.urlResolver(article.url)
        );

        //enrich Optimo article with ARES data
        article.seoHeadline = articleJson.promo.headlines.seoHeadline;
        article.headline =
          articleJson.promo.headlines.promoHeadline.blocks[0].model.blocks[0].model.text;
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
        article.seoHeadline = articleJson.promo.headlines.headline;
        article.headline = articleJson.promo.headlines.shortHeadline;

        if (article.seoHeadline == article.headline) {
          article.seoOptimised = false;
        } else {
          article.seoOptimised = true;
        }
      }
    }

    console.log(payload.DataFeed.Rows.slice(0, 6));
  }
};

init();
