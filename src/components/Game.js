import React, { Component } from "react"
import { connect } from "react-redux"
import "../styles/App.css"
import Board from "./Board"
import Timer from "./Timer"
import { getBoards } from "../helpers/gameData"
import {arrowCodes, arrayArrowCodes, checkObstaclesWithAddition, checkBoxes, getIntendedPositions, checkObstacles, checkIfEndOfBoard, mergeObstacles, withBoxCheck} from "../helpers/gameHelper"
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
    this.checkIfFinish = this.checkIfFinish.bind(this);
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

    if(!arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.currentBoard.isFinished || this.props.isBoardBlocked){
      return;
    }
    
    let intendedPositions = getIntendedPositions({...this.state.currentBoard.player}, e.keyCode, arrowCodes())
    
    if(checkObstaclesWithAddition(checkObstacles)(intendedPositions.player, this.state.currentBoard.walls, checkIfEndOfBoard)){
      return;
    }

    let obstaclesMerged = mergeObstacles(this.state.currentBoard.boxes, this.state.currentBoard.walls, this.state.currentBoard.exit)
    
    let tryMovePlayer = withBoxCheck(this.movePlayer, checkBoxes, checkObstacles, checkObstaclesWithAddition, checkIfEndOfBoard);
    if(!tryMovePlayer(intendedPositions, this.state.currentBoard.boxes, obstaclesMerged)){
      return;
    }
    
    this.checkIfFinish(checkObstacles, this.state)
  }

  movePlayer(positions, withBox){
    let cloneState = {...this.state};
    
    if(withBox){
      let boxIndex = cloneState.currentBoard.boxes.findIndex((box) => {
        return box[0] == positions.player.x && box[1] == positions.player.y
      })
      
      cloneState.currentBoard.player = positions.player;
      cloneState.currentBoard.boxes[boxIndex][0] = positions.box.x;
      cloneState.currentBoard.boxes[boxIndex][1] = positions.box.y;

      this.setState({...cloneState});
    }
    else{
      cloneState.currentBoard.player = positions.player;
      this.setState({...cloneState});
    }

  }

  checkIfFinish(obstaclesCallback, state){
    if(obstaclesCallback(state.currentBoard.player, state.currentBoard.exit)){
      let cloneState = {...state};
      cloneState.currentBoard.isFinished = true;
      this.setState({...cloneState});
    }
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