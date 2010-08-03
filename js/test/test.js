var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

// vows.options.reporter = require('../reporter');

var imbot = require('/home/jlilly/src/imb0t/js/imbot');
var imb = new imbot.imbot;
var pattern_list = imb.pattern_list;

vows.describe('imbot').addBatch({
    'The pattern list': {
      topic: imb.pattern_list,
      'is an array': function (list) {
        assert.isArray(list);
      },
      'contains objects': function (list) {
        assert.isTrue(list.length == 0);
      },
      'is added to upon registering something': function (list) {
        imb.register(/a/, function () {});
        assert.isTrue(list.length == 1);
        list.shift(); // cleanup
      }
    }
}).addBatch({
    'The pattern object': {
      topic: function () {
        imb.register(/a/, function () {}); 
        return imb.pattern_list[0];
      },
      'pattern is an object': function (pattern) {
        assert.isObject(pattern);
      },
      'objects contain regexps': function (pattern) {
        assert.isTrue(pattern.hasOwnProperty('rxp'));
      },
      'has an associated function': function(pattern) {
        assert.isTrue(pattern.hasOwnProperty('func'));
        assert.isFunction(pattern.func);
      }
    }
}).export(module, {reporter: require('../reporter')});