import * as fs from 'fs';

export const getPart = () => {
    const arg = process.argv[2];

    if (!arg) {
        throw new Error('Part not defined');
    }

    const part = Number.parseInt(arg);

    if (part < 1 || part > 2) {
        throw new Error('Part must be 1 or 2');
    }

    return part;
}

export const readFileRows = () => {
    return fs.readFileSync('input.txt', 'utf8').split('\n');
}