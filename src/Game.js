import React, { Component } from "react"
import "./App.css"
import Board from "./Board"
import { getBoards } from "./gameData"

export default class Game extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentBoard: getBoards()[0]
    }

    this.handleLevelClick = this.handleLevelClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.arrowCodes = {left: 37, up: 38, right: 39, down: 40}; /* TODO przerobić na const albo wynieść do utils */
    this.getIntendedPosition = this.getIntendedPosition.bind(this);
    this.checkIfWallIsNear = this.checkIfWallIsNear.bind(this);
    this.checkIfEndOfBoard = this.checkIfEndOfBoard.bind(this);
    this.checkIfBoxIsNear = this.checkIfBoxIsNear.bind(this);
    this.getIndexOfNearBox = this.getIndexOfNearBox.bind(this);
    this.checkIfBoxIsBlocked = this.checkIfBoxIsBlocked.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.movePlayerWithBox = this.movePlayerWithBox.bind(this);
    this.checkIfExit = this.checkIfExit.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyDown);
  }

  handleLevelClick(e, id){
    e.preventDefault();
    let currentBoard = getBoards().filter(function(board){
      return board.id == id;
    })[0];
    this.setState({currentBoard: currentBoard});
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
    if(this.state.currentBoard.isFinished){
      return;
    }

    let intendedPlayerPosition = this.getIntendedPosition({...this.state.currentBoard.player}, e.keyCode)

    if(this.checkIfEndOfBoard(intendedPlayerPosition)){
      return;
    }
    if(this.checkIfWallIsNear(intendedPlayerPosition, this.state.currentBoard.walls)){
      return;
    }

    let indexOfNearBox = this.getIndexOfNearBox(intendedPlayerPosition, this.state.currentBoard.boxes);
    if(indexOfNearBox != null){
      let intendedBoxPosition = this.getIntendedPosition({...intendedPlayerPosition}, e.keyCode)
      if(this.checkIfBoxIsBlocked(intendedBoxPosition, this.state.currentBoard.boxes, this.state.currentBoard.walls)){
        return;
      }
      else{
        this.movePlayerWithBox(intendedPlayerPosition, intendedBoxPosition, indexOfNearBox);
        return;
      }
    }

    this.movePlayer(intendedPlayerPosition);
    if(this.checkIfExit(this.state.currentBoard.player, this.state.currentBoard.exit)){
      let cloneState = {...this.state};
      cloneState.currentBoard.isFinished = true;
      this.setState({...cloneState});
    }
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
    let cloneState = {...this.state};
    cloneState.currentBoard.player = position;
    this.setState({...cloneState});
  }

  movePlayerWithBox(playerPosition, boxPosition, boxIndex){
    let cloneState = {...this.state};
    cloneState.currentBoard.player = playerPosition;
    cloneState.currentBoard.boxes[boxIndex][0] = boxPosition.x;
    cloneState.currentBoard.boxes[boxIndex][1] = boxPosition.y;

    this.setState({...cloneState});
  }

  checkIfExit(playerPosition, exit){
    if(playerPosition.x == exit[0] && playerPosition.y == exit[1]){
      return true;
    }
    return false;
  }

  render(){
    return(
      <div>
        <ul>
          <li><button onClick={(e, id) => this.handleLevelClick(e, 1)}>Level 1</button></li>
          <li><button onClick={(e, id) => this.handleLevelClick(e, 2)}>Level 2</button></li>
        </ul>
        <Board data={this.state.currentBoard}/>
      </div>
    );
  }
}