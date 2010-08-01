var irc = require('irc');
var sys = require('sys');

var client = new irc.Client('irc.freenode.net', 'imb0t', {
                              channels: ['#botwars', '#flood']
                            });

pattern_list = [
  {
    rxp: /([A-Z]+-[0-9]+)/g,
    func: function (from, to, message, matches) {
      for (var i; i < matches.length; i++) {
        client.say(to, 'http://jira.invitemedia.com/browse/' + matches[i]);
      }
    }
  }
];

client.addListener(
  'pm',
  function(from, message) {
    client.say(from, 'Sorry, I don\'t speak privately.');
  });

client.addListener(
  'message',
  function (from, to, message) {
    for(var i = 0; i < pattern_list.length; i++) {
      var matches = message.match(pattern_list[i].rxp);
      if (matches) {
        pattern_list[i].func(from, to, message, matches);
      }
      sys.puts(from + ' => '+ to +': ' + message);
    }
  });
