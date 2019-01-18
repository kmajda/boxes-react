import React, { Component } from "react"

export default class Box extends Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    let style= {
      left: this.props.coordinates.x,
      top: this.props.coordinates.y
    }

    return(
      <div className="box"
           style={style}>
      </div>
    )
  }
}