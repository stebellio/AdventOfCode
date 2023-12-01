const file = require('fs');
const input = file.readFileSync('9/input.txt').toString();

const numbers = input.split('\n');
var invalid_number = 0;
//PARTE 1
part1();
//PARTE 2
invalid_number = Number.parseInt(invalid_number);
var set = Array();
for (i = 0; i < numbers.length; i++) {
    number = numbers[i];
    number = Number.parseInt(number);
    var result = findSet(number, i);
    if (result) break;
}

var set_values = Array();
i = set[0];
j = 0;
for (; i <= set[1]; i++) {
    set_values[j] = numbers[i];
    j++;
}
const max = Math.max.apply(null, set_values);
const min = Math.min.apply(null, set_values);
console.log(max + min);


function findSet(number, i){
    var sum = number;
    var j = i + 1;
    for (; j < numbers.length; j++) {
        next = numbers[j];
        next = Number.parseInt(next);
        if (next === number) continue;
        sum += next;
        if (sum === invalid_number) {
            set[0] = i;
            set[1] = j;
            return true;
        }
        else if (sum > invalid_number) break;
    }
}

function checkNumber(number, i) {
    number = Number.parseInt(number); //87
    for (k = 25; k > 0; k--) {
        var start = i - k; 
        var next = start + 1; 
        for (j = 0; j < 25; j++) {
            var sum = Number.parseInt(numbers[start]) + Number.parseInt(numbers[next]);
            if (number === sum) return true;
            next++;
        }
    }
    return false;
}

function part1(){
    for (i = 0; i < numbers.length; i++) {
        number = numbers[i];
        if (i < 25) continue;
        var result = checkNumber(number, i);
        if (!result) {
            invalid_number = number;
            break;
        }
    }
}