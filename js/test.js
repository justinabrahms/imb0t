var vows = require('vows'),
    assert = require('assert');

var imbot = require('/home/jlilly/src/imb0t/js/imbot');
var pattern_list = imbot.pattern_list;

vows.describe('imb0t').addBatch({
    'The pattern list': {
      topic: pattern_list,
      'is an array': function (list) {
        assert.isArray(list);
      },
      'contains objects': function (list) {
        assert.isTrue(list.length != 0);
      }
    },
    'The pattern object': {
      topic: pattern_list[0],
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
});