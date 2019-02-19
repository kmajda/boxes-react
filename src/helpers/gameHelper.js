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

export function checkIfEndOfBoard(position){
  if([450, -30].includes(position.x)){
    return true;
  }
  if([300, -30].includes(position.y)){
    return true;
  }
  return false;
}

export const checkObstaclesWithAddition = (obstacleCallback) => {
  return (position, obstacles, additionCallback) => {
    if(additionCallback(position)){
      return true;
    }
    return obstacleCallback(position, obstacles);
  }
}

export function checkObstacles(position, obstacles){
  let result = obstacles.some(function(obstacle){
    if(obstacle[0] == position.x && obstacle[1] == position.y){
      return true;
    }
  });
  return result;
}

export const mergeObstacles = (boxes, walls, exit) => [...boxes, ...walls, ...exit]

export const withBoxCheck = (moveCallback, checkBoxesCallback, checkObstaclesCallback, withAdditionCallback, additionCallback) => {
  return (positions, boxes, allObstacles) => {
    let result = checkBoxesCallback(positions, boxes, allObstacles, checkObstaclesCallback, withAdditionCallback, additionCallback)
    if(result.canMove){
      moveCallback(positions, result.withBox)
      return true;
    }
    else{
      return false;
    }
  }
}

export const checkBoxes = (positions, boxes, allObstacles, checkObstaclesCallback, withAdditionCallback, additionCallback) => {
  if(checkObstaclesCallback(positions.player, boxes)){
    if(withAdditionCallback(checkObstaclesCallback)(positions.box, allObstacles, additionCallback)){
      return { canMove: false };
    }
    else{
      return { canMove: true, withBox: true }
    }
  }
  else{
    return { canMove: true, withBox: false }
  }
}