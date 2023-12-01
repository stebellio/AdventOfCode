const file = require('fs');
const input = file.readFileSync('7/input.txt').toString();

const rules = input.split('\n');
var valid_bags = Array();
var colorNumber = 0;
i = 0;
check('shiny gold')
while (true) {
    for (j = 0; j < valid_bags.length; j++) {
        check(valid_bags[j]);
        j++;
    }
    valid_bags = [...new Set(valid_bags)];
    if (colorNumber === valid_bags.length) break;
    colorNumber = valid_bags.length;
}
if (valid_bags.includes('shiny gold')) colorNumber--;
console.log(colorNumber);

function check(color) {
    for (rule of rules) {
        if (rule.includes(color)) {
            rule = rule.split(' bags');
            valid_bags[i] = rule[0];
            i++;
        }
    }
}