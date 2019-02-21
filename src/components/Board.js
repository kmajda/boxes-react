import React, { Component } from "react"
import "../styles/App.css"
import PlayerBox from "./PlayerBox"

export default class Board extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    let boxes = this.props.data.obstacles.box.map((box, i) =>
      <div key={i.toString()} className="box" style={{left: box[0], top: box[1]}}></div>
    );
    let walls = this.props.data.obstacles.wall.map((wall, i) =>
      <div key={i.toString()} className="wall" style={{left: wall[0], top: wall[1]}}></div>
    );
    
    return(
      <div className="board">
        <div className="passed-level" style={this.props.data.isFinished ? {display: 'block'} : {}}>LEVEL {this.props.data.id} PASSED!</div>
        {boxes}
        {walls}
        <div className="exit" style={{left: this.props.data.obstacles.exit[0][0], top: this.props.data.obstacles.exit[0][1]}}>Exit</div>
        <PlayerBox player={this.props.data.player} />
      </div>
    );
  }
}