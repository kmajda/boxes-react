import React, { Component } from "react"
import { connect } from "react-redux"
import "../styles/App.css"
import Board from "./Board"
import Timer from "./Timer"
import { getBoards, obstacleTypes } from "../helpers/gameData"
import {arrowCodes, arrayArrowCodes, tryMove, getIntendedPositions, checkObstacles} from "../helpers/gameHelper"
import { blockBoard, unBlockBoard } from "../actions/index"

class Game extends Component{
  constructor(props){
    super(props);
    this.child = React.createRef();

    this.state = {
      currentBoard: getBoards()[0],
      showTimer: false,
      isHovering: false,
      isFinished: false
    }

    this.handleLevelClick = this.handleLevelClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.move = this.move.bind(this);
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
      showTimer: timerToShow,
      isFinished: false
    });

    if(id == 3 && oldBoardId == 3){
      this.child.current.handleReset(); //TODO przerobić na handleResetTimer
    }
  }

  handleKeyUp(e){
    e.preventDefault();

    if(!arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.isFinished || this.props.isBoardBlocked){
      return;
    }
    
    let intendedPositions = getIntendedPositions(this.state.currentBoard.player, e.keyCode, arrowCodes())
   
    tryMove(intendedPositions, this.state.currentBoard.obstacles, this.state, checkObstacles, this.move)
  }

  move(intendedPositions, state, obstacles) {
    if (obstacles.obstacleForPlayer) {
      if (obstacles.obstacleForPlayer.type === obstacleTypes.BOX) {
        state.currentBoard.obstacles.box[obstacles.obstacleForPlayer.index][0] = intendedPositions.box.x;
        state.currentBoard.obstacles.box[obstacles.obstacleForPlayer.index][1] = intendedPositions.box.y;
      }
      else if (obstacles.obstacleForPlayer.type === obstacleTypes.EXIT) {
        state.isFinished = true;
      }
    }
    state.currentBoard.player = intendedPositions.player;
    this.setState({...state}); // TODO
  }

  render(){
    const timer = this.state.showTimer ? <Timer isFinished={this.state.isFinished} ref={this.child} /> : null;
    const levels = getBoards().map((board, index) => {
      return <li key={index}><a className={this.state.currentBoard.id == board.id ? 'active' : ''} onClick={(e, id) => this.handleLevelClick(e, board.id)}>{`LEVEL ${board.id}`}</a></li>
    });
    return(
      <div className="container">
        <div className="nav">
          <h1>Press ARROWS <br/>to move green<br/>boxes and find<br/> a way to exit</h1>
          <ul>{levels}</ul>
        </div>
        <Board data={this.state.currentBoard} isFinished={this.state.isFinished}/>
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