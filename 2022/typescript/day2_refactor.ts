import fileAsString from "./utils/utils";
const path = "../input/day2.txt";
// const file = fileAsString(path).split(/\r?\n/);
const file = fileAsString(path).split("\n");
// console.log("First index of file: ", file[0]);
enum Choice {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
}
interface Round {

    lhs: string;
    rhs: string;
}
enum Points {
    Win = 6,
    Draw = 3,
    Lose = 0,
}

enum Part2Letters {
    X = "Lose",
    Y = "Draw",
    Z = "Win",
}
enum WinningScenarios {
    Rock = "Scissors",
    Paper = "Rock",
    Scissors = "Paper",
}

const parseToRound = (moves: string): Round => {
    let [opp, _, player] = moves;
    let lhs = decode(opp);
    let rhs = decode(player);
    // console.log(`Opp: ${lhs}\nPlayer: ${rhs}`)
    return { lhs, rhs };
}

const checkWin = (playerChoice: string): string => {
    return WinningScenarios[playerChoice];
}

const decode = (letter: string): string => {
    switch (letter) {
        case "A":
        case "X": return "Rock";
        case "B":
        case "Y": return "Paper";
        case "C":
        case "Z": return "Scissors";
    }
}

const part1 = (round: Round) => {
    let { lhs, rhs } = round;
    if (rhs === checkWin(lhs)) {
        return {
            opponent: Points.Win + Choice[lhs],
            player: Points.Lose + Choice[rhs],
        }
        // console.log(`Winner: ${lhs}`);
    }
    else if (lhs === checkWin(rhs)) {
        // console.log(`RHS Player wins!: ${rhs}`)
    }
    else {
        // console.log(`TIE!!!!!\nOpponent played:${lhs} Player played: ${rhs}`)
    }
}

interface Score {
    opponent: number;
    player: number;
}

interface Game {
    score: Score;
    roundNumber: number;
}

interface Results {
    playerScore: number,
    playerMove: string,
    opponentScore: number,
}

//Basically everything below is for Part2
const decodeToMove = (opponent: string, scenario: string): Results => {

    let results = {
        playerMove: "",
        playerScore: 0,
        opponentScore: 0,
    }

    let decodedOpp = decode(opponent);
    //Should I return an object here? Would allow me to pass players points, choice and also opponents points up to caller
    switch (scenario) {
        case "X":
            let playerMove = WinningScenarios[decodedOpp];
            // let playerMove = WinningScenarios[opponent];

            return { playerMove: playerMove, playerScore: Choice[playerMove], opponentScore: Choice[decodedOpp] + 6, }
        // return { playerMove: playerMove, playerScore: Choice[playerMove], opponentScore: Choice[opponent] + 6, }
        //lose
        // case "Y": return opponent;//draw
        case "Z":
            let values = Object.values(WinningScenarios);
            let index = values.indexOf(decodedOpp as unknown as WinningScenarios);
            // let index = values.indexOf(opponent as unknown as WinningScenarios);
            let player = Object.keys(WinningScenarios)[index];
            return {
                playerMove: player,
                playerScore: Choice[player] + 6,
                opponentScore: Choice[decodedOpp],
                // opponentScore: Choice[opponent],
            }

        //win
    }

}

const part2 = (round: Round): Score => {
    //Initialize our Score object which will be returned from function
    let score: Score = {
        opponent: 0,
        player: 0,
    }

    //Destructure round to make referring to relevant moves easier
    let { lhs, rhs } = round;
    if (rhs === "Y") {
        const decodedOpp = decode(lhs);
        const points = Choice[decodedOpp];
        return {
            opponent: 3 + points,
            player: 3 + points,
        }
    }

    //Add points to each tally depending on what move they played (AOC puzzle dictates that each move gets certain points - Rock:1pt, Paper:2pts, Scissors:3pts)
    // score.opponent += Choice[lhs];
    // score.player += Choice[playerMove];


    // let scenario: string = Part2Letters[rhs];
    // let points: number = Points[scenario];
    let resultsObject = decodeToMove(lhs, rhs); //Decode what our move should be depending on what scenario we get from the XYZ column <- Part2 only
    // console.log(resultsObject);
    score.opponent += resultsObject.opponentScore;
    score.player += resultsObject.playerScore;
    return score;
}

const gameLoop = (rawInput: string[]): Game => {
    let game: Game = {
        score: {
            opponent: 0,
            player: 0,
        },
        roundNumber: 0,

    }
    rawInput.forEach((rawRound) => {
        if (!rawRound) {
            console.log("reached end")
            return game;
        } else {
            let [lhs, _, rhs] = rawRound;
            let round: Round = { lhs, rhs };
            let score = part2(round);
            game.score.opponent += score.opponent;
            game.score.player += score.player;
            game.roundNumber++;
        }

    })
    return game;
}

console.log(gameLoop(file));
