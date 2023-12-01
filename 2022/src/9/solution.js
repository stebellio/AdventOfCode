const start = {
    x: 0,
    y: 0
};

const part1 = (rawData) => {
    const moves = formatRows(rawData);
    let head = {...start};
    let tail = {...start};
    let tailSteps = [{...start}];

    for (let move of moves) {
        tailSteps = moveHead(
            move.direction,
            move.steps,
            head,
            tail,
            tailSteps
        );
    }

    tailSteps = tailSteps.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.x === value.x && t.y === value.y
            ))
    );

    return tailSteps.length;

};

const part2 = () => {

};

function formatRows(rawData) {
    let data = [];
    rawData = rawData.split('\n');
    for (let row of rawData) {
        let [direction, steps] = row.split(' ');
        data.push({
            direction: direction,
            steps: Number.parseInt(steps)
        });
    }
    return data;
}

function moveHead(direction, steps, head, tail, tailSteps) {
    switch (direction) {
        case 'R':
            head.x += steps;

            while (!isNear(head, tail)) {
                tail.x++;

                if (head.y > tail.y) {
                    tail.y++;
                }

                if (head.y < tail.y) {
                    tail.y--;
                }

                tailSteps.push({...tail});
            }

            break;
        case 'L':
            head.x -= steps;

            while (!isNear(head, tail)) {
                if (head.y > tail.y) {
                    tail.y++;
                }

                if (head.y < tail.y) {
                    tail.y--;
                }

                tail.x--;
                tailSteps.push({...tail});
            }

            break;
        case 'D':
            head.y -= steps;

            while (!isNear(head, tail)) {
                if (head.x > tail.x) {
                    tail.x++;
                }

                if (head.x < tail.x) {
                    tail.x--;
                }

                tail.y--;
                tailSteps.push({...tail});
            }

            break;
        case 'U':
            head.y += steps;

            while (!isNear(head, tail)) {
                if (head.x > tail.x) {
                    tail.x++;
                }

                if (head.x < tail.x) {
                    tail.x--;
                }

                tail.y++;
                tailSteps.push({...tail});
            }

            break;
    }
    return tailSteps;
}

function isNear(head, tail) {
    const diffX = Math.abs(head.x - tail.x);
    const diffY = Math.abs(head.y - tail.y);

    return (diffX <= 1 && diffY <= 1);
}


module.exports = {part1, part2};