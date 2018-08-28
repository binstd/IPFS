var plugins = [{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-plugin-glamor/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-plugin-twitter/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-41298772-1"},
    },{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n         {\n          site {\n            siteMetadata {\n              title: rssFeedTitle\n              description: rssFeedDescription\n              siteUrl\n              site_url: siteUrl\n            }\n          }\n        }","feeds":[{"query":"\n              {\n                  allMarkdownRemark\n                  (limit: 10,\n                  filter: {id: {regex: \"/blog/\"}},\n                  sort: {fields: [fields___date],\n                  order: DESC}) {\n                    edges {\n                      node {\n                        fields {\n                          date\n                          slug\n                        }\n                        frontmatter {\n                          title\n                        }\n                        html\n                      }\n                    }\n                  }\n                }\n            ","output":"/feed.xml"}]},
    },{
      plugin: require('/Users/luz/code/js/ipfs-docs/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  let results = plugins.map(plugin => {
    if (plugin.plugin[api]) {
      const result = plugin.plugin[api](args, plugin.options)
      return result
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
