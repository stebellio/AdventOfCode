const file = require('fs');
const input = file.readFileSync('input.txt').toString();

const groups = input.split('\n\n');
var sum = 0;

//PART 1
// for (group of groups) {
//     const lines = group.split('\n');
//     var tot_chars = Array();
//     for (line of lines) {
//         const chars = Array.from(line);
//         tot_chars = tot_chars.concat(chars);
//     }
//     tot_chars = [...new Set(tot_chars)]; //remove duplicates
//     sum += tot_chars.length;
// }
// console.log(sum);

//PART 2
for (group of groups) {
    const lines = group.split('\n');
    var filter = Array.from(lines[0]);
    for (i = 0; i < (lines.length - 1); i++) {
        const next = Array.from(lines[i + 1]);
        filter = filter.filter(value => next.includes(value));
    }
    sum += filter.length;
}

console.log(sum);

