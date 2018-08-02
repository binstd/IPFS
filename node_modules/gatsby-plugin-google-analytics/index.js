"use strict";

exports.__esModule = true;
exports.OutboundLink = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OutboundLink(props) {
  return _react2.default.createElement("a", (0, _extends3.default)({}, props, {
    onClick: function onClick(e) {
      if (typeof props.onClick === "function") {
        props.onClick();
      }
      var redirect = true;
      if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
        redirect = false;
      }
      if (props.target && props.target.toLowerCase() !== "_self") {
        redirect = false;
      }
      if (window.ga) {
        window.ga("send", "event", {
          eventCategory: "Outbound Link",
          eventAction: "click",
          eventLabel: props.href,
          transport: redirect ? "beacon" : "",
          hitCallback: function hitCallback() {
            if (redirect) {
              document.location = props.href;
            }
          }
        });
      } else {
        if (redirect) {
          document.location = props.href;
        }
      }

      return false;
    }
  }));
}

OutboundLink.propTypes = {
  href: _propTypes2.default.string,
  target: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.OutboundLink = OutboundLink;