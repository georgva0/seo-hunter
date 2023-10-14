exports.urlResolver = (url) => {
  if (url.includes("articles")) {
    const regexOptimo = /[a-z0-9]{12}/g;

    return url.match(regexOptimo)[0];
  }

  // if (url.includes("serbian")) {
  //   const regexCps = /\/serbian\/[a-z]{3}\/[a-z]*[-]?[\d]{8}/gm;

  //   return url.match(regexCps)[0];
  // }

  // if (url.includes("zhongwen")) {
  //   const regexCps = /\/zhongwen\/[a-z]{4}\/[a-z]*[-]?[\d]{8}/gm;

  //   return url.match(regexCps)[0];
  // }

  //const regexElse = /\/[a-z]+\/[a-z]*[-]?[\d]{8}/gm;
  //const regexElse = /\/[a-z]+\/\S*[-]?[\d]{8}/gm;
  const regexElse = /(?<=\.com)\S+\d{8}/gm;
  return url.match(regexElse)[0];
};
