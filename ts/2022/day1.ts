import readFileAsString from "../utils/utils.js";
const path = "./input/day1.txt";
const file = readFileAsString(path);
const regExMatch = /\r?\n/;
const splitFile = file.split(/\r?\n/);
const seperateElves: (file: string[]) => string[][] = (file) => {
    let array = [];
    let buffer = [];
    //iterate over string until reaching a newline
    for (let index in file) {

        if (!file[index]) {
            array.push(buffer);
            buffer = [];
            continue;
        }
        buffer.push(file[index]);
    }
    return array;
}

const rawElfArray = seperateElves(splitFile);

interface Elf {
    numOfItems: number;
    ownIndex: number;
    originalArray: string[];
    averageCalories: number;
    totalCalories: number;

}

const elfFactory: (array: string[], indexOfSelf: number) => Elf = (array, indexOfSelf) => {
    let elf: Elf = { totalCalories: 0, ownIndex: indexOfSelf, averageCalories: 0, numOfItems: array.length, originalArray: array };
    let total = 0;
    for (let i of array) {
        total += parseInt(i);
    }
    elf.totalCalories = total;
    elf.averageCalories = elf.totalCalories / elf.numOfItems;
    return elf;
}
const elfArray = rawElfArray.map(elfFactory);

interface Results {
    part1: Elf;
    part2: number;
}

//resultsPart2 returns BOTH answers - so resultsPart1 is redundant
const resultsPart1: (array: Elf[]) => Elf = (array) => {
    let currentElf;
    for (let elf of array) {
        if (!currentElf || elf.totalCalories > currentElf.totalCalories) {
            currentElf = elf;
        }
    }
    return currentElf;
}


// console.log("**********\n");
// console.log(resultsPart1(elfArray).totalCalories);
// console.log("\n**********");



const resultsPart2: (array: Elf[]) => Results = array => {
    let results = [];
    let part2;
    let part1;
    for (let elf of array) {
        if (!part1 || elf.totalCalories > part1.totalCalories) {
            part1 = elf;
        }
        if (results.length < 3) {
            results.push(elf.totalCalories);
            results.sort((a, b) => b - a);

        }
        if (elf.totalCalories > results[2]) {
            results.push(elf.totalCalories);
            results.sort((a, b) => b - a);
            results.pop();

        }

    }
    part2 = results.reduce((prev, curr) => curr + prev);

    const res: Results = { part1, part2 };
    return res;
}


// const results = JSON.stringify(resultsPart2(elfArray), null, 2);
const results = resultsPart2(elfArray);
console.log("**********\n");
console.dir(`Part 1: ${JSON.stringify(results.part1.totalCalories)}\n`);
console.dir(`Part 2: ${results.part2}\n`);
console.log("\n**********");
