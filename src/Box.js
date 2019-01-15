import React, { Component } from "react"

export default class Box extends Component{
  constructor(props) {
    super(props);
    this.state = {
      style: {
        left: this.props.coordinates.x,
        top: this.props.coordinates.y
      }
    };
  }
  render(){
    return(
      <div className="box"
           style={this.state.style}>
      </div>
    )
  }
}