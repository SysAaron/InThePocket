import { Game } from "./types";
export function compute(game: Game): number {
  var gameSize = game.length;
  let score: number = 0;
  for (let frame = 0; frame < gameSize; frame++) {
    for (let ball = 0; ball < game[frame].length; ball++) {
      if (frame == gameSize - 1) {
        score += game[frame][ball];
        continue;
      }
      if (game[frame][ball] == 10) { //check if strike
        score += getStrikeScore(frame, ball, game);
        break;
      } else if (game[frame][ball] + game[frame][ball + 1] == 10) { //check if spare
        score += getSpareScore(frame, ball, game);
        break;
      } else {
        score += game[frame][ball];
      }
    }
  }

  return score;
}
function getStrikeScore(frame: number, ball: number, game: Game): number {
  let score = 0;
  let val = 0;
  score += game[frame][ball];
  val += game[frame + 1][ball];
  if (val == 10) {
    if (typeof game[frame + 2] === "undefined") {
      val+= game[frame + 1][ball + 1]; //only possible on second to last frame
    } else {
      val += game[frame + 2][ball]
    }

  } else {
    val += game[frame + 1][ball + 1];
  }
  score += val;
  return score;
}
function getSpareScore(frame: number, ball: number, game: Game): number {
  let score = 0;
  score += game[frame][ball];
  score += game[frame][ball + 1];
  score += game[frame + 1][ball];
  return score;
}