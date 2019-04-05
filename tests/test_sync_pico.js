"use strict";
let multiHashing = require('../build/Release/cryptonight-arqma-hashing');
let fs = require('fs');
let lineReader = require('readline');

let testsFailed = 0, testsPassed = 0;
let lr = lineReader.createInterface({
     input: fs.createReadStream('cryptonight_arqma.txt')
});
lr.on('line', function (line) {
     let line_data = line.split(/ (.+)/);
     let result = multiHashing.cryptonight_arqma(Buffer.from(line_data[1], 'hex')).toString('hex');
     if (line_data[0] !== result){
         console.error(line_data[1] + ": " + result);
         testsFailed += 1;
     } else {
         testsPassed += 1;
     }
});
lr.on('close', function(){
    if (testsFailed > 0){
        console.log(testsFailed + '/' + (testsPassed + testsFailed) + ' tests failed on: cryptonight_arqma');
    } else {
        console.log(testsPassed + ' tests passed on: cryptonight_arqma');
    }
});
