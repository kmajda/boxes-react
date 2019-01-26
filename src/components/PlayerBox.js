import React, { Component } from "react"

export default class PlayerBox extends Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    let style= {
      left: this.props.player.x,
      top: this.props.player.y
    }

    return(
      <div className="box player-box"
           style={style}>Me
      </div>
    )
  }
}