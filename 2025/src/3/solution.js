import {getPart, readFileRows} from "../../lib/utils.js";

console.log('Challenge 3');
console.log('===================');

getPart() === 1 ? firstPart() : secondPart();

function firstPart () {
    const banks = readFileRows();
    let sum = 0;
    for (let bank of banks) {
        let max1 = 0;
        let max2 = 0;
        const batteries = bank.split('').map(Number);

        for (let i = 0; i < batteries.length; i++) {
            const number = batteries[i];

            if (number > max2) {
                max2 = number;
            }

            if (i < batteries.length - 1 && number > max1) {
                max1 = number;
                max2 = 0;
            }
        }

        sum += Number.parseInt(max1.toString() + max2.toString());
    }

    console.log('Solution: ', sum);
}

function secondPart () {
    console.log('Solution: ', sum);
}