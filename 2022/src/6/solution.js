const part1 = (rawData) => {
    return findPattern(rawData, 4);
};

const part2 = (rawData) => {
    return findPattern(rawData, 14);
};

function findPattern(rawData, len) {
    for (let i = 0; i < rawData.length; i++) {

        if (i < len) {
            continue;
        }

        let string = '';
        for (let j = len; j > 0; j--) {
            string += rawData[i - j];
        }

        if (isUnique(string)) {
            return  i;
        }
    }
}

function isUnique(string) {

    const array = string.split('');
    const map = array.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    for (let char of array) {
        if (map.get(char) > 1) {
            return false;
        }
    }

    return true;
}

module.exports = {part1, part2};