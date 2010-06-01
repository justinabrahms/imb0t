var irc = require('irc');
var sys = require('sys');

var client = new irc.Client('irc.freenode.net', 'imb0t', {
  channels: ['#botwars', '#flood'],
});

pattern_list = [
  {'regexp': /([A-Z]+-[0-9]+)/,
   'func': function (from, to, message, matches) {
     client.say(from, matches
   }
  },
]


client.addListener('message', function (from, to, message) {
  sys.puts(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function(from, message) {
  client.say(from, 'Sorry, I don\'t speak privately.');
});

client.addListener('message#botwars', function (from, message) {
  for(var i = 0; i < pattern_list.length; i++) {
    if (var matches = pattern_list[i].regexp.match(message)) {
      pattern_list[i].func(from, to, message, matches)
    
  }
  sys.puts(from + ' => #botwars: ' + message);
  
});
