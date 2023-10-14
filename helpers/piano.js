const fetch = require("cross-fetch");
const serviceFix = require("./serviceFix");
require("dotenv").config();

const username = process.env["PIANO_USERNAME"];
const password = process.env["PIANO_PASSWORD"];

exports.findArticles = async (service) => {
  const response = await fetch("https://api.atinternet.io/v3/data/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(username + ":" + password, "utf8").toString("base64"),
    },
    body: JSON.stringify({
      columns: [
        "site_level2",
        "url",
        "pub_update_date",
        "m_unique_visitors",
        "m_visits",
      ],
      sort: ["-m_unique_visitors"],
      filter: {
        property: {
          $AND: [
            {
              site_level2: {
                $eq: service,
              },
            },
            {
              url: {
                $neq: `https://www.bbc.com/${serviceFix
                  .serviceFix(service)
                  .toLowerCase()}`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/${serviceFix
                  .serviceFix(service)
                  .toLowerCase()}.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/zhongwen/simp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/zhongwen/simp.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/zhongwen/trad`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/zhongwen/trad.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/serbian/lat`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/serbian/lat.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/serbian/cyr`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/serbian/cyr.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/uzbek.amp`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/uzbek#`,
              },
            },

            {
              url: {
                $neq: `https://www.bbc.com/uzbek`,
              },
            },

            {
              url: {
                $empty: false,
              },
            },

            {
              url: {
                $nlk: `https://www.bbc.com/${serviceFix
                  .serviceFix(service)
                  .toLowerCase()}/live/`,
              },
            },

            {
              url: {
                $nlk: `https://www.bbc.com/${serviceFix
                  .serviceFix(service)
                  .toLowerCase()}?ocid`,
              },
            },

            {
              url: {
                $nlk: `https://www.bbc.com/${serviceFix
                  .serviceFix(service)
                  .toLowerCase()}/popular`,
              },
            },

            {
              url: {
                $nlk: `topics`,
              },
            },

            {
              url: {
                $nlk: `?fbclid`,
              },
            },
            {
              url: {
                $nlk: `translate`,
              },
            },
            {
              url: {
                $nlk: `programmes`,
              },
            },

            {
              url: {
                $nlk: `extra`,
              },
            },

            {
              url: {
                $nlk: `_radio`,
              },
            },

            {
              url: {
                $nlk: `podcasts`,
              },
            },

            {
              url: {
                $nlk: `_tv`,
              },
            },

            {
              url: {
                $nlk: `tv_programmes`,
              },
            },

            {
              url: {
                $nlk: `fastly`,
              },
            },

            {
              url: {
                $nlk: `resources`,
              },
            },

            {
              url: {
                $nlk: `extra`,
              },
            },

            {
              url: {
                $nlk: `?xtor`,
              },
            },

            {
              pub_update_date: {
                $lk: `${new Date().toISOString().substring(0, 7)}`,
              },
            },
          ],
        },
      },
      space: {
        s: [598342],
      },
      period: {
        p1: [
          {
            type: "D",
            start: new Date(new Date().setDate(new Date().getDate() - 32))
              .toISOString()
              .substring(0, 10),
            end: new Date(new Date().setDate(new Date().getDate() - 1))
              .toISOString()
              .substring(0, 10),
          },
        ],
      },
      "max-results": 100,
      "page-num": 1,
      options: {
        ignore_null_properties: true,
        eco_mode: true,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
