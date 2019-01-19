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
      }
    };

    this.arrowCodes = {left: 37, up: 38, right: 39, down: 40}; /* TODO przerobić na const albo wynieść do utils */
    this.boxes = [[80,80], [160,0]];
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getIntendedPosition = this.getIntendedPosition.bind(this);
    this.checkIfEndOfBoard = this.checkIfEndOfBoard.bind(this);
    this.checkIfBoxIsNear = this.checkIfBoxIsNear.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyDown);
  }

  getIntendedPosition(keyCode){
    let intendedPosition = {...this.state.player};

    switch(keyCode){
      case this.arrowCodes.right:
        intendedPosition.x = this.state.player.x + 40;
        break;
      case this.arrowCodes.up:
        intendedPosition.y = this.state.player.y - 40;
        break;
      case this.arrowCodes.down:
        intendedPosition.y = this.state.player.y + 40;
        break;
      case this.arrowCodes.left:
        intendedPosition.x = this.state.player.x - 40;
        break;
    }

    return intendedPosition;
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

  checkIfBoxIsNear(position, boxes){
    let result = boxes.some(function(box){
      if(box[0] == position.x && box[1] == position.y){
        return true;
      }
    });
    return result;
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

    let intendedPosition = this.getIntendedPosition(e.keyCode)

    if(this.checkIfEndOfBoard(intendedPosition)){
      return;
    }
    if(this.checkIfBoxIsNear(intendedPosition, this.boxes)){
      return;
    }
    
    this.setState({
      player: intendedPosition
    });
  }

  render(){
    return(
      <div className="board">
        <div className="box" style={{left:80, top: 80}}></div>
        <div className="box" style={{left:160, top: 0}}></div>
        <PlayerBox player={this.state.player} />
      </div>
    );
  }
}