var imbot = require('./lib/imbot.js').imbot
    , logging = require('./imbot-logging.js');

if (module.parent === undefined) {
        // option parsing bits.
    var options = {
        'plugin_list': [
          logging.plugin
        ]
        , 'channels': ['#foooz']
        , 'server': 'irc.freenode.net'
        , 'nick': 'imb0t'
        , 'plugin_config' : {
            'logging': {
                'log_dir': '/tmp/bot.log'
            }
        }
    };
    var bot = new imbot(options);
    console.log("Connecting...");
    bot.connect();
}
