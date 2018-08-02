"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require(`fs-extra`);

exports.onCreateNode = require(`./on-node-create`);
exports.setFieldsOnGraphQLNodeType = require(`./extend-node-type`);

exports.onPreExtractQueries = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var store = _ref.store,
        getNodes = _ref.getNodes,
        boundActionCreators = _ref.boundActionCreators;
    var program, nodes, gatsbyImageDoesNotExist;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            program = store.getState().program;

            // Check if there are any ImageSharp nodes and if gatsby-image is installed. If so
            // add fragments for ImageSharp and gatsby-image. The fragment will cause an error
            // if there's not ImageSharp nodes and without gatsby-image, the fragment is useless.

            nodes = getNodes();

            if (nodes.some(function (n) {
              return n.internal.type === `ImageSharp`;
            })) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            gatsbyImageDoesNotExist = true;

            try {
              require.resolve(`gatsby-image`);
              gatsbyImageDoesNotExist = false;
            } catch (e) {
              // Ignore
            }

            if (!gatsbyImageDoesNotExist) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return fs.copy(require.resolve(`gatsby-transformer-sharp/src/fragments.js`), `${program.directory}/.cache/fragments/image-sharp-fragments.js`);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();