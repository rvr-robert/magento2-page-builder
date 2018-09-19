/*eslint-disable */
define(["knockout", "Magento_PageBuilder/js/events", "mageUtils", "underscore", "Magento_PageBuilder/js/config", "Magento_PageBuilder/js/panel", "Magento_PageBuilder/js/stage"], function (_knockout, _events, _mageUtils, _underscore, _config, _panel, _stage) {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */
  var PageBuilder =
  /*#__PURE__*/
  function () {
    function PageBuilder(config, initialValue) {
      Object.defineProperty(this, "template", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: "Magento_PageBuilder/page-builder"
      });
      Object.defineProperty(this, "panel", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "stage", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "config", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "initialValue", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "id", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: _mageUtils.uniqueid()
      });
      Object.defineProperty(this, "originalScrollTop", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 0
      });
      Object.defineProperty(this, "isFullScreen", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: _knockout.observable(false)
      });
      Object.defineProperty(this, "loading", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: _knockout.observable(true)
      });

      _config.setConfig(config);

      this.initialValue = initialValue;
      this.isFullScreen(config.isFullScreen);
      this.config = config;
      this.stage = new _stage(this);
      this.panel = new _panel(this);
      this.initListeners();
    }
    /**
     * Init listeners.
     */


    var _proto = PageBuilder.prototype;

    _proto.initListeners = function initListeners() {
      var _this = this;

      _events.on("stage:" + this.id + ":toggleFullscreen", function () {
        return _this.toggleFullScreen();
      });

      this.isFullScreen.subscribe(function () {
        return _this.onFullScreenChange();
      });
    };
    /**
     * Tells the stage wrapper to expand to fullScreen
     */


    _proto.toggleFullScreen = function toggleFullScreen() {
      this.isFullScreen(!this.isFullScreen());
    };
    /**
     * Change window scroll base on full screen mode.
     */


    _proto.onFullScreenChange = function onFullScreenChange() {
      var _this2 = this;

      if (this.isFullScreen()) {
        this.originalScrollTop = window.scrollY;

        _underscore.defer(function () {
          window.scroll(0, 0);
        });
      } else {
        _underscore.defer(function () {
          window.scroll(0, _this2.originalScrollTop);
        });
      }

      _events.trigger("stage:" + this.id + ":fullScreenModeChangeAfter", {
        fullScreen: this.isFullScreen()
      });
    };
    /**
     * Get template.
     *
     * @returns {string}
     */


    _proto.getTemplate = function getTemplate() {
      return this.template;
    };

    return PageBuilder;
  }();

  return PageBuilder;
});
//# sourceMappingURL=page-builder.js.map
