/*!
 * wait - Javascript plugin to show an iOS style loading graphic.
 * v0.1.0
 * https://github.com/firstandthird/wait
 * copyright First + Third 2013
 * MIT License
*/

(function(window,undefined){
  /**
   * Shim for getElementsByClassName for IE8 and below
    */
  if (typeof document.getElementsByClassName !== 'function') {
    HTMLElement.prototype.getElementsByClassName = function (classname) {
      return this.querySelectorAll('.' + classname);
    };
  }

  var _wait = window.wait;

  var wait = function(){};

  /**
   * Public method to show the loading overlay
   *
   * @param {Object} options
   *        #title {String} - Text that's going to be shown on the overlay
   *        #container {String} - Selector to fetch the element against which the overlay will be positioned
   *        #preventClicks {Boolean} - Indicates wether or not we should prevent clicks behind the overlay
   *        #theme {String} - Theme of the plugin, should be dark, light or none.
   */
  wait.prototype.show = function(options){
    this._setOptions(options);
    this.element = this._fetchContainer();

    if (this.preventClicks){
      this._addClass(this.element,'wait-blur');
    }

    this._createOverlay();
    this._createModal();
    this._bindEvents();

    return this;
  };
  /**
   * Public method that will hide and destroy the overlay and the modal content and unbind events
   */
  wait.prototype.hide = function(){
    this._unbindEvents();

    if (this.preventClicks){
      this._removeClass(this.element,'wait-blur');
    }

    this._removeModal();
    this._removeOverlay();

    return this;
  };
  /**
   * Restores previous value of global `wait` and returns a new instance of wait
   *
   * @returns {wait}
   */
  wait.prototype.noConflict = function(){
    if (window.wait === wait){
      window.wait = _wait;
    }

    return new wait();
  };
  /**
   * Helper method to add a class to a DOM element
   *
   * @param {HTMLElement} element
   * @param {String} cssClass
   * @private
   */
  wait.prototype._addClass = function(element, cssClass){
    element.className = element.className + ' ' + cssClass;
  };
  /**
   * Helper method to remove a class from a DOM element
   *
   * @param {HTMLElement} element
   * @param {String} cssClass
   * @private
   */
  wait.prototype._removeClass = function(element, cssClass){
    var cssClasses = element.className.split(' '),
        position = cssClasses.indexOf(cssClass);
    if (position !== -1){
      cssClasses.splice(position,1);
      element.className = cssClasses.join(' ');
    }
  };
  /**
   * Function that saves options upon show and fall backs to defaults
   *
   * @param {Object} options
   * @private
   */
  wait.prototype._setOptions = function(options){
    options = options || {};
    this.title = options.title || 'Loading...';
    this.container = options.container || 'body';
    this.preventClicks = options.preventClicks || true;
    this.theme = options.theme || 'dark';
  };
  /**
   * Function that bind to `click` on the overlay to prevent clicking through only if preventClicks option is set to true
   *
   * @private
   */
  wait.prototype._bindEvents = function(){
    if (this.preventClicks){
      this.overlay.addEventListener('click', this._preventClick, false);
    }
  };
  /**
   * Function that removes event bindings
   *
   * @see _bindEvents
   * @private
   */
  wait.prototype._unbindEvents = function(){
    if (this.preventClicks){
      this.overlay.removeEventListener('click', this._preventClick, false);
    }
  };
  /**
   * Function that prevents the event from default and bubbling
   *
   * @private
   */
  wait.prototype._preventClick = function(){
    return false;
  };
  /**
   * Function that fetches the element that's going to be used to position the modal
   *
   * @returns {HTMLElement}
   * @private
   */
  wait.prototype._fetchContainer = function(){
    var method = this._determineFetchingFunction(this.container);
    var container = method === 'getElementsByTagName' ? this.container : this.container.substring(1);
    var result = window.document[method](container);

    if (result instanceof NodeList){
      result = result[0];
    }

    return result;
  };
  /**
   * Function that creates the overlay for the modal, that will cover the element targeted
   *
   * @template <div class="wait-overlay wait-{{ themeName }}"></div>
   * @private
   */
  wait.prototype._createOverlay = function(){
    this.overlay = window.document.createElement('div');
    this.overlay.className = 'wait-overlay wait-' + this.theme;
    window.document.body.appendChild(this.overlay);

    this._positionOverlay();
  };
  /**
   * Function that removes the overlay from the DOM
   *
   * @see _createOverlay
   * @private
   */
  wait.prototype._removeOverlay = function(){
    window.document.body.removeChild(this.overlay);
  };
  /**
   * Function that will position the overlay to cover the full element. If the element is the body, position will be
   * fixed so it can follows scroll.
   *
   * @see _createOverlay
   * @private
   */
  wait.prototype._positionOverlay = function(){
    var left = '0px',
        top = '0px',
        width = '100%',
        height = '100%',
        position = 'fixed';

    if (this.container !== 'body'){
      var rect = this.element.getBoundingClientRect();
      left = rect.left + 'px';
      top = rect.top + 'px';
      width = rect.width + 'px';
      height = rect.height + 'px';
      position = 'absolute';
    }

    this.overlay.style.width = width;
    this.overlay.style.height = height;
    this.overlay.style.left = left;
    this.overlay.style.top = top;
    this.overlay.style.position = position;
  };
  /**
   * Function that will create the modal with the title specified. It will center the modal both vertically and horizontally
   * within the element.
   *
   * @private
   */
  wait.prototype._createModal = function(){
    this.modal = window.document.createElement('div');

    this.modal.className = 'wait wait-' + this.theme;
    var paragraph = window.document.createElement('p');
    var text = window.document.createTextNode(this.title);
    paragraph.appendChild(text);
    this.modal.appendChild(paragraph);
    window.document.body.appendChild(this.modal);

    this._positionModal();
  };
  /**
   * Function that will position the modal to be centered agains the given element. If the element is the body, position will be
   * fixed so it can follows scroll.
   *
   * @see _createModal
   * @private
   */
  wait.prototype._positionModal = function(){
    var left, top,
        position = 'fixed';

    if (this.container !== 'body'){
      position = 'absolute';
    }
    var rect = this.element.getBoundingClientRect();

    left = Math.round(((rect.width - this.modal.offsetWidth) / 2) + rect.left);
    top = Math.round(((rect.height - this.modal.offsetHeight) / 2) + rect.top);

    this.modal.style.left = left + 'px';
    this.modal.style.top = top + 'px';
    this.modal.style.position = position;
  };
  /**
   * Function that will remove modal from the DOM
   *
   * @see _createModal
   * @private
   */
  wait.prototype._removeModal = function(){
    window.document.body.removeChild(this.modal);
  };
  /**
   * Function that will try to determine which function should use to fetch an element from the DOM tree
   *
   * @param {String} selector
   * @returns {String} with the function name
   * @private
   */
  wait.prototype._determineFetchingFunction = function(selector){
    var method = '';

    switch(selector.charAt(0)){
      case '#':
        method = 'getElementById';
        break;
      case '.':
        method = 'getElementsByClassName';
        break;
      default :
        method = 'getElementsByTagName';
        break;
    }

    return method;
  };

  window.wait = new wait();
})(window);