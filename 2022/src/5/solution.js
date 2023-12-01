let dataMatrix = [];
let instrMatrix = [];

const getResults = () => {
    let results = '';

    dataMatrix.forEach((col) => {
        results += col[col.length - 1];
    });

    return results;
};

const part1 = (rawData) => {
    formatData(rawData);

    instrMatrix.forEach((instr) => {

        const from = instr.from - 1;
        const to = instr.to - 1;

        for (let i = 0; i < instr.amount; i++) {

            const last = dataMatrix[from].length - 1;

            dataMatrix[to].push(dataMatrix[from][last]);
            dataMatrix[from].splice(last, 1);
        }
    });

    return getResults();
};

const part2 = (rawData) => {
    formatData(rawData);

    instrMatrix.forEach((instr) => {

        const from = instr.from - 1;
        const to = instr.to - 1;

        const tmpMoveArray = [];

        for (let i = 0; i < instr.amount; i++) {

            const last = dataMatrix[from].length - 1;

            tmpMoveArray.push(dataMatrix[from][last]);
            dataMatrix[from].splice(last, 1);
        }

        // Revert to original positions
        tmpMoveArray.reverse();

        dataMatrix[to] = dataMatrix[to].concat(tmpMoveArray);
    });

    return getResults();
};



function formatData(data) {
    const rows = data.split('\n');
    const dataRows = [];
    const instrRows = []

    let dataSection = true;
    rows.forEach((row) => {
        if (row === '') {
            dataSection = false;
        }
        else {
            if (dataSection) {
                dataRows.push(row);
            }
            else {
                instrRows.push(row);
            }
        }
    });


    let dataMatrixTmp = formatDataRows(dataRows);
    dataMatrix =  dataMatrixTmp[0].map((_, colIndex) => dataMatrixTmp.map(row => row[colIndex]));

    dataMatrix.forEach((row, index) => {
        dataMatrix[index] = row.reverse().filter((e) => e !== '#');
    });

    instrMatrix = formatInstrRows(instrRows);
}
function formatDataRows(rows) {
    const dataMatrix = [];

    let max = 0;

    rows.forEach((row) => {
        let cols = [];

        for (let i = 0; i < row.length; i = i + 3){
            let el = row.substring(i, i + 3).trim();

            if (!el.length) {
                el = '#';
            }
            else if (el.startsWith('[')) {
                el = el.substring(1,2);
            }
            else if (!Number.isNaN(el)) {
                el = Number.parseInt(el);
            }

            cols.push(el);

            i++;
        }

        if (cols.length && cols[0] !== 1){
            dataMatrix.push(cols);
        }

        if (cols[0] === 1) {
            max = cols.length;
        }
    });

    dataMatrix.forEach((row, index) => {

        for (let i = 0; i < max; i++) {
            if (!row[i]) {
                row[i] = '#';
            }
        }

        dataMatrix[index] = row;

    });

    return dataMatrix;
}
function formatInstrRows(rows) {
    const matrix = [];

    rows.forEach((row) => {

        let newRow;

        newRow = row.replace('move ', '');
        newRow = newRow.replace('from ', '');
        newRow = newRow.replace('to ', '');

        const numbers = newRow.split(' ');

        matrix.push({
            amount: Number.parseInt(numbers[0]),
            from: Number.parseInt(numbers[1]),
            to: Number.parseInt(numbers[2])
        })
    });

    return matrix;
}


module.exports = {part1, part2};