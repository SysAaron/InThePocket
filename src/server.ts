import http from "http";
import express from "express";
import { compute } from "./compute";
import { Game } from "./types";

const app = express();

app.use(express.json());
const validate = (game: Game) => {
  let flag = true;
  if (game.length != 10){
   flag = false;
  }
  game.forEach(e => {
    for(let i = 0; i < e.length; i++){
      if(typeof (e[i]) !== 'number') {
        console.log("error");
        flag = false;
        
      }  
    }
    
  }); return flag;
}
app.post("/compute", (request, response) => {
  const game = request.body.game;
  if(validate(game)){
    const score = compute(game);
  response.status(200).json({'score' : score});
    
  } else{
    response.status(400).send("Invalid input");
  }
  
});

export const createServer = () => http.createServer(app);
