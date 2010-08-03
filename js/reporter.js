var sys = require('sys');
var colors = require('../../colors.js/colors');
var asciimo = require('../../asciimo/lib/asciimo').Figlet;
var report_font = 'drpepper';

this.name = 'custom-stuff';
this.report = function (data, s) {
  sys.print('.');
  if (data[0] == 'finish') {
    sys.puts('');
    var result = 'failed';
    if (data[1].broken == 0 && data[1].errored == 0) {
      result = 'passed';
    }
    asciimo.write(result, report_font, function (art) {
        if (result  == 'passed')
          sys.puts(art.green);
        else
          sys.puts(art.red);
        var output = '';
        output += 'Passed: ' + data[1].honored + ' \n';
        output += 'Failed: ' + data[1].broken + ' \n';
        output += 'Errored: ' + data[1].errored + ' \n';
        output += 'in ' + data[1].time + 'sec';
        sys.puts(output);
    });
  }
};