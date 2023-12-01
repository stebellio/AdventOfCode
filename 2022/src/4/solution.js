const part1 = (rawData) => {
    const data = map(rawData);
    let fullyContainerPairs = 0;

    data.forEach((couples) => {
        const first = couples[0];
        const second = couples[1];
        if (
            (first.end <= second.end && first.start >= second.start) || // first is into second
            (second.end <= first.end && second.start >= first.start)) // second is into first
        {
            fullyContainerPairs++;
        }
    });

    return fullyContainerPairs;
};
const part2 = (rawData) => {
    const data = map(rawData);
    let overlap = 0;

    data.forEach((couples) => {
        const first = couples[0];
        const second = couples[1];

        if (
            (first.start <= second.end && first.start >= second.start) || // First start in second
            (first.end <= second.end && first.end >= second.start) || // First end in second
            (second.start <= first.end && second.start >= first.start) || // Second start in first
            (second.end <= first.end && second.end >= first.start) // Second end in first
        ) {
            overlap++;
        }
    });

    return overlap;
};

function map(rawData) {

    const data = [];

    rawData.split('\n').forEach((raw) => {
        const couples = raw.split(',');

        data.push([
            {
                start: Number.parseInt(couples[0].split('-')[0]),
                end: Number.parseInt(couples[0].split('-')[1])
            },
            {
                start: Number.parseInt(couples[1].split('-')[0]),
                end: Number.parseInt(couples[1].split('-')[1])
            }]);
    });

    return data;
}

module.exports = {part1, part2};