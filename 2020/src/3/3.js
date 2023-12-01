const file = require('fs');
const input = file.readFileSync('input.txt').toString();

const map = input.split('\n');

for (i = 0; i < map.length; i++){
    for (j = 0; j < 10; j++) {
        map[i] = map[i].concat(map[i]);
    }
}


let trees = 0;
let column = 0;
//3-1 280
//1-1 77
//5-1 74
//7-1 78
//1-2 35

for (i = 1; i < map.length; i++) {

    column = column + 7;
    const char = map[i].charAt(column);

    if (char =='#') trees++;
}

console.log(280*77*74*78*35);