/*!
 * wait - Javascript plugin to show an iOS style loading graphic.
 * v0.5.0
 * https://github.com/firstandthird/wait
 * copyright First + Third 2013
 * MIT License
*/
(function($){
  $.declare('wait',{
    defaults : {
      title : 'Loading...',
      preventClicks : true,
      theme : 'dark',
      onShow : $.noop,
      onHide : $.noop,
      pprogressSupport : false,
      overlayTemplate : '<div class="wait-overlay"></div>',
      modalTemplate : '<div class="wait"></div>',
      pprogressTemplate : '<div class="wait-pprogress"></div>'
    },
    show : function (options){
      this.setOptions(options);

      if (this.preventClicks){
        this.el.addClass('wait-blur');
      }

      this.previousOverflow = this.el.css('overflow');
      this.el.css('overflow','hidden');

      this._createOverlay();
      this._createModal();
      this._bindEvents();

      this.pprogress('start',true);

      this.onShow.call(this);
      this.emit('show');
    },
    hide : function(){
      this._unbindEvents();

      if (this.preventClicks){
        this.el.removeClass('wait-blur');
      }

      this.el.css('overflow',this.previousOverflow);

      this._removeModal();
      this._removeOverlay();

      this.onHide.call(this);
      this.emit('hide');
    },
    setOptions : function(options){
      options = options || {};
      this.title = options.title || this.title;

      if (typeof options.preventClicks !== "undefined"){
        this.preventClicks = options.preventClicks;
      }

      if (typeof options.pprogressSupport !== "undefined"){
        this.pprogressSupport = options.pprogressSupport;
      }

      this.theme = options.theme || this.theme;
      this.onShow = options.onShow || this.onShow;
      this.onHide = options.onHide || this.onHide;
    },
    setText : function(text) {
      this.paragraph.text(text);
    },
    pprogress : function(){
      if (this.pprogressSupport){
        var args = Array.prototype.slice.call(arguments);
        if (args.length){
          this.pprogressDiv.pprogress.apply(this.pprogressDiv,args);
        }
      }
    },
    _createOverlay : function(){
      this.overlay = $(this.overlayTemplate)
          .addClass('wait-' + this.theme)
          .appendTo('body');

      this._positionOverlay();
    },
    _removeOverlay : function(){
      this.overlay.remove();
    },
    _positionOverlay : function() {
        var left = '0px',
            top = '0px',
            width = '100%',
            height = '100%',
            position = 'fixed';

        if (this.el[0].nodeName.toLowerCase() !== 'body'){
          var offset = this.el.offset();
          left = offset.left + 'px';
          top = offset.top + 'px';
          width = this.el.width() + 'px';
          height = this.el.height() + 'px';
          position = 'absolute';
        }

      this.overlay.css({
        width : width,
        height : height,
        left : left,
        top : top,
        position : position
      });
    },
    _createModal : function(){
      this.modal = $(this.modalTemplate).addClass('wait-' + this.theme).appendTo('body');
      this.paragraph = $('<p></p>').text(this.title).appendTo(this.modal);
      if (this.pprogressSupport){
        this.pprogressDiv = $(this.pprogressTemplate).appendTo(this.modal);
        this.pprogressDiv.pprogress({
          fillColor: '#FFF'
        });
      }

      this._positionModal();
    },
    _removeModal : function(){
      this.modal.remove();
    },
    _positionModal : function(){
      var left, top,
          position = 'absolute';

      if (this.el[0].nodeName.toLowerCase() !== 'body'){
        var offset = this.el.offset();
        top = ((this.el.height() - this.modal.outerHeight())/2 + offset.top);
        left = ((this.el.width() - this.modal.outerWidth())/2 + offset.left);
      }
      else {
        top = (($(window).height() - this.modal.outerHeight())/2 + $(document).scrollTop());
        left = (($(window).width() - this.modal.outerWidth())/2 + $(document).scrollLeft());
      }

      this.modal.css({
        left : left,
        top : top,
        position : position
      });
    },
    _bindEvents : function(){
      if (this.preventClicks){
        this.overlay.on('click',this._preventClick);
      }
      if (this.pprogressSupport){
        this.pprogressDiv.on('complete', this.proxy(this.hide));
      }
    },
    _unbindEvents : function(){
      if (this.preventClicks){
        this.overlay.off();
      }
      if (this.pprogressSupport){
        this.pprogressDiv.off();
      }
    },
    _preventClick : function(){
      return false;
    }
  });
})(jQuery);