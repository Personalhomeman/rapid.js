'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-check

var CustomRoute = function () {
  function CustomRoute() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomRoute);

    // setup the default route object
    this.route = Object.assign({
      url: '',
      type: 'get',
      name: ''
    }, route);

    // setup the default config
    this.config = Object.assign({
      routeParams: {}
    }, config);
  }

  /**
   * This replaces any interpolated params with items passed in via the routeParams object
   *
   * @return {String}
   */


  _createClass(CustomRoute, [{
    key: 'replaceURLParams',
    value: function replaceURLParams() {
      var _this = this;

      var url = this.rawURL;

      // only do this if we have route params && params to replace
      if (this.urlParams.length && Object.keys(this.config.routeParams).length !== 0) {
        // replace each occurrence of the param with the value passed in
        this.urlParams.forEach(function (param) {
          url = url.replace('{' + param + '}', _this.config.routeParams[param]);
        });
      }

      return url;
    }

    /**
     * Check if the url has interpolated {} in them
     *
     * @return {Array}
     */

  }, {
    key: 'urlParams',
    get: function get() {
      // eslint-disable-next-line
      var params = this.rawURL.match(/{\s*[\w\.]+\s*}/g);

      // if we have params, strip off the {}
      if (params !== null) {
        return params.map(function (x) {
          return (
            // eslint-disable-next-line
            x.match(/[\w\.]+/)[0]
          );
        });
      }

      return [];
    }

    /**
     * Returns the properly prepared URL
     *
     * @return {String}
     */

  }, {
    key: 'url',
    get: function get() {
      return this.replaceURLParams();
    }

    /**
     * Returns the raw url from the route which would
     * contain any interpolations
     *
     * @return {String}
     */

  }, {
    key: 'rawURL',
    get: function get() {
      return this.route.url;
    }

    /**
     * Returns the route name
     *
     * @return {String}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.route.name;
    }

    /**
     * Returns the request type
     *
     * @return {String}
     */

  }, {
    key: 'type',
    get: function get() {
      return this.route.type;
    }
  }]);

  return CustomRoute;
}();

exports.default = CustomRoute;