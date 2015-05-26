(function () {
  'use strict';

  function lazy() {
    if(arguments.length > 1)
      var result = Math.pow(arguments[0], arguments[1]);

    lazy = function () {
      console.log(result);
    }

    return lazy.apply(this, arguments);
  }

  lazy(100, 10);
  lazy();
  lazy();
})();

