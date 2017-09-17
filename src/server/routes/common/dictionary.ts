'use strict';
/**
 * @author Ivelin Ivanov
 * @desc
 */

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const redis: any = require(path.resolve('./server/config/redis'));
const HashMap = require('hashmap');
const map = new HashMap();
const dictionary: any = require(path.resolve('./dictionary.json'));

// this function was moved to Gulp
/**
 * @author Ivelin Ivanov
 * @param input
 * @desc create the dictionary suing streams and OOTB readline , now part of GULP
 */

 /*
export function createDictionary(): Promise<any> {
    return new Promise((resolve, reject) => {
        // create array of strings from txt file
        const dictionary = [];
        const anagrams = [];
        const hashmap = {};
        const result = [];
        const hrstart = process.hrtime();
        console.log(`Creating hashmap ...`);
        const rl = readline.createInterface({
             input: fs.createReadStream('wordlist.txt')
        });
        rl.on('line', (line) => {
            const sorted = regularize(line);
            if (!map.has(sorted)) {
                const arr = [];
                arr.push(line);
                map.set(sorted, arr);
            } else if (map.has(sorted)) {
                if (map.get(sorted) instanceof Array) {
                    const finalArray = map.get(sorted);
                    finalArray.push(line);
                    map.delete(sorted);
                    map.set(sorted, finalArray);
                }
            }
        }).on('close', () => {
            // console.log('Have a great day!');
            const hrend = process.hrtime(hrstart);
            console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1]/1000000);
            // redis.set('HashMap', map); if we want to save it to Redis
            resolve(map);
        });
    });
}
*/

/**
 * @author Ivelin Ivanov
 * @param str {}
 * @desc normalize input
 */
function regularize(str) {
    const sanitizeRegex = /[^a-z0-9]/gi;
    return str.replace(sanitizeRegex, '').toLowerCase().split('').sort().join('');
}

/**
 * @author Ivelin Ivanov
 * @param str {}
 * @desc normalize input
 */
function createProp(word) {
    return [].slice.call(word).sort().join('').toLowerCase();
}

/**
 * @author Ivelin Ivanov
 * @desc check if it is anagram
 * @param word
 */

export function checkIfAnagram(word: any): Promise<any> {
     return new Promise((resolve, reject) => {
        if (dictionary === undefined || dictionary === null || word === undefined) {
            reject(`Please make sure you created the dictionary as Gulp Task and you passed some arg to the function !`);
        } else {
            const hrstart = process.hrtime();
            console.log(`Looking for anagrams of ${word} ...`);
            // used for getting the hashmap values from Redis Store
            /*
            redis.get('dictionaryNew', (err, reply) => {
                if (err) {
                    console.error(err);
                }
                console.log(reply);
            });
            */
            const sorted = regularize(word);
            let result = [];
            // if we want to use hashmap npm
            // const result = hashMap.get(sortedLetters) ? hashMap.get(sortedLetters) : `${word} not in Dictionary`;
            result = dictionary[sorted] ? dictionary[sorted] : `${word} not in Dictionary`;
            const hrend = process.hrtime(hrstart);
            console.log('Execution time for search (hr): %ds %dms', hrend[0], hrend[1]/1000000);
            resolve(result); // return if found any anagrams
        }
     });
 }
