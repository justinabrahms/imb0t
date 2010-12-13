var irc   = require('../node-irc/lib/irc.js')
    , imbot = require('./imbot.js').plugin
    , logging = require('imbot-logging.js')
    , sys = require('sys')
    , fs = require('fs')
    , opts = require('../tav');

if (module.parent === undefined) {
    // option parsing bits.
    var options = {
        'plugin_list': [
          logging
        ]
        , 'channel': '#pycon-pc'
        , 'server': 'irc.freenode.net'
        , 'nick': 'pyc0n'
        , 'plugin_config' : {
            'logging': {
                'log_dir': '/tmp/bot.log'
            }
        }
    };
    var bot = new imbot(options);
    bot.connect();
}
