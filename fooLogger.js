(function (exports, glob, document, transport) {
  'use strict';


  // public
  function FooLogger(options){
    this.init = init;
    this.log = log;
    this.extend = extend;
  };

  var fooLogger = new FooLogger();

  // export
  if (exports){                                                     // nodejs
    exports.log = log.bind(fooLogger);
    exports.init = init;
    exports.extend = extend;
  } else if (typeof define === 'function' && define.amd) {          // requirejs
    define(function() {
      return fooLogger;
    });
  } else {                                                          // or set fooLogger as global property
    glob.fooLogger = fooLogger;
  }

  // private
  var defaults = {

    // options
    logType: 'consoleLog',
    webEndpoint: '',
    webEndpointMethod: 'Post',
    elementId: '',
    catchException: false,

    // built-in logging methods
    consoleLog : consoleLog,
    consoleError : consoleError,
    alert : alert,
    logToApi : logToApi,
    logOnPage : logOnPage,
    enableLogExceptions : enableLogExceptions,
    disableLogExceptions : disableLogExceptions
  };


  function init(options){
    if(options){
      for (var k in options){
        defaults[k] = options[k];
      }
    }

    this.logType = defaults.logType;

    if(defaults.catchException){
      defaults.enableLogExceptions();
    }else{
      defaults.disableLogExceptions();
    }

    return this;
  };

  function log (data, type) {
    var _logType = type || this.logType || defaults.logType;

    if(typeof defaults[_logType] === 'function')
      defaults[_logType](data);
    else
      log("Such log type isn't available", "consoleError");
  };

  function extend (options) {
    for (var k in options) {
      if (typeof options[k] !== 'function') {
        log('Value should be a function.', 'consoleError');
        return this;
      }

      if(defaults.hasOwnProperty(k) && typeof defaults[k] !== 'function') {
        log('Redefine only functions.', 'consoleError');
        return this;
      }

      defaults[k] = options[k];
    }

    return this;
  };

  function logExceptions (event) {
    log.bind(fooLogger)('Exception: ' + event.message + '(' + event.filename + ":" + event.lineno +')');
    event.preventDefault();
  };

  // add/remove listener for 'error' event
  function toggleLogException (action) {
    if(action in glob)
      glob[action]('error', logExceptions.bind(fooLogger));
    else
      log("Host environment hasn't '" + action + "' function", 'consoleError');
  };

  function consoleLog (data) {
    glob.console.log(data);
  };

  function consoleError (data) {
    glob.console.error('Error: ', data);
  };

  function alert (data) {
    glob.alert(data);
  };

  function logToApi (data) {
    if(transport && this.webEndpoint) {
      var xmlhttp = new transport();
      xmlhttp.open(this.webEndpointMethod, this.webEndpoint, true);
      xmlhttp.send(data);

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          log('Log was sent', 'consoleLog');
        }
      }
    } else {
      log("Transport isn't available or endpoint isn't defined", 'consoleError');
    }
  };

  function logOnPage (data) {
    if(document && document.getElementById(this.elementId)) {
      var date = new Date(),
          title = date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' fooLog => ',
          container = '<div><span style="color: #22cc22">' + title + '</span><span color="#ddd">' + data + '</span>' + '</div>';

      document.getElementById(this.elementId).insertAdjacentHTML('beforeend', container);
    } else {
      log('There is no document or element to output log', 'consoleError');
    }
  };

  function enableLogExceptions () {
    toggleLogException('addEventListener');
  };

  function disableLogExceptions () {
    toggleLogException('removeEventListener');
  };

})(typeof exports !== 'undefined' ? exports : undefined,
   typeof global !== 'undefined' ? global : window,
   typeof document !== 'undefined' ? document : undefined,
   typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : undefined);