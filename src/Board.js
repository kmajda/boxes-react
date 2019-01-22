import React, { Component } from "react"
import "./App.css"
import PlayerBox from "./PlayerBox"

export default class Board extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    let boxes = this.props.data.boxes.map((box, i) =>
      <div key={i.toString()} className="box" style={{left: box[0], top: box[1]}}></div>
    );
    let walls = this.props.data.walls.map((wall, i) =>
      <div key={i.toString()} className="wall" style={{left: wall[0], top: wall[1]}}></div>
    );
    
    return(
      <div className="board">
        {boxes}
        {walls}
        <div className="exit" style={{left: this.props.data.exit[0], top: this.props.data.exit[1]}}></div>
        <PlayerBox player={this.props.data.player} />
      </div>
    );
  }
}