suite('wait', function() {
  var wait;

  test('wait should be a global function', function(){
    assert.notEqual(window.wait,undefined);
  });
  test('wait noConflict should return a new instance of wait', function(){
    wait = window.wait.noConflict();
    assert.equal(wait.constructor.name,'Wait');
  });
  test('wait should be undefined in the window after no conflict has been called', function(){
    assert.equal(window.wait,undefined);
  });

  suite('show', function(){
    suiteSetup(function(){
      wait.show();
    });
    test('wait should create an overlay div', function(){
      assert.equal($('.wait-overlay').length,1);
    });
    test('wait should create a modal div', function(){
      assert.equal($('.wait').length,1);
    });
    test('modal div should have a paragraph with the value of title', function(){
      assert.equal($('.wait').find('p').text(),wait.title);
    });
    test('modal div should contain theme class', function(){
      assert.ok($('.wait').attr('class').indexOf(wait.theme) !== -1);
    });
  });
  suite('hide', function(){
    suiteSetup(function(){
      wait.hide();
    });
    test('wait should remove the overlay div', function(){
      assert.equal($('.wait-overlay').length,0);
    });
    test('wait should remove the modal div', function(){
      assert.equal($('.wait').length,0);
    });
  });
});
