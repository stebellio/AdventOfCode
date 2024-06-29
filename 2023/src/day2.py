import json


def part1(data: []) -> int:
    games = getGames(data)
    result = 0

    for game in games:
        if game.isPossible(12, 13, 14):
            result += game.number

    return result


def part2(data: []) -> str:
    games = getGames(data)
    result = 0

    for game in games:
        minimum_set = game.minimumSet()
        result += minimum_set.green * minimum_set.red * minimum_set.blue

    return result


class Game:

    def __init__(self, number: int, sets: []):
        self.number = number
        self.sets = sets

    def isPossible(self, red: int, green: int, blue: int) -> bool:
        for singleSet in self.sets:
            if singleSet.red > red or singleSet.green > green or singleSet.blue > blue:
                return False
        return True

    def minimumSet(self) -> object:
        minimum_set = Set()

        for singleSet in self.sets:
            if singleSet.green > minimum_set.green:
                minimum_set.green = singleSet.green
            if singleSet.red > minimum_set.red:
                minimum_set.red = singleSet.red
            if singleSet.blue > minimum_set.blue:
                minimum_set.blue = singleSet.blue

        return minimum_set


class Set:
    green = 0
    red = 0
    blue = 0

    def setItem(self, name: str, value: int):
        if name == 'green':
            self.green = value
        elif name == 'red':
            self.red = value
        else:
            self.blue = value

    @staticmethod
    def serializer(obj):
        if isinstance(obj, Set):
            return {"green": obj.green, "red": obj.red, "blue": obj.blue}
        raise TypeError(f"Type {obj.__class__.__name__} not serializable")


def getGames(data: []) -> []:
    games = []

    for line in data:
        games.append(decodeGame(line))

    return games


def decodeGame(string: str) -> Game:
    arr = string.split(': ')
    gameNumber = int(arr[0][5:])
    sets = arr[1].split('; ')

    data = []

    for index, set in enumerate(sets):
        setObj = Set()
        items = set.split(', ')
        for item in items:
            tmp = item.split(' ')
            setObj.setItem(tmp[1], int(tmp[0]))
        data.append(setObj)

    return Game(gameNumber, data)
