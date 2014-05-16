/**
 * Core unit test
 */

var assert = require('assert');
var harbors = require('../index');

describe('Module: Class', function(){

    it('harbors.Class', function(){
        assert.equal('function', typeof harbors.Class);
        assert.equal(true, new harbors.Class() instanceof harbors.Class);
    });

    it('harbors.Class.extend', function(){
        var testClass = harbors.Class.extend({
            _test: 1
        });
        var testObject = new testClass();
        assert.equal('function', typeof testClass);
        assert.equal('object', typeof testObject);
        assert.equal(true, testObject instanceof testClass);
        assert.equal(1, testClass.prototype._test);
        assert.equal(1, testObject._test);
    });
});

describe('Module: Handle', function(){
    var testHandle = harbors.Handle.create();
    var req = {};
    var res = {};
});
