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
        assert.strictEqual(evaluateInput(`dice ${input}`).responseMessage, expected);
      });
    });

    it('should return an error message without args', function() {
      assert(/ requires one argument /.test(evaluateInput(`dice`).responseMessage));
    });

    it('should return an error message with 2 args', function() {
      assert(/ requires one argument /.test(evaluateInput(`dice 1d1 1d1`).responseMessage));
    });

    it('should return an error message with invalid arg', function() {
      assert(/ requires one argument /.test(evaluateInput(`dice ndn`).responseMessage));
    });
  });
});
