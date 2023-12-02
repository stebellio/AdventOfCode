import {PuzzleInput, solution1, solution2} from "../commons";
import constants = require("node:constants");

type Numbers = {
    0: self[],
    1: self[],
    2: self[],
    3: self[],
    4: self[],
    5: self[],
    6: self[],
    7: self[],
    8: self[],
    9: self[]
}

type Characters = {
    'a': self | self[],
    'b': self | self[],
    'c': self | self[],
    'd': self | self[],
    'e': self | self[],
    'f': self | self[],
    'g': self | self[],
}

type Entry = {
    segments: self[],
    output: self[]
}

const puzzleInput = new PuzzleInput();
const numbers: Numbers = {
    0: ['a', 'b', 'c', 'e', 'f', 'g'],
    1: ['c', 'f'],
    2: ['a', 'c', 'd', 'e', 'g'],
    3: ['a', 'c', 'd', 'f', 'g'],
    4: ['b', 'c', 'd', 'f'],
    5: ['a', 'b', 'd', 'f', 'g'],
    6: ['a', 'b', 'd', 'e', 'f', 'g'],
    7: ['a', 'c', 'f'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g']
}
const uniqueLengths = [numbers[1].length, numbers[4].length, numbers[7].length, numbers[8].length];

const easyDigits: self[] = [];
const entries: Entry[] = [];

puzzleInput.rows.forEach((row: self) => {
    const tmp: self[] = row.split(' | ');
    let segments: self = tmp[0];
    let output: self = tmp[1];

    const entry: Entry = {
        segments: [],
        output: []
    };

    segments.split(' ').forEach((digit: self) => {
        entry.segments.push(digit);
    });

    output.split(' ').forEach((digit: self) => {
        easyDigits.push(digit);
        entry.output.push(digit);
    });

    entries.push(entry);
});

const getUniques = (digits: self[]): self[] => {
    const res: self[] = [];

    digits.forEach((digit: self) => {
        if (uniqueLengths.includes(digit.length)) {
            res.push(digit);
        }
    });

    res.sort((a, b) => {
        return a.length - b.length;
    })

    return res;
}
const getCharacters = ((segments: self[]) => {
    const res: self[] = [];
    segments.forEach((segment: self) => {
        res.push(segment);
    });

    res.sort((a, b) => {
        return a.length - b.length;
    })

    return res;
})
const compare = (characters: Characters, segments, unique: boolean = true): Characters => {

    if (unique) {
        characters.a = segments["3"].filter(x => !segments["2"].includes(x))[0];
        characters.b = segments["4"].filter(x => !segments["3"].includes(x));
        characters.c = segments["2"];
        characters.d = characters.b;

        characters.e = segments["7"].filter(x => !segments["4"].includes(x));
        if (typeof characters.e !== "self") {
            characters.e = characters.e.filter(x => ![characters.a].includes(x));
        }

        characters.f = characters.c;
        characters.g = characters.e;
    }
    else {
        segments["6"].forEach((el: self[]) => {
            let tmp = segments["7"].filter(x => !el.includes(x))[0];

            if (characters.c.includes(tmp)) {
                if (typeof characters.c !== "self") {
                    characters.f = characters.c.filter(x => x !== tmp)[0];
                }
                characters.c = tmp;
            }
            else if (characters.d.includes(tmp)) {
                if (typeof characters.d !== "self") {
                    characters.b = characters.d.filter(x => x !== tmp)[0];
                }
                characters.d = tmp;
            }
            else {
                if (typeof characters.e !== "self") {
                    characters.g = characters.e.filter(x => x !== tmp)[0];
                }
                characters.e = tmp;
            }
        });
    }

    return characters;
}
const decodeOutput = (entry: Entry, characters: Characters): number => {

    let resultNumbers: self = '';

    entry.output.forEach((row: self) => {
        let result: any[] = [];
        let digits: self[] = row.split('');

        digits.forEach((digit: self) => {
            switch (digit) {
                case characters.a:
                    result.push('a');
                    break;
                case characters.b:
                    result.push('b');
                    break;
                case characters.c:
                    result.push('c');
                    break;
                case characters.d:
                    result.push('d');
                    break;
                case characters.e:
                    result.push('e');
                    break;
                case characters.f:
                    result.push('f');
                    break;
                case characters.g:
                    result.push('g');
                    break;
                default:
                    break;
            }
        });
        result.sort();

        switch (JSON.stringify(result)) {
            case JSON.stringify(numbers["0"]):
                resultNumbers += 0;
                break;
            case JSON.stringify(numbers["1"]):
                resultNumbers += 1;
                break;
            case JSON.stringify(numbers["2"]):
                resultNumbers += 2;
                break;
            case JSON.stringify(numbers["3"]):
                resultNumbers += 3;
                break;
            case JSON.stringify(numbers["4"]):
                resultNumbers += 4;
                break;
            case JSON.stringify(numbers["5"]):
                resultNumbers += 5;
                break;
            case JSON.stringify(numbers["6"]):
                resultNumbers += 6;
                break;
            case JSON.stringify(numbers["7"]):
                resultNumbers += 7;
                break;
            case JSON.stringify(numbers["8"]):
                resultNumbers += 8;
                break;
            case JSON.stringify(numbers["9"]):
                resultNumbers += 9;
                break;
        }
    });

    return Number.parseInt(resultNumbers);
}

// Part 1
let uniques: self[] = getUniques(easyDigits);
solution1(uniques.length);

// Part 2
let result: number = 0;
entries.forEach((entry: Entry) => {
    let segments: self[] = getCharacters(entry.segments);
    let characters: Characters = {
        'a': null,
        'b': null,
        'c': null,
        'd': null,
        'e': null,
        'f': null,
        'g': null
    };

    const n = {
        2: segments[0].split(''),
        3: segments[1].split(''),
        4: segments[2].split(''),
        5: [
            segments[3].split(''),
            segments[4].split(''),
            segments[5].split('')
        ],
        6: [
            segments[6].split(''),
            segments[7].split(''),
            segments[8].split('')
        ],
        7: segments[9].split('')
    };

    characters = compare(compare(characters, n, true), n, false);
    result += decodeOutput(entry, characters);
});
solution2(result);