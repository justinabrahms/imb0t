var fs = require('fs');

var name = 'logging';
var plugin = {
    'name': name
    , 'callbacks': [
        {
            re: /(.*)/, 
            fn: function(client, from, to, msg, matches, bot) {
                fs.open(bot.state[name].log_dir, 'a', function(err, fd) {
                            fs.write(fd, from + " => " + to + ": " + msg + "\r\n");
                        });
            }
        }
    ]
    , 'state': {
        log_dir: '/tmp/imb0t.log'
    }
};
exports.plugin = plugin;