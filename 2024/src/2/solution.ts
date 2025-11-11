import {getPart, readFileRows} from "../../lib/utils";

const checkIsSafe = (data: number[], callback: Function) => {
    for (let i = 0; i < data.length; i++) {
        const j = i + 1;

        if (j >= data.length) break;

        const diff = Math.abs(data[i] - data[j]);
        if (callback(data[i], data[j]) || diff < 1 || diff > 3) return false;
    }
    return true;
}

console.log('Challenge 2');
console.log('===================');

getPart() === 1 ? firstPart() : secondPart();

function firstPart () {
    const data = readFileRows();
    let safeCount = 0;

    for (const row of data) {
        const elements = row.split(' ').map(Number);

        if (
            checkIsSafe(elements, (current: number, next: number) => current < next) ||
            checkIsSafe(elements, (current: number, next: number) => current > next)
        ) {
            safeCount++;
        }
    }

    console.log('Solution: ', safeCount);
}

function secondPart () {
    
}