var gulp = require('gulp')
var readline = require('readline');
var path = require('path');
var fs = require('fs');

/**
 * @desc gulp taks to create hashmap locally out of the txt file
 * @author Ivelin Ivanov
 */

gulp.task('createDictionary', function(cb) {
    var hashMap = {};
    var rl = readline.createInterface({
        input: fs.createReadStream('wordlist.txt')
    });
    var hrstart = process.hrtime();
    console.log(`Creating hashmap ...`);

    rl.on('line', (line) => {
        var sorted = regularize(line);
        if(!hashMap[sorted]) {
            hashMap[sorted] = [];
            hashMap[sorted].push(line);
        } else if(hashMap[sorted] && hashMap[sorted].indexOf(line) === -1) {
            hashMap[sorted].push(line);
        }
    }).on('close', () => {
        var hrend = process.hrtime(hrstart);
        console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1]/1000000);
        fs.writeFileSync('./dictionary.json', JSON.stringify(hashMap, null, 2) , (err) => {
            if (err) throw cb(err);
            console.log('The dictionary has been saved!');
            return;
          });
    });

    function regularize(str) {
        var sanitizeRegex = /[^a-z0-9]/gi;
        return str.replace(sanitizeRegex, '').toLowerCase().split('').sort().join('');
    }
});