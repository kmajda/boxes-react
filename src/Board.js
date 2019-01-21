import React, { Component } from "react"
import "./App.css"
import PlayerBox from "./PlayerBox"

export default class Board extends Component{
  constructor(props) {
    super(props);
    this.state = {
      player: {
        x: 0,
        y: 0
      },
      boxes: [
        [80,80], [120,80],[160,0]
      ]
    };

    this.arrowCodes = {left: 37, up: 38, right: 39, down: 40}; /* TODO przerobić na const albo wynieść do utils */
    this.walls = [[40,0], [200,0]];
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getIntendedPosition = this.getIntendedPosition.bind(this);
    this.checkIfWallIsNear = this.checkIfWallIsNear.bind(this);
    this.checkIfEndOfBoard = this.checkIfEndOfBoard.bind(this);
    this.checkIfBoxIsNear = this.checkIfBoxIsNear.bind(this);
    this.getIndexOfNearBox = this.getIndexOfNearBox.bind(this);
    this.checkIfBoxIsBlocked = this.checkIfBoxIsBlocked.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.movePlayerWithBox = this.movePlayerWithBox.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyDown);
  }

  getIntendedPosition(position, keyCode){
    switch(keyCode){
      case this.arrowCodes.right:
        position.x += 40;
        break;
      case this.arrowCodes.up:
        position.y -= 40;
        break;
      case this.arrowCodes.down:
        position.y += 40;
        break;
      case this.arrowCodes.left:
        position.x -= 40;
        break;
    }

    return position;
  }

  checkIfEndOfBoard(position){
    if([320, -40].includes(position.x)){
      return true;
    }
    if([160, -40].includes(position.y)){
      return true;
    }
    return false;
  }

  checkIfWallIsNear(position, walls){
    let result = walls.some(function(wall){
      if(wall[0] == position.x && wall[1] == position.y){
        return true;
      }
    });
    return result;
  }

  checkIfBoxIsNear(position, boxes){
    let result = boxes.some(function(box){
      if(box[0] == position.x && box[1] == position.y){
        return true;
      }
    });
    return result;
  }

  checkIfBoxIsBlocked(position, boxes, walls){
    if(this.checkIfEndOfBoard(position)){
      return true;
    }
    if(this.checkIfWallIsNear(position, walls)){
      return true;
    }
    if(this.checkIfBoxIsNear(position, boxes)){
      return true;
    }
    
    return false;
  }

  getIndexOfNearBox(position, boxes){
    let indexOfNearBox = null;
    boxes.some(function(box, index) {
      if(box[0] == position.x && box[1] == position.y){
        indexOfNearBox = index;
        return true;
      }
    })
    return indexOfNearBox;
  }

  movePlayer(position){
    this.setState({
      player: position
    });
  }

  movePlayerWithBox(playerPosition, boxPosition, boxIndex){
    let cloneState = {...this.state};
    cloneState.player = playerPosition;
    cloneState.boxes[boxIndex][0] = boxPosition.x;
    cloneState.boxes[boxIndex][1] = boxPosition.y;

    this.setState({...cloneState});
  }

  handleKeyDown(e){
    e.preventDefault();

    let self = this; /*TODO przerobić*/
    let arrowArray=[];
    Object.keys(this.arrowCodes).map(function(key, i){
      arrowArray.push(self.arrowCodes[key]);
    })

    if(!arrowArray.includes(e.keyCode)){
      return;
    }

    let intendedPlayerPosition = this.getIntendedPosition({...this.state.player}, e.keyCode)

    if(this.checkIfEndOfBoard(intendedPlayerPosition)){
      return;
    }
    if(this.checkIfWallIsNear(intendedPlayerPosition, this.walls)){
      return;
    }

    let indexOfNearBox = this.getIndexOfNearBox(intendedPlayerPosition, this.state.boxes);
    if(indexOfNearBox != null){
      let intendedBoxPosition = this.getIntendedPosition({...intendedPlayerPosition}, e.keyCode)
      if(this.checkIfBoxIsBlocked(intendedBoxPosition, this.state.boxes, this.walls)){
        return;
      }
      else{
        this.movePlayerWithBox(intendedPlayerPosition, intendedBoxPosition, indexOfNearBox);
        console.log(this.state);
        return;
      }
    }

    this.movePlayer(intendedPlayerPosition);
    console.log(this.state);
  }

  render(){
    let boxes = this.state.boxes.map((box, i) =>
      <div key={i.toString()} className="box" style={{left: box[0], top: box[1]}}></div>
    );
    let walls = this.walls.map((wall, i) =>
      <div key={i.toString()} className="wall" style={{left: wall[0], top: wall[1]}}></div>
    );
    
    return(
      <div className="board">
        {boxes}
        {walls}
        <PlayerBox player={this.state.player} />
      </div>
    );
  }
}