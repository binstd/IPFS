"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require(`lodash`);

module.exports = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var node = _ref.node,
        boundActionCreators = _ref.boundActionCreators;
    var createNode, createParentChildLink, extensions, imageNode;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode, createParentChildLink = boundActionCreators.createParentChildLink;
            extensions = [`jpeg`, `jpg`, `png`, `webp`, `tif`, `tiff`];

            if (_.includes(extensions, node.extension)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            imageNode = {
              id: `${node.id} >> ImageSharp`,
              children: [],
              parent: node.id,
              internal: {
                contentDigest: `${node.internal.contentDigest}`,
                type: `ImageSharp`
              }
            };


            createNode(imageNode);
            createParentChildLink({ parent: node, child: imageNode });

            return _context.abrupt("return");

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function onCreateNode(_x) {
    return _ref2.apply(this, arguments);
  }

  return onCreateNode;
}();