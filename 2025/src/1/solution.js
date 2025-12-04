import {getPart, readFileRows} from "../../lib/utils.js";

const START = 50;

console.log('Challenge 1');
console.log('===================');

getPart() === 1 ? firstPart() : secondPart();

function firstPart () {
    let current = START;
    let zeroOccurrences = 0;

    for (let rotation of readFileRows()) {
        const direction = rotation[0];
        const steps = Number.parseInt(rotation.slice(1));

        if (direction === 'L') current -= steps;
        else current += steps;

        if (current < 0) {
            current = 100 + current;
        }
        else if (current > 99) {
            current = current - 100;
        }

        if (current === 0) zeroOccurrences++;
    }

    console.log('Solution: ', zeroOccurrences);
}

function secondPart () {}