var sys = require('sys');

this.name = 'custom-stuff';
this.reset = function () {console.log('reset called');};
this.report = function (data, s) {
   sys.puts(arguments);
   sys.puts(sys.inspect(arguments));
};
this.print = function () {console.log('print called');};
