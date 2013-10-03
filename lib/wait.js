(function($){
  $.declare('wait',{
    defaults : {
      title : 'Loading...',
      preventClicks : true,
      theme : 'dark',
      onShow : $.noop,
      onHide : $.noop,
      overlayTemplate : '<div class="wait-overlay"></div>',
      modalTemplate : '<div class="wait"></div>'
    },
    show : function (options){
      this.setOptions(options);

      if (this.preventClicks){
        this.el.addClass('wait-blur');
      }

      this._createOverlay();
      this._createModal();
      this._bindEvents();

      this.onShow.call(this);
      this.emit('show');
    },
    hide : function(){
      this._unbindEvents();

      if (this.preventClicks){
        this.el.removeClass('wait-blur');
      }

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

      this.theme = options.theme || this.theme;
      this.onShow = options.onShow || this.onShow;
      this.onHide = options.onHide || this.onHide;
    },
    setText : function(text) {
      this.paragraph.text(text);
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
          var rect = this.el[0].getBoundingClientRect();
          left = rect.left + 'px';
          top = rect.top + 'px';
          width = rect.width + 'px';
          height = rect.height + 'px';
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

      this._positionModal();
    },
    _removeModal : function(){
      this.modal.remove();
    },
    _positionModal : function(){
      var left, top,
          position = 'fixed';

      if (this.el[0].nodeName.toLowerCase() !== 'body'){
        position = 'absolute';
        var rect = this.el[0].getBoundingClientRect();
        left = Math.round(((rect.width - this.modal[0].offsetWidth) / 2) + rect.left);
        top = Math.round(((rect.height - this.modal[0].offsetHeight) / 2) + rect.top);
      }
      else {
        top = (($(window).height() - this.modal.outerHeight())/2 + $(document).scrollTop());
        left = (($(window).width() - this.modal.outerWidth())/2 + $(document).scrollLeft());
      }


      this.modal[0].style.left = left + 'px';
      this.modal[0].style.top = top + 'px';
      this.modal[0].style.position = position;
    },
    _bindEvents : function(){
      if (this.preventClicks){
        this.overlay.on('click',this._preventClick);
      }
    },
    _unbindEvents : function(){
      if (this.preventClicks){
        this.overlay.off('click',this._preventClick);
      }
    },
    _preventClick : function(){
      return false;
    }
  });
})(jQuery);