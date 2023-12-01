const file = require('fs');
let input = file.readFileSync('input.txt').toString().split("\n");

var tot_passwords = input.length;
var invalid_password = 0;

for(row of input){
    
    let data = row.split(' ');
    data[1] = data[1].split(':');

    //SET VARIABLES
    var interval = data[0].split('-');
    var lower = interval[0];
    var higher = interval[1];

    var letter = data[1][0];
    var password = data[2];
    
    //CHECK
    var length = password.length;
    var n_occurences = 0;
    var characters = Array();

    for (i=0; i<length; i++){
        characters[i] = password.charAt(i);
    }

    //1 QUESTION
    // for (character of characters) {
    //     if (character == letter) {
    //         n_occurences++;
    //     }
    // }
    // if (n_occurences >= lower && n_occurences <= higher) {
    //     invalid_password++;
    // }

    //2 QUESTION
    lower = lower - 1; //0 doesn't exist
    higher = higher - 1;
    if (characters[lower] !== letter && characters[higher] !== letter){ //positions doesn't contain letter
        invalid_password++;
    }
    else if (characters[lower] == letter && characters[higher] == letter) { // both positions contains letter : INVALID
        invalid_password++;
    }
}

console.log(tot_passwords - invalid_password);