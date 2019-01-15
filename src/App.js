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
        y: 30
      }
    };
  }

  render(){
    return(
      <Box coordinates={this.state.coordinates}></Box>
    );
  }
}

export default hot(module)(App);