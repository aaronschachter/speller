# Speller

Command line spell checker for a single word. Speller is built with [Node.js](https://nodejs.org).


## Installation
* Install [Node 6.10](https://nodejs.org)
* Clone this repository
* In your cloned directory, run `npm install`
* Navigate to your project directory and run `npm start` to start Speller.


Speller loads its word list from `/usr/share/dict/words` by default. To override this list, create a
`.env` file and set a `FILE_PATH` to the desired filepath of the word list.

## Testing
* Run `npm test` from the project directory to run unit tests.


## Notes

* Doesn't account for repeated letters that are valid combined with repeated letters that aren't: e.g. `'aalligattor'` does not find a match.
    * The `helpers.getDuplicateChars` started on going down that route, but I didn't find time to complete it.

* Assumes if an inputted word has a match, we don't need to make a suggestion.

* Assumes user is only entering one word (Speller crashes when inputting paragraphs of words)
