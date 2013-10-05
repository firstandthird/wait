suite('wait', function() {
  var wait, waitFidel, waitPprogress;

  suiteSetup(function(){
    wait = $('body').wait();
    waitFidel = wait.data('wait');
  });

  suite('init',function(){
    test('wait should exists in jQuery\'s namespace', function(){
      assert.equal(typeof $().wait, 'function');
    });
  });
  suite('show', function(){
    suiteSetup(function(){
      wait.wait('show');
    });
    test('wait should create an overlay div', function(){
      assert.equal($('.wait-overlay').length,1);
    });
    test('wait should create a modal div', function(){
      assert.equal($('.wait').length,1);
    });
    test('modal div should have a paragraph with the value of title', function(){
      assert.equal($('.wait').find('p').text(),waitFidel.title);
    });
    test('modal div should contain theme class', function(){
      assert.ok($('.wait').attr('class').indexOf(waitFidel.theme) !== -1);
    });
    test('element should have overflow hidden to avoid scrolling', function(){
      assert.equal(waitFidel.el.css('overflow'),'hidden');
    });
    test('onShow function should be called upon shown', function(done){
      wait.wait('hide');
      wait.wait('show',{
        onShow : function(){
          done();
        }
      });
      waitFidel.onShow = $.noop;
    });
    test('wait should fire an event when it\'s shown', function(done){
      wait.on('show',function(){
        done();
      });
      wait.wait('hide');
      wait.wait('show');
      wait.off();
    });
  });
  suite('setText',function(){
    test('text should change upon calling setText',function(){
      var text = 'Changed text';
      wait.wait('setText',text);
      assert.equal($('.wait').find('p').text(),text);
    });
  });
  suite('hide', function(){
    suiteSetup(function(){
      wait.wait('hide');
    });
    test('wait should remove the overlay div', function(){
      assert.equal($('.wait-overlay').length,0);
    });
    test('wait should remove the modal div', function(){
      assert.equal($('.wait').length,0);
    });
    test('element should have overflow visible to restore scrolling', function(){
      assert.equal(waitFidel.el.css('overflow'),'visible');
    });
    test('onHide function should be called upon hide', function(done){
      wait.wait('show',{
        onHide : function(){
          done();
        }
      });
      wait.wait('hide');
      waitFidel.onHide = $.noop;
    });
    test('wait should fire an event when it\'s hidden', function(done){
      wait.on('hide',function(){
        done();
      });
      wait.wait('show');
      wait.wait('hide');
      wait.off();
    });
  });
  suite('pprogress', function(){
    suiteSetup(function(){
      waitPprogress = $('#fixture').wait({
        pprogressSupport : true
      });
      waitPprogress.wait('show');
    });
    test('wait should create a div for pprogress to work', function(){
      assert.equal($('.wait-pprogress').length,1);
    });
    test('wait should hide when pprogress completes', function(){
      waitPprogress.wait('pprogress','done');
      waitPprogress.data('wait').pprogressDiv.on('completed',function(){
        assert.equal($('.wait-overlay').length,0);
      });
    });
  });
});
