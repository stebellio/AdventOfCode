let woods;
let rowLen;
let colLen;

class Tree {
    height;
    neighborhood = null;

    constructor(height) {
        this.height = height;
    }

    setNeighborhood(Ri, Ci) {

        this.neighborhood = {
            left: [],
            right: [],
            top: [],
            bottom: []
        };

        for (let T = 0; T < Ri; T++) {
            this.neighborhood.top.push(woods[T][Ci]);
        }

        for (let B = (rowLen - 1); B > Ri; B--) {
            this.neighborhood.bottom.push(woods[B][Ci]);
        }

        for (let L = 0; L < Ci; L++) {
            this.neighborhood.left.push(woods[Ri][L]);
        }

        for (let R = (colLen - 1); R > Ci; R--) {
            this.neighborhood.right.push(woods[Ri][R]);
        }

    }

    isVisible() {
        if (this.neighborhood === null) {
            throw 'No neighborhood';
        }

        const leftHigher = this.neighborhood.left.filter((tree) => tree.height >= this.height);
        const rightHigher = this.neighborhood.right.filter((tree) => tree.height >= this.height);
        const topHigher = this.neighborhood.top.filter((tree) => tree.height >= this.height);
        const bottomHigher = this.neighborhood.bottom.filter((tree) => tree.height >= this.height);

        return !(leftHigher.length && rightHigher.length && topHigher.length && bottomHigher.length);
    }

    getScore() {

        let leftScore = this._getDirectionScore(this.neighborhood.left.reverse());
        let rightScore = this._getDirectionScore(this.neighborhood.right.reverse());
        let topScore = this._getDirectionScore(this.neighborhood.top.reverse());
        let bottomScore = this._getDirectionScore(this.neighborhood.bottom.reverse());

        return leftScore * rightScore * topScore * bottomScore;
    }

    _getDirectionScore(array) {
        let score = 1;

        for (let i = 0; i < array.length; i++) {

            let tree = array[i];

            if (tree.height < this.height) {
                if (i < (array.length - 1)) {
                    score ++;
                }
            }
            else {
                break;
            }
        }

        return score;
    }

}

const part1 = (rawData) => {
    formatData(rawData);

    // col length + row length
    let count = 0;

    woods.forEach((row, Ri) => {
        row.forEach((tree, Ci) => {

            if (Ri > 0 && Ci > 0 && Ri < (rowLen - 1) && Ci < (colLen - 1)) {

                tree.setNeighborhood(Ri, Ci);
                if (tree.isVisible()) {
                    count++;
                }

            }
            else {
                count++;
            }

        });
    });

    return count;
};

const part2 = (rawData) => {
    formatData(rawData);

    let scenicScore = 0;

    woods.forEach((row, Ri) => {
        row.forEach((tree, Ci) => {
            if (Ri > 0 && Ci > 0 && Ri < (rowLen - 1) && Ci < (colLen - 1)) {
                tree.setNeighborhood(Ri, Ci);
                let score = tree.getScore();

                if (score > scenicScore) {
                    scenicScore = score;
                }
            }
        });
    });

    return scenicScore;
};

function formatData(data) {
    woods = data.split('\n').map(row => row.split('').map((col) => new Tree(Number.parseInt(col))));
    rowLen = woods[0].length;
    colLen = woods.length;
}


module.exports = {part1, part2};