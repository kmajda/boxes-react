import React, { Component } from "react"
import "../styles/App.css"
import Board from "./Board"
import { getBoards } from "../helpers/gameData"
import { arrayArrowCodes, arrowCodes, checkIfEndOfBoard, checkIfExit, checkIfBoxIsNear, checkIfBoxIsBlocked, checkIfWallIsNear, getIntendedPosition, getIndexOfNearBox } from "../helpers/gameHelper"

export default class Game extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentBoard: getBoards()[0]
    }

    this.handleLevelClick = this.handleLevelClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.movePlayerWithBox = this.movePlayerWithBox.bind(this);
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

    if(!arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.currentBoard.isFinished){
      return;
    }

    let intendedPlayerPosition = getIntendedPosition({...this.state.currentBoard.player}, e.keyCode, arrowCodes())

    if(checkIfEndOfBoard(intendedPlayerPosition)){
      return;
    }
    if(checkIfWallIsNear(intendedPlayerPosition, this.state.currentBoard.walls)){
      return;
    }

    let indexOfNearBox = getIndexOfNearBox(intendedPlayerPosition, this.state.currentBoard.boxes);
    if(indexOfNearBox != null){
      let intendedBoxPosition = getIntendedPosition({...intendedPlayerPosition}, e.keyCode, arrowCodes())
      if(checkIfBoxIsBlocked(intendedBoxPosition, this.state.currentBoard.boxes, this.state.currentBoard.walls, this.state.currentBoard.exit)){
        return;
      }
      else{
        this.movePlayerWithBox(intendedPlayerPosition, intendedBoxPosition, indexOfNearBox);
        return;
      }
    }

    this.movePlayer(intendedPlayerPosition);
    if(checkIfExit(this.state.currentBoard.player, this.state.currentBoard.exit)){
      let cloneState = {...this.state};
      cloneState.currentBoard.isFinished = true;
      this.setState({...cloneState});
    }
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

  render(){
    return(
      <div className="container">
        <div className="nav">
          <h1>Press ARROWS <br/>to move green<br/>boxes and find<br/> a way to exit</h1>
          <ul>
            <li><a className={this.state.currentBoard.id == 1 ? 'active' : ''} onClick={(e, id) => this.handleLevelClick(e, 1)}>LEVEL 1</a></li>
            <li><a className={this.state.currentBoard.id == 2 ? 'active' : ''} onClick={(e, id) => this.handleLevelClick(e, 2)}>LEVEL 2</a></li>
            <li><a className={this.state.currentBoard.id == 3 ? 'active' : ''} onClick={(e, id) => this.handleLevelClick(e, 3)}>LEVEL 3</a></li>
          </ul>
        </div>
        <Board data={this.state.currentBoard}/>
      </div>
    );
  }
}