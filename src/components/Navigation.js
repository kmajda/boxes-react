import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

export default class Navigation extends Component{
  render(){
    const levels = this.props.levels.map((level, index) => {
      return <li key={index}><a className={this.props.currentLevelId == level.id ? 'active' : ''} onClick={(e) => this.props.onLevelClick(e, level.id)}>{`LEVEL ${level.id}`}</a></li>
    });
    
    return(
      <div className="nav">
        <h1>Press ARROWS <br/>to move green<br/>boxes and find<br/> a way to exit</h1>
        <ul>{levels}</ul>
      </div>
    )
  }
}

Navigation.propTypes = {
  onLevelClick: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired,
  currentLevelId: PropTypes.number.isRequired,
}