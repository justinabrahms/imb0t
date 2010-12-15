var fs = require('fs');

var plugin = {
    'name': 'logging'
    , 'callbacks': [
        {
            re: /(.*)/, 
            fn: function(client, from, to, msg, matches) {
              fs.open(this.plugins[this.name].log_dir, 'a', function(err, fd) {
                 fs.write(fd, from + " => " + to + ": " + msg + "\r\n");
             });
         }
        }
    ]
    , 'state': {
        log_dir: '/tmp/imb0t.log'
    }
}
exports.plugin = plugin;