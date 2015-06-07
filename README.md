# JavaScript-Assignments

## fooLogger
### How to use:
First, include fooLogger.js (by script tag or using requirejs) or, in case of server-side javascipt, by means of commonjs modules. Right after that, fooLogger will be available. Examples:

Initialize the fooLogger (not mandatory step, for available options see below):

`fooLogger.init({'logType', 'logToConsole', 'catchException', true};`

Log data (logging type and where logs will be shown depend on 'logType', by default it is `console.log`):

`fooLogger.log('foo bar baz');`

You can set `logType` for each call of the log function (and thus, override the default or set earlier `logType` in `init` call), passing `logType` value as the second parameter to the `log` function:

`fooLogger.log('foo bar baz', 'consoleError');  // will output string as error`
`fooLogger.log('foo bar baz');  // will output log based on logType from passed to init options or default logType)`

Also it is possible to set `logType` for all subsequent calls of the `fooLogger.log` by assigning `logType` property on the `fooLogger` object (shortcut for `fooLogger.init({'logType', 'anyCorrectType'});`:

`fooLogger.logType = 'consoleError';`
`fooLogger.log('foo bar baz');`   // shows logs as errors

###How to extend
You can easy add your own logging methods:

`function myCoolLogger(data) { console.table(data); };`
`fooLogger.extend({'consoleTable' : myCoolLogger});`
`fooLogger.logType = 'consoleTable';`
`fooLogger.log(logData);`

Or redefine existing logging methods (for a list of built-in logging methods see below):

`fooLogger.extend({'consoleLog' : myCoolLogger});`
`fooLogger.log(logData);`

###Available options:
  **logType** - type of logging method, default is 'consoleLog';

  **webEndpoint:** -  where to send logs in case of using 'logToApi' logType, default is empty string;

  **webEndpointMethod** - http-method (use this option along with 'webEndpoint'), default is 'Post';

  **elementId** - id of element on web-page where to show logs in case of using 'logOnPage', default is empty string;

  **catchException** - whether to catch all unhandled exceptions, default is 'false';

###Available Logging Methods:
  **consoleLog** - shows logs in host environment's console, using built-in 'console.log' function;

  **consoleError** - same as previous except shows log data as errors;

  **alert** - shows logs in browser's alert box, is not available in server-side js realizations;

  **logToApi** - sends logs to url, it's necessarily to set up 'webEndpoint' option before using this method;

  **logOnPage** - shows logs on browser's page (not available in server-side js), it's necessarily to set up 'elementId' option before using this method;

