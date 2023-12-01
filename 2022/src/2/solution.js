const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

const PART2_WIN = SCISSOR;
const PART2_DRAW = PAPER;
const PART2_LOSS = ROCK;

const part1 = (rawData) => {
    const moves = map(rawData);
    let points = 0;

    moves.forEach((move) => {
        const opponent = move[0];
        const me = move[1];

        points += me;
        points += getResult(opponent, me);
    });

    return points;
}

const part2 = (rawData) => {
    const moves = map(rawData);
    let points = 0;

    moves.forEach((move) => {
        const opponent = move[0];
        let me = move[1];

        switch (me) {
            case PART2_WIN:

                switch (opponent) {
                    case ROCK:
                        me = PAPER;
                        break;
                    case PAPER:
                        me = SCISSOR;
                        break;
                    case SCISSOR:
                        me = ROCK;
                        break;
                }

                break;
            case PART2_DRAW:
                me = opponent;
                break;
            case PART2_LOSS:
                switch (opponent) {
                    case ROCK:
                        me = SCISSOR;
                        break;
                    case PAPER:
                        me = ROCK;
                        break;
                    case SCISSOR:
                        me = PAPER;
                        break;
                }
                break;
        }


        points += me;
        points += getResult(opponent, me);
    });

    return points;
}

function map(rawData) {
    const result = [];

    rawData.split('\n').forEach((raw) => {
        const moves = raw.split(' ');
        const tmp = [];

        switch (moves[0]) {
            case 'A':
                tmp.push(ROCK);
                break;
            case 'B':
                tmp.push(PAPER);
                break;
            case 'C':
                tmp.push(SCISSOR);
                break;
        }

        switch (moves[1]) {
            case 'X':
                tmp.push(ROCK);
                break;
            case 'Y':
                tmp.push(PAPER);
                break;
            case 'Z':
                tmp.push(SCISSOR);
                break;
        }

        result.push(tmp);
    });


    return result;
}

/**
 * @description WIN -> 6, DRAW -> 3, LOSS -> 0
 * @param opponent
 * @param me
 * @returns {number}
 */
function getResult(opponent, me) {

    // DRAW
    if (opponent === me) {
        return 3;
    }

    if (
        opponent === ROCK && me === PAPER ||
        opponent === PAPER && me === SCISSOR ||
        opponent === SCISSOR && me === ROCK
    ) {
        return 6;
    }

    return 0;
}

module.exports = {part1, part2};