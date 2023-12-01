

const part1 = (rawData) => {

    const data = map(rawData);
    let result = 0;

    data.forEach((elfCalories) => {
        if (elfCalories > result) {
            result = elfCalories;
        }
    })

    return result;
};

const part2 = (rawData) => {
    let data = map(rawData);
    data = data.sort().reverse();

    let result = 0;

    for (let i = 0; i < 3; i++) {
        result += data[i];
    }

    return result;
};

function format(rawData) {
    const data = [];

    rawData.split('\n\n').forEach((el) => {
        data.push(el.split('\n'));
    });

    return data;
}

/**
 * @description Mapping elfs entities
 * @param rawData
 * @returns {{}}
 */
function map(rawData) {
    const mapping = [];
    format(rawData).forEach((items, index) => {
        mapping[index] = 0;
        items.forEach((item) => {
            const calories = Number.parseInt(item);
            mapping[index] += calories;
        });
    });
    return mapping;
}

module.exports = {part1, part2};