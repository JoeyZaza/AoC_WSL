//******* PART ONE ANSWER: 11841 *******/
import fileAsString from "../utils/utils";
const path = "./input/day2.txt";
const file = fileAsString(path).split(/\r?\n/);
enum Choice {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
}
enum Points {
    Win = 6,
    Draw = 3,
    Lose = 0,
}


// interface Moves {
//     Rock: {
//         points: Choice.rock,
//         code: ["A", "X"],
//     }

//     Paper: {
//         points: Choice.paper,
//         code: ["B", "Y"],
//     }

//     Scissors
// }
enum Move {
    A = "Rock",
    B = "Paper",
    C = "Scissors",
    X = "Rock",
    Y = "Paper",
    Z = "Scissors",
}
interface Game {
    player: Player;

    opponent: Player;
}
interface Player {
    roundsWon: number;
    score: number;
    currentMove: string,
}
enum WinningScenarios {
    Rock = "Scissors",
    Paper = "Rock",
    Scissors = "Paper",


}
const decode: (move: string) => Move = (move) => {
    return Move[move];
}
const game: (moves: string[]) => Game = (moves) => {
    const round = 0;
    const opp: Player = {
        roundsWon: 0,
        score: 0,
        currentMove: "",
    }
    const player: Player = {
        roundsWon: 0,
        score: 0,
        currentMove: "",
    }

    let roundNum = 0;

    for (let r of moves) {
        if (!r) {
            console.log(roundNum);
            console.log(r)
            break;
        }
        let round = r.split(" ");
        opp.currentMove = decode(round[0].trim());
        player.currentMove = decode(round[1].trim());

        //AOC says you get points depending on the move you play...for some reason
        player.score += Choice[player.currentMove];
        opp.score += Choice[opp.currentMove];

        if (player.currentMove === opp.currentMove) {
            player.score += 3;
            opp.score += 3;
        }
        else if (WinningScenarios[opp.currentMove] === player.currentMove) {
            opp.score += Points.Win;
            opp.roundsWon++;
        }

        else {
            player.score += Points.Win;
            player.roundsWon++;
        }
        roundNum++;
    }

    let g: Game = { player: player, opponent: opp };
    return g;
}
const finishedGame = game(file);
console.log(finishedGame);

//Possible Idea: move + move = scenario(win, lose, draw) could have been used for part1
//So scenario - move = move could be used for part2?
const part2 = () => {
    //TODOs 
    //Decode Opp's move (the first letter in line or "round")
    //Decode what scenario the second letter in round refers to (win, lose, draw)
    //Calculate which move would result in scenario based on Opp's move


}
