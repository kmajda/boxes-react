export function getIntendedPosition(position, keyCode, arrowCodes){
  switch(keyCode){
    case arrowCodes.right:
      position.x += 30;
      break;
    case arrowCodes.up:
      position.y -= 30;
      break;
    case arrowCodes.down:
      position.y += 30;
      break;
    case arrowCodes.left:
      position.x -= 30;
      break;
  }

  return position;
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

export function getIndexOfNearBox(position, boxes){
  let indexOfNearBox = null;
  boxes.some(function(box, index) {
    if(box[0] == position.x && box[1] == position.y){
      indexOfNearBox = index;
      return true;
    }
  })
  return indexOfNearBox;
}

export const mergeObstacles = (boxes, walls, exit) => [...boxes, ...walls, ...exit]