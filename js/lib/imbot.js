var irc = require('../../../node-irc/lib/irc.js');
var sys = require('sys');

var imb0t = function (options) {
    var bot = {
        state: {}
        , plugin_names: []
        , pattern_list: []
        , client: undefined
        , connectClient: function (server, nick, chan_list) {
            this.nick = nick;
            this.client = new irc.Client(server, nick, {channels: chan_list});
            this.client.addListener('message', this.handleMessage);
        }
        , handleMessage: function(from, to, message) {
            this.pattern_list.forEach(function(pattern) {
                var matches = message.match(pattern.rxp);
                if (matches) {
                    pattern.func(this.client, from, to, message, matches);
                }
            });
        }
        , register: function (_rgxp, _func) {
            this.pattern_list.push({rxp:_rgxp, func:_func});
        }
        , register_plugin: function(plugin) {
            this.plugin_names.push(plugin.name);
            this.state[plugin.name] = plugin.state;
            plugin.callbacks.forEach(function(callback) {
                this.register(callback.re, callback.fn);
            }, this);
            bot.state[plugin.name] = plugin.state;
        
        }
        , connect: function () {
            this.connectClient(options['server'], options['nick'], options['channel']);
        }
    };
    if (options['plugin_list'] !== undefined) {
        options.plugin_list.forEach(function(plugin) {
            bot.register_plugin(plugin);
        });
    };
    return bot;
};
exports.imbot = imb0t;