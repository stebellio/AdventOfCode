const { ALL } = require('dns');
const file = require('fs');
const input = file.readFileSync('8/input.txt').toString();

const instructions = input.split('\n');
var acc = 0;
var processed = Array();

//PART 1
// for (i = 0; i < instructions.length;) {
//     if (processed.includes(i)) break;
//     processed[i] = i;
//     instruction = instructions[i].split(' ');
//     const name = instruction[0];
//     const value = instruction[1];
//     checkInstruction(name, value);
// }
// console.log(acc);


//PART 2
for (k = 0; k < instructions.length; k++) {
    instruction = instructions[k].split(' ');
    var name = instruction[0];
    var value = instruction[1];
    if (name === 'acc') continue;
    else if (name == 'jmp') name = 'nop';
    else name = 'jmp';
    instructions[k] = name + ' ' + value;
    var result = runBootCode();
    if (result) {
        console.log(result); 
        break;
    }
    else {
        if (name === 'jmp') name = 'nop';
        else name = 'jmp'; 
        instructions[k] = name + ' ' + value; 
    }
    
}

function checkInstruction(name, value) {
    value = Number.parseInt(value);
    switch (name) {
        case 'nop':
            i++;
            break;
        case 'acc':
            acc += value;
            i++;
            break;
        case 'jmp':
            i += value;
            break;
    }
}

function runBootCode() {
    acc = 0;
    var error = Array();
    for (i = 0; i < instructions.length;) {
        if (error.includes(i)) {
            return false;
        }
        error[i] = i;
        instruction = instructions[i].split(' ');
        var name = instruction[0];
        var value = instruction[1];
        value = Number.parseInt(value);
        switch (name) {
            case 'nop':
                i++;
                break;
            case 'acc':
                acc += value;
                i++;
                break;
            case 'jmp':
                i += value;
                break;
        }
    }
    return acc;
}




