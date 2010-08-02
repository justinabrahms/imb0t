var irc = require('irc');
var sys = require('sys');

var imb0t = function () {
  return {
    pattern_list: [],
    client: undefined,
    connectClient: function (server, nick, chan_list) {
      pattern_list = this.pattern_list;
      this.nick = nick;
      var client = new irc.Client(server, nick, {channels: chan_list});
      this.client = client;
      this.client.addListener(
        'message',
        function (from, to, message) {
          for(var i = 0; i < pattern_list.length; i++) {
            var matches = message.match(pattern_list[i].rxp);
            if (matches) {
              pattern_list[i].func(client, from, to, message, matches);
            }
          }
        });
    },
    register: function (_rgxp, _func) {
      this.pattern_list.push({rxp:_rgxp, func:_func});
    }
  };
};
exports.imbot = imb0t;

if (module.parent === undefined)  {
  var bot = new imb0t;
  bot.connectClient('irc.freenode.net', 'imb0t', ['#botwars']);

  bot.register(/([A-Z]+-[0-9]+)/g, function jira_link (client, from, to, message, matches) {
                 for (var i = 0; i < matches.length; i++) {
                   client.say(to, 'http://jira.invitemedia.com/browse/' + matches[i]);
                 }
               });

  bot.register(/(.*)/, function no_private_msg(client, from, to, msg, matches) {
                 if (to == this.nick) {
                   client.say(from, "I don't speak privately.");
                 }
               });

  bot.register(/(.*)/, function echo(client, from, to, msg, matches) {
                 console.log(from + " => " + to + ": " + msg);
               });

}
