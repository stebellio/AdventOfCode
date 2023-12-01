const file = require('fs');
const input = file.readFileSync('input.txt').toString();

const jolts = input.split('\n');
convert();
//PART 1
// var one = 0;
// var three = 0;
// for (i = 0; i < jolts.length; i++) {
//     const jolt = jolts[i];
//     const next = jolts[i+1];
//     if (i === (jolts.length - 1)) break;
//     var diff = next - jolt;
//     if (diff === 1) one++;
//     else if (diff === 3) three++;
//     else {
//         console.log('error: ');
//         break;
//     }
// }
// one++;
// console.log(one * three);
//PART 2

console.log(jolts);



function convert() {
    for (i = 0; i < jolts.length; i++) {
        jolts[i] = Number.parseInt(jolts[i]);
    }
    var higher = Math.max.apply(null, jolts);
    jolts[jolts.length] = higher + 3;
    jolts.sort(function(a,b) {
        return a-b;
    });
}

