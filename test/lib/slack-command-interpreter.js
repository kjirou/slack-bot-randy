const assert = require('assert');
const {describe, it} = require('mocha');
const sinon = require('sinon');

const {evaluateInput} = require('../../lib/slack-command-interpreter');

describe('lib/slack-command-interpreter', function() {
  describe('choice sub-command examples', function() {
    let stubbedRandom;

    beforeEach(function() {
      stubbedRandom = sinon.stub(Math, 'random').callsFake(() => 0.5);
    });

    afterEach(function() {
      stubbedRandom.restore();
    });

    [
      ['foo', 'foo'],
      ['foo bar', 'bar'],
      ['foo bar baz', 'bar'],
      ['foo bar baz qux', 'baz'],
    ].forEach(([input, expected]) => {
      it(`"${input}" => "${expected}"`, function() {
        const result = evaluateInput(`choice ${input}`);
        assert.strictEqual(result.output, expected);
        assert.strictEqual(result.responseType, 'in_channel');
      });
    });

    it('should return an error message when it does not receive args', function() {
      const result = evaluateInput(`choice`);
      assert(/ requires one or more arguments/.test(result.output));
      assert.strictEqual(result.responseType, 'in_channel');
    });
  });

  describe('dice sub-command examples', function() {
    let stubbedRandom;

    beforeEach(function() {
      stubbedRandom = sinon.stub(Math, 'random').callsFake(() => 0.5);
    });

    afterEach(function() {
      stubbedRandom.restore();
    });

    [
      ['0d0', '0'],
      ['1d0', '0'],
      ['0d1', '0'],
      ['1d1', '1'],
      ['1d6', '3'],
      ['2d6', '6'],
      ['1d100', '50'],
      ['10d100', '500'],
    ].forEach(([input, expected]) => {
      it(`"${input}" => "${expected}"`, function() {
        const result = evaluateInput(`dice ${input}`);
        assert.strictEqual(result.output, expected);
        assert.strictEqual(result.responseType, 'in_channel');
      });
    });

    it('should return an error message when it does not receive args', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.responseType, 'in_channel');
    });

    it('should return an error message when it receives 2 args', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.responseType, 'in_channel');
    });

    it('should return an error message when it receives an invalid arg', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.responseType, 'in_channel');
    });
  });

  describe('help and default sub-commands examples', function() {
    describe('when help is called', function() {
      it('should always return an usage', function() {
        const result = evaluateInput(`help`);
        assert(/Usage/.test(result.output));
        assert.strictEqual(result.responseType, 'ephemeral');
      });
    });

    describe('when defalut is called', function() {
      it('should always return an usage', function() {
        const result = evaluateInput(`default`);
        assert(/Usage/.test(result.output));
        assert.strictEqual(result.responseType, 'ephemeral');
      });
    });
  });

  describe('unknown sub-command example', function() {
    it('should always return a general error message', function() {
      const result = evaluateInput(`xxx`);
      assert(/Invalid/.test(result.output));
      assert.strictEqual(result.responseType, 'in_channel');
    });
  });
});
