class Filesystem {
    name = '/';
    size = 0;
    type = 'dir';
    children = [];

    constructor(name, size, type) {
        this.name = name;
        this.size = size;
        this.type = type;
    }

    addChild(child) {
        this.children.push(child);
    }

    findChild(name) {
        return this.children.find((child) => child.name === name && child.type === 'dir');
    }

    setSize() {
        for (let child of this.children) {
            if (child.type === 'dir') {
                child.setSize();
                this.size += child.size;
            }
            else {
                this.size += child.size;
            }
        }
    }

    isDir() {
        return this.type === 'dir';
    }

    getSizeLessThan(value, result = []) {

        if (this.size <= value) {
            result.push(this);
        }

        if (this.isDir() && this.children.length) {

            for (let child of this.children) {
                if (child.isDir()) {
                    result = child.getSizeLessThan(value, result);
                }
            }

        }

        return result;
    }
    getSizeHigherThan(value, result = []) {

        if (this.size > value) {
            result.push(this);
        }

        if (this.isDir() && this.children.length) {

            for (let child of this.children) {
                if (child.isDir()) {
                    result = child.getSizeHigherThan(value, result);
                }
            }

        }

        return result;
    }


}

const MAX_FS_SPACE = 70000000;
const MIN_FREE_SPACE = 30000000;

const part1 = (rawData) => {
    const fs = getDataStruct(rawData);
    const results = fs.getSizeLessThan(100000);

    let total = 0;
    results.forEach((el) => {
        total += el.size;
    });

    return total;
};


const part2 = (rawData) => {
    const fs = getDataStruct(rawData);
    const freeSpace = MAX_FS_SPACE - fs.size;
    const toDelete = MIN_FREE_SPACE - freeSpace;

    let result = MIN_FREE_SPACE;

    fs.getSizeHigherThan(toDelete).forEach((el) => {
        if (el.size < result) {
            result = el.size;
        }
    });

    return result;

};


function getDataStruct(rawData) {
    const fs = new Filesystem('/', 0, 'dir');
    const consoleRows = rawData.split('\n');
    let current = fs;
    let history = [];

    consoleRows.forEach((row) => {
        if (row.includes('$')) {
            let action = row.substring(1);

            // cd
            if (action.includes('cd')) {
                let argument = action.substring(4);

                if (argument === '..') {
                    current = history[history.length - 1];
                    history = history.slice(0, -1);
                }
                else if (argument === '/') {
                    current = fs;
                }
                else {
                    history.push(current);
                    current = current.findChild(argument);
                }
            }

            // ls
            // do nothing
        }
        else {
            if (row.includes('dir'))  {
                current.addChild(new Filesystem(
                    row.substring(4),
                    0,
                    'dir'
                ));
            }
            else {
                let [size, name] = row.split(' ');
                current.addChild(new Filesystem(name, Number.parseInt(size), 'file'));
            }
        }
    });

    fs.setSize();
    return fs;
}


module.exports = {part1, part2};