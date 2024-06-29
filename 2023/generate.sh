#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <number>"
  exit 1
fi

number=$1

dest_file="day${number}.py"
cd src
cp day.py.dist "$dest_file"


echo "File day.py.dist copiato in $dest_file"