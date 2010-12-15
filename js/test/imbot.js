// expresso tests
var imbot = require('../lib/imbot.js').imbot,
assert = require('assert');

function generate_plugin(state_obj) {
    return {
        name: 'test',
        callbacks: [
          {'re': /.*/, 'fn': function () {}}
        ],
        state: state_obj
    };
}

module.exports = {
    'test pattern_list is empty by default': function() {
        var bot = new imbot({});
        assert.deepEqual([], bot.pattern_list);
    }
    , 'test registering a function makes pattern_list bigger': function () {
        var bot = new imbot({});
        bot.register(/.*/, function () {});
        assert.equal(1, bot.pattern_list.length);
    }
    , 'test message is properly handled by multiple handlers': function () {
        var bot = new imbot({});

        var first_match_called = false;
        var second_match_called = false;
        var unmatched_uncalled = true;
        // could be replaced with an assert.called()

        bot.register(/.*/, function () {first_match_called = true;});
        bot.register(/.*/, function() {second_match_called = true;});
        bot.register(/foo/, function () {unmatched_uncalled = false;});

        bot.handleMessage('zot', 'zam', 'Test String');
        assert.ok(first_match_called, "First matching callback was not called.");
        assert.ok(second_match_called, "Second matching callback was not called.");
        assert.ok(unmatched_uncalled, "Unmatched callback was mistakenly called.");
     
    }
    , 'test registering a plugin increases pattern_list size': function () {
        var bot = new imbot({});
        var plugin = {
            callbacks: [
                [/.*/, function () {}]
                , [/foo/, function() {}]
            ]
        };
        bot.register_plugin(plugin);
        assert.equal(2, bot.pattern_list.length);
    }
    , 'test can register plugins on instantiation': function () {
        var options = {
            plugin_list: [
                generate_plugin()
                , generate_plugin()
            ]
        };
        var bot = new imbot(options);
        // assert.called(bot, 'register_plugin')
        assert.equal(2, bot.pattern_list.length);
    }
    , 'test connect passes in proper args to connectClient': function() {
        var options = {
            channel: '#botwars'
            , nick: 'imb0t'
            , server: 'irc.freenode.net'
        };
        var args;
        var bot = new imbot(options);
        bot.connectClient = function () { args = arguments; };
        bot.connect();

        assert.equal('irc.freenode.net', args['0'], "Server wasn't passed in as first param.");
        assert.equal('imb0t', args['1'], "nick wasn't properly passed in.");
        assert.equal('#botwars', args['2'], "channel wasn't properly passed in.");
    }
    , 'test plugin state merges into bot': function () {
        var val = {
            'key':1
        };
        var options = {
            plugin_list: [
                generate_plugin(val)
            ]
        };
        var bot = new imbot(options);
        assert.equal(val, bot.state['test']);
    }
    ,'test valid plugin callbacks are called': function () {
        var called = false;
        var options = {
            plugin_list: [
                {
                    name:'test_plugin'
                    , callbacks: [{re:/.*/, fn: function () {called = true;}}]
                }
            ]
        };
        var bot = new imbot(options);
        bot.handleMessage('zim', 'zam', 'zappo');
        assert.ok(called);
        
    }
    ,'test invalid plugin callbacks arent called': function () {
        var called = false;
        var options = {
            plugin_list: [
                {
                    name:'test_plugin'
                    , callbacks: [{re:/f/, fn: function () {called = true;}}]
                }
            ]
        };
        var bot = new imbot(options);
        bot.handleMessage('zim', 'zam', 'zappo');
        assert.ok(called === false);
        
    }
    // , 'foo': function () {}
};
