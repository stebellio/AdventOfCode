const { PRIORITY_HIGHEST } = require('constants');
const file = require('fs');
const { exit } = require('process');
const input = file.readFileSync('5/input.txt').toString();

var seats = input.split('\n');

const ids = Array();
i = 0;
for (seat of seats) {
    var row = seat.substr(0, 7);
    var column = seat.substr(7, 9);
    row = getRow(row);
    column = getColumn(column);
    ids[i] = ((row * 8) + column);
    i++;
}

//1 QUESTION
const max_id = Math.max.apply(Math, ids);
// console.log(max_id);

//2 QUESTION
seats = ids;
const freeSeats = getFreeSeats(ids);
var mySeat = null;

for (freeSeat of freeSeats){
    var plus1 = ids.includes(freeSeat + 1);
    var minus1 = ids.includes(freeSeat - 1);

    if (plus1 && minus1) {
        mySeat = freeSeat;
    }
}
console.log(mySeat);


function getRow(row) {
    var range = Array(0, 127);
    row = Array.from(row);
    for (char of row) {
        var half = (range[1] - range[0]) / 2;
        if (!Number.isInteger(half)) {
            half = half - 0.5;
        }
        switch (char) {
            case 'B':
                range[0] = range[1] - half;
                break;
            case 'F':
                range[1] = range[0] + half;
                break;
        }
    }
    
    if (range[0] === range[1]){
        return range[0];
    }
    else {
        console.log('Errore row');
        exit;
    }
}
function getColumn(column) {
    var range = Array(0, 7);
    column = Array.from(column);
    for (char of column) {
        var half = (range[1] - range[0])/2;
        if (!Number.isInteger(half)) {
            half = half - 0.5;
        }
        switch (char) {
            case 'R':
                range[0] = range[1] - half;
                break;
            case 'L':
                range[1] = range[0] + half;
                break;
        }
    }
    if (range[0] === range[1]){
        return range[0];
    }
    else {
        console.log('Errore column');
        exit;
    }
}
function getFreeSeats(ids) {
    const free = Array();
    j = 0;
    for (i = 0; i < 1024; i++) {
        const busy = ids.includes(i);
        if (!busy) {
            free[j] = i;
            j++;
        }
    }
    return free;
}