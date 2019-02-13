import React, { Component } from "react"
import { connect } from "react-redux"
import "../styles/App.css"
import Board from "./Board"
import Timer from "./Timer"
import { getBoards } from "../helpers/gameData"
import * as gameHelper from "../helpers/gameHelper"
import { blockBoard, unBlockBoard } from "../actions/index"

class Game extends Component{
  constructor(props){
    super(props);
    this.child = React.createRef();

    this.state = {
      currentBoard: getBoards()[0],
      showTimer: false,
      isHovering: false
    }

    this.handleLevelClick = this.handleLevelClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.movePlayerWithBox = this.movePlayerWithBox.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleLevelClick(e, id){
    e.preventDefault();
    let oldBoardId = this.state.currentBoard.id;
    let currentBoard = getBoards().filter(function(board){
      return board.id == id;
    })[0];
    let timerToShow = id == 3 ? true : false;
    if(id == 3){
      this.props.blockBoard();
    }else{
      this.props.unBlockBoard();
    }

    this.setState({
      currentBoard: currentBoard,
      showTimer: timerToShow
    });

    if(id == 3 && oldBoardId == 3){
      this.child.current.handleReset(); //TODO przerobić na handleResetTimer
    }
  }

  handleKeyUp(e){
    e.preventDefault();

    if(!gameHelper.arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.currentBoard.isFinished || this.props.isBoardBlocked){
      return;
    }

    let intendedPlayerPosition = gameHelper.getIntendedPosition({...this.state.currentBoard.player}, e.keyCode, gameHelper.arrowCodes())

    if(gameHelper.checkIfEndOfBoard(intendedPlayerPosition)){
      return;
    }
    if(gameHelper.checkIfWallIsNear(intendedPlayerPosition, this.state.currentBoard.walls)){
      return;
    }

    let indexOfNearBox = gameHelper.getIndexOfNearBox(intendedPlayerPosition, this.state.currentBoard.boxes);
    if(indexOfNearBox != null){
      let intendedBoxPosition = gameHelper.getIntendedPosition({...intendedPlayerPosition}, e.keyCode, gameHelper.arrowCodes())
      if(gameHelper.checkIfBoxIsBlocked(intendedBoxPosition, this.state.currentBoard.boxes, this.state.currentBoard.walls, this.state.currentBoard.exit)){
        return;
      }
      else{
        this.movePlayerWithBox(intendedPlayerPosition, intendedBoxPosition, indexOfNearBox);
        return;
      }
    }

    this.movePlayer(intendedPlayerPosition);
    if(gameHelper.checkIfExit(this.state.currentBoard.player, this.state.currentBoard.exit)){
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
    const timer = this.state.showTimer ? <Timer isFinished={this.state.currentBoard.isFinished} ref={this.child} /> : null;
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

const mapStateToProps = state => {
  return {isBoardBlocked: state.board.isBoardBlocked};
};
const mapDispatchToProps = dispatch => ({
  blockBoard: () => {dispatch(blockBoard())},
  unBlockBoard: () => {dispatch(unBlockBoard())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);