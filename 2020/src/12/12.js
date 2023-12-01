const fs = require('fs')

const data = [
    {'action': 'E', 'value': 0},
    {'action': 'S', 'value': 0},
    {'action': 'W', 'value': 0},
    {'action': 'N', 'value': 0}
]

fs.readFile('input.txt', 'utf8', function (err, res) {
    let input = res.split(' ');
    execute(input)
    console.log(data)
    const horizontal = Math.abs(data[0].value - data[2].value);
    const vertical = Math.abs(data[3].value - data[1].value);
    console.log(horizontal + vertical);
})

function execute(input) {
    let index = 0;
    for (item of input) {
        const action = item.substr(0,1);
        const value = parseInt(item.substr(1, item.length));

        switch (action) {
            case 'E':
                data[0].value += value
                break
            case 'S':
                data[1].value += value
                break
            case 'W':
                data[2].value += value
                break
            case 'N':
                data[3].value += value
                break
            case 'F':
                data[index].value += value
                break
            case 'R':
                index += value / 90
                break
            case 'L':
                index -= value / 90
                break
        }

        if (index < 0) index = 4 + index;
        else if (index > 3) index = index - 4

    }
}
