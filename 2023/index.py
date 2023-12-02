import argparse
import os
from importlib import import_module

parser = argparse.ArgumentParser(description='Parameters parsing')
parser.add_argument('--day', type=int, help='Choose the day')
parser.add_argument('--part', type=int, default=1, help='Choose the day')
args = parser.parse_args()

day = args.day
part = args.part

if day is None:
    raise 'No day selected'

module = import_module(f'src.day{day}')
data = []

with open(os.path.dirname(os.path.realpath(__file__)) + '/input.txt', 'r') as f:
    for line in f:
        data.append(line.strip())

solution = None

if part == 2:
    solution = module.part2(data)
else:
    solution = module.part1(data)

print(f'Solution is: {solution}')


