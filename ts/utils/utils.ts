import { readFileSync } from "fs";

//Returns given file as a string
const fileAsString = (path) => {
    const file = readFileSync(path);
    return file.toString();
};


//Experimenting with and learning Typescript
type ParseOptsTypes = "array" | "string" | "both";

interface ParseOpts {
    returnType: ParseOptsTypes;

}

const parseToInt: (input: string, opts?: ParseOpts) => number = (input, opts?) => {
    if (!opts) {
        let result = parseInt(input);
        return result;
    }

    if (opts.returnType === "array") {
        let arr = [];

    }
}

export default fileAsString;