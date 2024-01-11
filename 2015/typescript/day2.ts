import { readFileSync } from "node:fs";
const path = "../input/day2.txt";
const fileStr = readFileSync(path, "utf-8");
const lines = fileStr.split(/\r?\n/);
const splitLines = lines.map((line) => line.split("x"));
const numLines = splitLines.map((line) => {
    return line.map((str) => parseInt(str));
});

const calc = (numArray) => {
    if (!numArray) return;
    let [l, w, h] = numArray;
    let area = 2 * l * w + 2 * w * h + 2 * h * l;
    let slack = Math.min(l * w, l * h, w * h);
    return area + slack;
};
let total = 0;

for (let item of numLines) {
    if (isNaN(item[0])) {
        break;
    } else {
        total += calc(item);
    }
}
console.log(total);
