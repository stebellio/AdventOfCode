const file = require('fs');
const input = file.readFileSync('4/input.txt').toString();
const passports = input.split('\n\n');

var valid_passports = 0;
//PARTE 1
// for (passport of passports) {
//     var count = 0;
//     var lines = passport.split('\n');
//     for (line of lines) {
//         var fields = line.split(' ');
//         for (field of fields) {
//             field = field.split(':');
//             var key = field[0];
//             if (key !== 'cid') count++;
//         }
//     }
//     if (count === 7) valid_passports++;
// }

// console.log(valid_passports);

//PARTE 2
for (passport of passports) {
    var count = 0;
    var lines = passport.split('\n');
    for (line of lines) {
        var fields = line.split(' ');
        for (field of fields) {
            field = field.split(':');
            var key = field[0];
            var value = field[1];
            
            if (key === 'byr') {
                if (value >= 1920 && value <= 2002 && value.length === 4) { 
                    count++; 
                } 
            }

            if (key === 'iyr') {
                if (value >= 2010 && value <= 2020 && value.length === 4) { 
                    count++; 
                } 
            }

            if (key === 'eyr') {
                if (value >= 2020 && value <= 2030 && value.length === 4) { 
                    count++; 
                } 
            }

            if (key === 'hgt') {
                if (value.includes('cm')) { 
                    value = value.split('cm');
                    if (value[0] >= 150 && value[0] <= 193) count++;
                }
                else if(value.includes('in')){
                    value = value.split('in');
                    if (value[0] >= 59 && value[0] <= 76) count++;
                }
            }

            if (key === 'hcl') {
                if (value.charAt(0) === '#') {
                    value = value.split('#');
                    value = value[1];
                    if (value.length === 6) {
                        const stringRegex = /[a-f]/g;
                        const intRegex = /[0-9]/g; 
                        const stringArray = value.match(stringRegex);
                        const intArray = value.match(intRegex);
                        if (stringArray !== null && stringArray.length == 6) {
                            count++;
                        }
                        else if (intArray !== null && intArray.length == 6) {
                            count++;
                        }
                        
                    }
                }
            }

            if (key === 'ecl') {
                if (value === 'amb' || value === 'blu' || value === 'brn' 
                || value === 'gry' || value === 'grn' || value === 'hzl' || value === 'oth') {
                    count++;
                }
            }

            if (key === 'pid') {
                if (value.length === 9) count++;
            }
            

        }
    }
    if (count === 7) valid_passports++; 
}

console.log(valid_passports);