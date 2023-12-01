const part1 = (rawData) => {

    let sum = 0;

    map(rawData).forEach((rucksack) => {
        const compartment1 = rucksack[0].split('');
        const compartment2 = rucksack[1].split('');

        let shared = compartment1.filter((el) => compartment2.includes(el));
        shared = [...new Set(shared)]; // remove duplicated values

        shared.forEach((item) => {
            sum += getPriority(item);
        });
    });

    return sum;
}

const part2 = (rawData) => {
    const groups = [];

    // Group division
    let i = 0;
    map(rawData).forEach((rucksack, index) => {
        if (!groups[i]){
            groups[i] = [];
        }

        groups[i].push(rucksack[0] + rucksack[1]);

        if (!((index + 1) % 3)) {
            i++;
        }

    });

    // Shared values sum
    let sum = 0;

    groups.forEach((group) => {
        const rucksack1 = group[0].split('');
        const rucksack2 = group[1].split('');
        const rucksack3 = group[2].split('');

        let shared = rucksack1.filter((el) => rucksack2.includes(el));
        shared = shared.filter((el) => rucksack3.includes(el));
        shared = [...new Set(shared)];

        shared.forEach((item) => {
            sum += getPriority(item);
        })

    });

    return sum;
}

/**
 * @description Map data to [firstCompartment, secondCompartment]
 * @param rawData
 * @returns {*[]}
 */
function map(rawData) {

    const data = [];

    rawData.split('\n').forEach((row) => {
        data.push([row.substring(0, row.length / 2),row.substring(row.length / 2)])
    });

    return data;
}

/**
 *
 * @param element
 * @returns {number}
 */
function getPriority(element) {

    const chars = 'abcdefghijklmnopqrstuvwxyz';

    // Item priority in lower case
    let priority = chars.split('').findIndex((el) => el === element.toLowerCase());

    // If item is uppercase
    if (element === element.toUpperCase()) {
        priority += chars.length;
    }

    return priority + 1;
}

module.exports = {part1, part2};