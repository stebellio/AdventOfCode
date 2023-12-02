def part1(data: []) -> str:
    total = 0

    for line in data:
        total += extractNumber(line)

    return str(total)


def part2(data: []) -> str:
    total = 0

    for line in data:
        total += extractNumber(stringToNumber(line))

    return total


def extractNumber(string: str) -> int:
    first = None
    last = None

    for char in string:
        if char.isdigit():
            if first is None:
                first = char
            last = char

    return int(first + last)


def stringToNumber(string: str) -> str:

    newString = ''

    for char in string:
        if char.isdigit():
            newString += char
        elif string.startswith('one'):
            newString += '1'
        elif string.startswith('two'):
            newString += '2'
        elif string.startswith('three'):
            newString += '3'
        elif string.startswith('four'):
            newString += '4'
        elif string.startswith('five'):
            newString += '5'
        elif string.startswith('six'):
            newString += '6'
        elif string.startswith('seven'):
            newString += '7'
        elif string.startswith('eight'):
            newString += '8'
        elif string.startswith('nine'):
            newString += '9'
        string = string[1:]

    return newString
