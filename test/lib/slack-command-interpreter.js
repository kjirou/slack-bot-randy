const assert = require('assert');
const {describe, it} = require('mocha');
const sinon = require('sinon');

const {evaluateInput} = require('../../lib/slack-command-interpreter');

describe('lib/slack-command-interpreter', function() {
  describe('dice sub-command examples', function() {
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
        assert.strictEqual(result.isValid, true);
        assert.strictEqual(result.output, expected);
      });
    });

    it('should return an error message without args', function() {
      const result = evaluateInput(`choice`);
      assert(/ requires one or more arguments/.test(result.output));
      assert.strictEqual(result.isValid, false);
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
        assert.strictEqual(result.isValid, true);
        assert.strictEqual(result.output, expected);
      });
    });

    it('should return an error message without args', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.isValid, false);
    });

    it('should return an error message with 2 args', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.isValid, false);
    });

    it('should return an error message with invalid arg', function() {
      const result = evaluateInput(`dice`);
      assert(/ requires one argument /.test(result.output));
      assert.strictEqual(result.isValid, false);
    });
  });

  describe('help and default sub-commands examples', function() {
    describe('when help is called', function() {
      it('should always return valid result', function() {
        const result = evaluateInput(`help`);
        assert.strictEqual(typeof result.output, 'string');
        assert.strictEqual(result.isValid, true);
      });
    });

    describe('when defalut is called', function() {
      it('should always return valid result', function() {
        const result = evaluateInput(`default`);
        assert.strictEqual(typeof result.output, 'string');
        assert.strictEqual(result.isValid, true);
      });
    });
  });
});
