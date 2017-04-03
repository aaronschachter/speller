'use strict';

const vowels = ['a', 'e', 'i', 'o', 'u'];

/**
 * Logs given input string to console if DEBUG config variable is set.
 * @param {String} input
 */
module.exports.debug = function (input) {
  if (process.env.DEBUG) {
    console.log(`debug: ${input}`);
  }
}

/**
 * Returns array of characters that repeat in given input string. Assumes max of 2 repeating chars.
 * @see trimRepeatingCharsToDoubles()
 *
 * @param {String} input
 * @returns {Array}
 */
module.exports.getDuplicateChars = function (input) {
  const result = [];
  for (let i = 1; i < input.length; i++) {
    const currentChar = input.charAt(i);
    if (currentChar === input.charAt(i-1)) {
      result.push(currentChar);
    }
  }

  return result;
};

/**
 * Returns array of indices of characters that are vowels.
 * @param {String} string
 * @returns {Array}
 */
module.exports.getVowelIndices = function (string) {
  const result = [];
  const chars = string.toLowerCase().split('');
  chars.forEach((char, index) => {
    if (vowels.indexOf(char) >= 0) {
      result.push(index);
    }
  });

  return result;
}

/**
 * Returns array of strings for all permutations of vowels with given length.
 * @param {Number} length
 * @returns {Array}
 */
module.exports.getVowelPermutations = function (length) {
  if (length === 1) {
    return vowels;
  }

  const result = [];
  for (let i = 2; i <= length; i++) {
    const permutations = this.getVowelPermutations(i-1);
    if (i < length) {
      continue;
    }
    vowels.forEach((vowel) => {
      permutations.forEach((permutation) => {
        result.push(`${vowel}${permutation}`);
      })
    });
  }

  return result;
}

/**
 * Removes any repeating characters in given input string.
 * @param {String} input
 * @returns {String}
 */
module.exports.removeRepeatingChars = function (input) {
  const chars = input.split('');

  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i-1]) {
      // Remove duplicate character.
      chars.splice(i, 1);
      i--;
    }
  }

  return chars.join('');
};

/**
 * Replaces characters in given input string at given indices with characters defined in replace.
 * @param {String} input
 * @param {Array} indices -- The numeric indices of the vowels in given input string
 * @param {String} replace -- The string that contains characters to replace each indices element
 * @returns {String}
 */
module.exports.replaceChars = function (input, indices, replace) {
  const chars = input.split('');

  // TODO: Sanitize input to make sure replace.length === indices.length.
  indices.forEach((charIndex, counter) => {
    chars[charIndex] = replace.charAt(counter);
  });

  return chars.join('');
}

/** 
 * Finds any repeating characters and trims down to the max allowed in English: 2.
 * @param {String} input
 * @returns {String}
 */
module.exports.trimRepeatingCharsToDoubles = function (input) {
  const chars = input.split('');
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i-1] && chars[i] === chars[i+1]) {
      // Remove duplicate character.
      chars.splice(i, 1);
      i--;
    }
  }

  return chars.join('');
};
