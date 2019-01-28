import React, { Component } from "react"
import "../styles/App.css"
import Board from "./Board"
import Timer from "./Timer"
import { getBoards } from "../helpers/gameData"
import { arrayArrowCodes, arrowCodes, checkIfEndOfBoard, checkIfExit, checkIfBoxIsNear, checkIfBoxIsBlocked, checkIfWallIsNear, getIntendedPosition, getIndexOfNearBox } from "../helpers/gameHelper"

export default class Game extends Component{
  constructor(props){
    super(props);
    this.child = React.createRef();

    this.state = {
      currentBoard: getBoards()[0],
      showTimer: false,
      isBoardBlocked: false,
      isHovering: false
    }

    this.handleLevelClick = this.handleLevelClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.movePlayerWithBox = this.movePlayerWithBox.bind(this);
    this.blockBoard = this.blockBoard.bind(this);
    this.unBlockBoard = this.unBlockBoard.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyDown);
  }

  blockBoard(){
    this.setState({isBoardBlocked: true});
  }

  unBlockBoard(){
    this.setState({isBoardBlocked: false});
  }

  handleLevelClick(e, id){
    e.preventDefault();
    let oldBoardId = this.state.currentBoard.id;
    let currentBoard = getBoards().filter(function(board){
      return board.id == id;
    })[0];
    let timerToShow = id == 3 ? true : false;
    let isBoardBlocked = id == 3 ? true : false;
    this.setState({
      currentBoard: currentBoard,
      showTimer: timerToShow,
      isBoardBlocked: isBoardBlocked
    });

    if(id == 3 && oldBoardId == 3){
      this.child.current.handleReset(); //TODO przerobić na handleResetTimer
    }
  }

  handleKeyDown(e){
    e.preventDefault();

    if(!arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.currentBoard.isFinished || this.state.isBoardBlocked){
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
    const timer = this.state.showTimer ? <Timer blockBoard={this.blockBoard} unBlockBoard={this.unBlockBoard} isBoardBlocked={this.state.isBoardBlocked} isFinished={this.state.currentBoard.isFinished} ref={this.child} /> : null;
    const levels = getBoards().map((board, index) => {
      return <li key={index}><a className={this.state.currentBoard.id == board.id ? 'active' : ''} onClick={(e, id) => this.handleLevelClick(e, board.id)}>{`LEVEL ${board.id}`}</a></li>
    });
    return(
      <div className="container">
        <div className="nav">
          <h1>Press ARROWS <br/>to move green<br/>boxes and find<br/> a way to exit</h1>
          <ul>{levels}</ul>
        </div>
        <Board data={this.state.currentBoard}/>
        {timer}
      </div>
    );
  }
}