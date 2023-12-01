// RUN SPECIFIC PUZZLE - node index.js 1-1 (day - part)
const fs = require('fs');
const day1 = require('./1/solution.js');
const day2 = require('./2/solution.js');
const day3 = require('./3/solution.js');
const day4 = require('./4/solution.js');
const day5 = require('./5/solution.js');
const day6 = require('./6/solution.js');
const day7 = require('./7/solution.js');
const day8 = require('./8/solution.js');
const day9 = require('./9/solution.js');

// File mapping
const runner = {
    1: {
        1: day1.part1,
        2: day1.part2
    },
    2: {
        1: day2.part1,
        2: day2.part2
    },
    3: {
        1: day3.part1,
        2: day3.part2
    },
    4: {
        1: day4.part1,
        2: day4.part2
    },
    5: {
        1: day5.part1,
        2: day5.part2
    },
    6: {
        1: day6.part1,
        2: day6.part2
    },
    7: {
        1: day7.part1,
        2: day7.part2
    },
    8: {
        1: day8.part1,
        2: day8.part2
    },
    9: {
        1: day9.part1,
        2: day9.part2
    }
};

const [day, part] = process.argv[2].split('-');

console.log(`Running day ${day} part ${part}`);
fs.readFile(`${day}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }

    // Run
    const result = runner[day][part](data);
    console.log('Result: ', result);
});