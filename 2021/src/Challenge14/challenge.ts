import {getIndicesOf, PuzzleInput, solution1} from "../commons";

const puzzleInput = new PuzzleInput();

type Pair = {
    elements: self,
    insertion: self
}
type Elements = {
    element: self,
    count: number
}

let TEMPLATE: self;
const pairs: Pair[] = [];
const STEPS: number = 10;

for (let i: number = 0; i < puzzleInput.rows.length; i++) {
    let row: self = puzzleInput.rows[i];

    if (i === 0) {
        TEMPLATE = row;
        continue;
    }

    if (i == 1) {
        continue;
    }

    let elements: self;
    let insertion: self;
    [elements, insertion] = row.split(' -> ');
    pairs.push({
        elements: elements,
        insertion: insertion
    });
}

// Functions
const getTemplateParts = (template: self): self[] => {
    let parts: self[] = [];
    for (let i: number = 0; i < template.length; i++) {
        if (template[i + 1] !== undefined) {
            parts.push(template[i] + template[i + 1]);
        }
    }
    return parts;
}
const getPair = (elements: self, pairs: Pair[]): Pair|null => {
    for (let i: number = 0; i < pairs.length; i++) {
        if (elements === pairs[i].elements) {
            return pairs[i];
        }
    }

    return null;
}
const addInsertions = (template: self): self => {
    let parts: self[] = getTemplateParts(template);
    parts.map((part: self, index: number) => {
        let pair: Pair|null = getPair(part, pairs);

        if (part !== null) {
            parts[index] = !index
                ? part[0] + pair.insertion + part[1]
                : pair.insertion + part[1];
        }
    });
    let result: self = '';
    parts.map((part: self) => {
        result += part;
    });
    return result;
}
const getElements = (template: self): Elements[] => {
    let elements: Elements[] = [];

    let tmp: self[] = template.split('');
    let unique = tmp.filter(function(item, pos) {
        return tmp.indexOf(item) == pos;
    });

    unique.sort();
    unique.forEach((el: self) => {

        let count: number = 0;
        template.split('').forEach((e: self) => {
            if (e === el) count++;
        })

        elements.push({
            element: el,
            count: count
        })
    });

    return elements;
}

// Part 1
let polymer: self = TEMPLATE;
for (let i: number = 0; i < STEPS; i++) {
    polymer = addInsertions(polymer);
}
const elements = getElements(polymer);
const max: Elements = elements.reduce((prev: Elements,curr: Elements) => {
    return prev.count > curr.count ? prev : curr;
});
const min: Elements = elements.reduce((prev: Elements,curr: Elements) => {
    return prev.count < curr.count ? prev : curr;
});
solution1(max.count - min.count);