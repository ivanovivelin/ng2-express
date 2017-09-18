'use strict';
const path = require('path');
const dictionary: any = require(path.resolve('./dictionary.json'));

/**
 * @author Ivelin Ivanov
 * @desc
 * @param req {}
 * @param socket {}
 */

// modules
let modules = {
    checkIfAnagram: checkIfAnagram
};


function checkIfAnagram(req: any, socket: any): Promise<any> {
    return new Promise((resolve, reject) => {
       if (dictionary === undefined || dictionary === null || req.data.word === undefined) {
           reject(`Please make sure you created the dictionary as Gulp Task and you passed some arg to the function !`);
       } else {
           const hrstart = process.hrtime();
           console.log(`Looking for anagrams of ${req.data.word} ...`);
           const sorted = regularize(req.data.word);
           let result = [];
           // if we want to use hashmap npm
           // const result = hashMap.get(sortedLetters) ? hashMap.get(sortedLetters) : `${word} not in Dictionary`;
           result = dictionary[sorted] ? dictionary[sorted] : `${req.data.word} not in Dictionary`;
           const hrend = process.hrtime(hrstart);
           console.log('Execution time for search (hr): %ds %dms', hrend[0], hrend[1]/1000000);
           socket.emitback('', {
            data: {
                data: result
            },
            scope: `anagrams.component`
            });
           // resolve(result); // return if found any anagrams
       }
    });
}

/**
 * @author Ivelin Ivanov
 * @param str {}
 * @desc normalize input
 */
function regularize(str) {
    const sanitizeRegex = /[^a-z0-9]/gi;
    return str.replace(sanitizeRegex, '').toLowerCase().split('').sort().join('');
}

module.exports = modules;
