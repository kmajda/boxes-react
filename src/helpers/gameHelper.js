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

export function checkIfWallIsNear(position, walls){
  let result = walls.some(function(wall){
    if(wall[0] == position.x && wall[1] == position.y){
      return true;
    }
  });
  return result;
}

export function checkIfExit(position, exit){
  if(position.x == exit[0] && position.y == exit[1]){
    return true;
  }
  return false;
}

export function checkIfBoxIsNear(position, boxes){
  let result = boxes.some(function(box){
    if(box[0] == position.x && box[1] == position.y){
      return true;
    }
  });
  return result;
}

export function checkIfBoxIsBlocked(position, boxes, walls, exit){
  if(this.checkIfEndOfBoard(position)){
    return true;
  }
  if(this.checkIfWallIsNear(position, walls)){
    return true;
  }
  if(this.checkIfBoxIsNear(position, boxes)){
    return true;
  }
  if(this.checkIfExit(position, exit)){
    return true;
  }

  return false;
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