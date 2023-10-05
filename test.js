const data = [
  { prop1: "A1", prop2: 400 },
  { prop1: "A2", prop2: 800 },
];

const dataToSend = data.map((item) => Object.values(item));

console.log(dataToSend);

//const data = require('./data.json');
//const google = require('./google');

// console.log((new Date(new Date().setDate(new Date().getDate()-32))).toISOString().substr(0, 10))

// const str1 = 'https://www.bbc.com/mundo/articles/cw4j13yqw0jo'

// const urlResolver = (url) => {
//   if(url.includes("articles")){
//       const regexOptimo = /[a-z0-9]{12}/g;

//   return url.match(regexOptimo)[0];
//   }

//   if(url.includes("serbian")){
//       const regexCps = /\/serbian\/[a-z]{3}\/[a-z]*[-]?[\d]{8}/gm

//   return url.match(regexCps)[0];
//   }

//     if(url.includes("zhongwen")){
//       const regexCps = /\/zhongwen\/[a-z]{4}\/[a-z]*[-]?[\d]{8}/gm

//   return url.match(regexCps)[0];
//   }

//   const regexElse = /\/[a-z]+\/[a-z]*[-]?[\d]{8}/gm;
//   return url.match(regexElse)[0];

// }

// console.log(urlResolver(str1))

//google.sendToSpreadsheet("Mundo");
