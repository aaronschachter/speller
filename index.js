'use strict';

/**
 * Imports.
 */
const fs = require('fs');
const readline = require('readline');
require('dotenv').config();
const helpers = require('./lib/helpers');

/**
 * Setup.
 */
let dictionaryMap = {};
const filePath = process.env.FILE_PATH || '/usr/share/dict/words';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Store hash table of lowercase words.
  data.split('\n').forEach(word => dictionaryMap[word.toLowerCase()] = word);
  prompt();
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Returns entry stored in our dictionary for given key.
 * @param {String} key - Lowercase string to search for
 * @returns {String|null}
 */
function lookupWord(key) {
  return dictionaryMap[key];
}

/**
 * Prompts for user input and outputs a spelling suggestion if it exists.
 *
 * NOTE: We're assuming user is only entering a single word. Ideally should to split input to
 * check for multiple words, and run spell checker for each word.
 */ 
function prompt() {
  const noResultsMessage = 'NO SUGGESTION';
  let match;

  rl.question('>', (inputString) => {
    console.log(`You said: ${inputString}`);

    // It doesn't SPELL it out in our spec (get it?) -- but let's assume that if the word is spelled
    // correctly, we don't need to make a suggestion.
    match = lookupWord(inputString);
    if (match) {
      return sendResponse(`${noResultsMessage} (match)`);
    }
    
    const input = inputString.toLowerCase();
    const maxTrimmed = helpers.trimRepeatingCharsToDoubles(input);
    helpers.debug(`maxTrimmed:${maxTrimmed}`);

    match = lookupWord(maxTrimmed);
    if (match) {
      return sendResponse(match);
    }

    // TODO: We're not going to catch all permutations of single/double here, e.g. 'aalligattor'
    // will fails because we're removing all duplicates.

    const minTrimmed = helpers.removeRepeatingChars(maxTrimmed);
    let wasTrimmed = false;
    let containsDoubles = false;
    if (minTrimmed.length !== maxTrimmed.length) {
      helpers.debug(`minTrimmed:${minTrimmed}`);
      match = lookupWord(minTrimmed);

      if (match) {
        return sendResponse(match);
      }

      containsDoubles = true;
      helpers.debug('containsDoubles');
    }

    // Find where the vowels are.
    const vowelIndices = helpers.getVowelIndices(maxTrimmed);

    // Find all possible vowels combinations to try.
    const vowelPermutations = helpers.getVowelPermutations(vowelIndices.length);

    let suggestions = [];
    vowelPermutations.forEach((permutation) => {
      const suggestion = helpers.replaceChars(maxTrimmed, vowelIndices, permutation);
      suggestions.push(suggestion);
      if (containsDoubles) {
        suggestions.push(helpers.removeRepeatingChars(suggestion));
      }      
    });

    helpers.debug(`suggestions:[${suggestions.join(',')}]`);

    const found = suggestions.some((suggestion) => {
      match = lookupWord(suggestion);
      if (match) {
        helpers.debug('match!');

        return true;
      }
    });

    if (found) {
      sendResponse(match);
    } else {
      sendResponse(noResultsMessage);
    }
  });
}

/**
 * Helper function to output given result string and prompt for new word.
 * @param {String} output
 */
function sendResponse(output) {
  console.log(output);
  prompt();
}
