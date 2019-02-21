import {obstacleTypes} from './gameData'

export function getIntendedPositions(position, keyCode, arrowCodes){
  let interval = 30;
  let result = {
    player: { x: position.x, y: position.y },
    box: { x: position.x, y: position.y }
  };
  
  switch(keyCode){
    case arrowCodes.right:
      result.player.x = position.x + interval;
      result.box.x = position.x + interval * 2;
      break;
    case arrowCodes.up:
      result.player.y = position.y - interval;
      result.box.y = position.y - interval * 2;
      break;
    case arrowCodes.down:
      result.player.y = position.y + interval;
      result.box.y = position.y + interval * 2;
      break;
    case arrowCodes.left:
      result.player.x = position.x - interval;
      result.box.x = position.x - interval * 2;
      break;
  }

  return result;
}

export function arrowCodes(){
  return {left: 37, up: 38, right: 39, down: 40};
}

export function arrayArrowCodes() {
  let ar=[];
  Object.keys(arrowCodes()).map(function(key){
    ar.push(arrowCodes()[key]);
  })
  return ar;
}

export const tryMove = (intendedPositions, obstacles, state, checkObstaclesCallback, moveCallback) => {
  let result = {};
  result.obstacleForPlayer = checkObstaclesCallback(intendedPositions.player, obstacles)

  if(result.obstacleForPlayer && result.obstacleForPlayer.type === obstacleTypes.BOX){
    result.obstacleForBox = checkObstaclesCallback(intendedPositions.box, obstacles)
  }

  if(!result.obstacleForPlayer || ([obstacleTypes.BOX, obstacleTypes.EXIT].includes(result.obstacleForPlayer.type) && !result.obstacleForBox)){
    moveCallback(intendedPositions, state, result);
  }
}

export const checkObstacles = (intendedPosition, obstacles) => {
  let result = null;
  Object.entries(obstacles).some((obstacle) => {
    obstacle[1].some((coord, index) =>{
      if(coord[0] == intendedPosition.x && coord[1] == intendedPosition.y){
        result = {type: obstacle[0], index: index}
        return true
      }
    })
  })
  
  return result;
}