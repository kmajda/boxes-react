import "../styles/App.css"
import { arrayArrowCodes, arrowCodes, checkObstacles, getIntendedPositions, tryMove } from "../helpers/gameHelper"
import { blockBoard, unBlockBoard } from "../actions/index"
import { getLevels, obstacleTypes } from "../helpers/gameData"
import Board from "./Board"
import { Component } from "react"
import Navigation from "./Navigation"
import PropTypes from 'prop-types'
import React from "react"
import Timer from "./Timer"
import { connect } from "react-redux"
import { fromJS } from 'immutable'

class Game extends Component{
  constructor(props){
    super(props);
    let levels = getLevels();
    
    this.state = {
      currentLevel: levels[0],
      levels: levels,
      isFinished: false,
      renderTimer: true
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

    let currentLevel = this.state.levels.filter(board => board.id == id)[0];
    
    if(currentLevel.withTimer){
      this.props.blockBoard();
      this.setState({renderTimer: false}, () => {this.setState({renderTimer: true})});
    }else{
      this.props.unBlockBoard();
    }

    this.setState({
      currentLevel: currentLevel,
      isFinished: false
    });
  }

  handleKeyUp(e){
    e.preventDefault();

    if(!arrayArrowCodes().includes(e.keyCode)){
      return;
    }
    if(this.state.isFinished || this.props.isBoardBlocked){
      return;
    }
    
    let intendedPositions = getIntendedPositions(this.state.currentLevel.player, e.keyCode, arrowCodes())
   
    tryMove(intendedPositions, this.state.currentLevel.obstacles, checkObstacles, this.move)
  }

  move(intendedPositions, obstacles) {
    let stateMap = fromJS(this.state);
    if (obstacles.obstacleForPlayer) {
      if (obstacles.obstacleForPlayer.type === obstacleTypes.BOX) {
        stateMap = stateMap.updateIn(['currentLevel', 'obstacles', 'box'], list => {
          return list.splice(obstacles.obstacleForPlayer.index, 1, [intendedPositions.box.x, intendedPositions.box.y])}
        );
      }
      else if (obstacles.obstacleForPlayer.type === obstacleTypes.EXIT) {
        stateMap = stateMap.setIn(['isFinished'], true);
      }
    }

    stateMap = stateMap.setIn(['currentLevel', 'player'], intendedPositions.player);
    this.setState(stateMap.toJS());
  }

  render(){
    const timer = this.state.renderTimer && this.state.currentLevel.withTimer ? <Timer isFinished={this.state.isFinished} /> : null;

    return(
      <div className="container">
        <Navigation levels={this.state.levels} currentLevelId={this.state.currentLevel.id} levelClick={this.handleLevelClick} />
        <Board data={this.state.currentLevel} isFinished={this.state.isFinished}/>
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

Game.propTypes = {
  blockBoard: PropTypes.func.isRequired,
  unBlockBoard: PropTypes.func.isRequired,
  isBoardBlocked: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);