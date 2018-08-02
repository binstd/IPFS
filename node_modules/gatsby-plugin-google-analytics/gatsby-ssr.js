"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;

  if (process.env.NODE_ENV === "production") {
    var excludeGAPaths = [];
    if (typeof pluginOptions.exclude !== "undefined") {
      var Minimatch = require("minimatch").Minimatch;
      pluginOptions.exclude.map(function (exclude) {
        var mm = new Minimatch(exclude);
        excludeGAPaths.push(mm.makeRe());
      });
    }
    var setComponents = pluginOptions.head ? setHeadComponents : setPostBodyComponents;
    return setComponents([_react2.default.createElement("script", {
      key: "gatsby-plugin-google-analytics",
      dangerouslySetInnerHTML: {
        __html: "\n  " + (excludeGAPaths.length ? "window.excludeGAPaths=[" + excludeGAPaths.join(",") + "];" : "") + "          \n  " + (typeof pluginOptions.anonymize !== "undefined" ? "function gaOptout(){document.cookie=disableStr+'=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/',window[disableStr]=!0}var gaProperty='" + pluginOptions.trackingId + "',disableStr='ga-disable-'+gaProperty;document.cookie.indexOf(disableStr+'=true')>-1&&(window[disableStr]=!0);" : "") + "\n  if(" + (typeof pluginOptions.respectDNT !== "undefined" && pluginOptions.respectDNT == true ? "!(navigator.doNotTrack == \"1\" || window.doNotTrack == \"1\")" : "true") + ") {\n    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n  }\n  if (typeof ga === \"function\") {\n    ga('create', '" + pluginOptions.trackingId + "', 'auto');\n      " + (typeof pluginOptions.anonymize !== "undefined" ? "ga('set', 'anonymizeIp', 1);" : "") + "}\n      "
      }
    })]);
  }

  return null;
};