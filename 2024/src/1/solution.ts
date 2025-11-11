import {getPart, readFileRows} from "../../lib/utils";

const getData = () => {
    const left = [];
    const right = [];
    const data = readFileRows();

    for (const row of data) {
        const [l, r] = row.split('  ').map(Number);
        left.push(l);
        right.push(r);
    }

    return [left, right];
}

console.log('Challenge 1');
console.log('===================');

getPart() === 1 ? firstPart() : secondPart();

function firstPart () {
    const [left, right] = getData();

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let sum = 0;
    for (let i = 0; i < left.length; i++) {
        sum += Math.abs(left[i] - right[i]);
    }

    console.log('Solution: ', sum);
}

function secondPart () {
    const [left, right] = getData();

    let sum = 0;
    for (let l of left) {
        const occurrences = right.filter(r => r === l);
        sum += (l * occurrences.length);
    }

    console.log('Solution: ', sum);
}