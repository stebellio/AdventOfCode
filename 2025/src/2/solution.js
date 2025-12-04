import {getPart, readFileRows} from "../../lib/utils.js";

console.log('Challenge 2');
console.log('===================');

getPart() === 1 ? firstPart() : secondPart();

function firstPart () {
    const data = readFileRows()[0].split(',');
    let sum = 0;

    for (let range of data) {
        const [start, end] = range.split('-').map(Number);
        sum += getInvalidNumberInRange(start, end);
    }

    console.log('Solution: ', sum);
}

function secondPart () {}

function getInvalidNumberInRange(start, end) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        const value = i.toString();

        if (value.length % 2 === 0) {
            const firstPart = value.slice(0, value.length / 2);
            const secondPart = value.slice(value.length / 2);
            if (firstPart === secondPart) {
                console.log(i);
                sum += i;
            }
        }
    }

    return sum;
}