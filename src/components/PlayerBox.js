import React, { Component } from "react"
import PropTypes from 'prop-types'

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
      <div className="player-box"
           style={style}>Me
      </div>
    )
  }
}

PlayerBox.propTypes = {
  player: PropTypes.object.isRequired
}