'use strict';

const assert = require('assert');

const helpers = require('../lib/helpers');
describe('/lib/helpers', function() {
  describe('#getDuplicateChars()', function() {
    it('should return array of duplicate characters', function() {
      assert.deepEqual(['p','e','p','e'], helpers.getDuplicateChars('ppeeopplee'));
    });

    it('should return empty array if no duplicates', function() {
      assert.deepEqual([], helpers.getDuplicateChars('Job'));
    });
  });

  describe('#getVowelIndices(string)', function() {
    it('should return array of indices for string with vowels', function() {
      assert.deepEqual([1, 3], helpers.getVowelIndices('were'));
      assert.deepEqual([0, 3, 5, 7], helpers.getVowelIndices('alligator'));
    });
    it('should return empty array for string without vowels', function() {
      assert.deepEqual([], helpers.getVowelIndices('Styx'));
    });
  });

  describe('#getVowelPermutations(length)', function() {
    it('should return array of vowels for length 1', function() {
      assert.deepEqual(['a', 'e', 'i', 'o', 'u'], helpers.getVowelPermutations(1));
    });
    it('should return array with length 25 for length 2', function() {
      const permutations =  helpers.getVowelPermutations(2);
      assert.equal(25, permutations.length);
    });
    it('should return array with length 125 for length 3', function() {
      const permutations =  helpers.getVowelPermutations(3);
      assert.equal(125, permutations.length);
    });
  });

  describe('#replaceChars(input,indices, replace)', function() {
    it('should replace input chars with replace chars at given indices', function() {
      assert.equal('barbie', helpers.replaceChars('zombie', [0,1,2], 'bar'));
      assert.equal('ellugetur', helpers.replaceChars('alligator', [0,3,5,7], 'eueu'));
    });
  });

  describe('#removeRepeatingChars()', function() {
    it('should remove any repeating characters from string', function() {
      assert.equal('job', helpers.removeRepeatingChars('jjoooobbbbb'));
    });

    it('should not alter original string if no repeating', function() {
      assert.equal('job', helpers.removeRepeatingChars('job'));
      assert.equal('Job', helpers.removeRepeatingChars('Job'));
    });
  });

  describe('#trimRepeatingCharsToDoubles()', function() {
    it('should delete duplicate characters to a max of 2', function() {
      assert.equal('jjoobb', helpers.trimRepeatingCharsToDoubles('jjjjjoooobbbbb'));
    });

    it('should not alter original string if no duplicates', function() {
      assert.equal('job', helpers.trimRepeatingCharsToDoubles('job'));
      assert.equal('Job', helpers.trimRepeatingCharsToDoubles('Job'));
    });
  });
});
