import React, { Component } from "react"
import {hot} from "react-hot-loader"
import "./App.css"
import Box from "./Box"

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        x: 20,
        y: 60
      }
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown(e){
    e.preventDefault();

    let arrowCodes = {left: 37, up: 38, right: 39, down: 40};
    let arrowArray=[];
    Object.keys(arrowCodes).map(function(key, i){
      arrowArray.push(arrowCodes[key]);
    })

    if(!arrowArray.includes(e.keyCode)){
      return;
    }

    let coordinates = {...this.state.coordinates};
    let x = coordinates.x;
    let y = coordinates.y;

    switch(e.keyCode){
      case arrowCodes.right:
        x += 40;
        break;
      case arrowCodes.up:
        y -=40;
        break;
      case arrowCodes.down:
        y +=40;
        break;
      case arrowCodes.left:
        x -=40;
        break;
    }

    this.setState({
      coordinates: {x: x, y: y}
    });
  }

  render(){
    return(
      <div>
        <Box coordinates={this.state.coordinates} />
      </div>
    );
  }
}

export default hot(module)(App);