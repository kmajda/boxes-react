import React, { Component } from "react"
import {hot} from "react-hot-loader"
import "./App.css"
import Board from "./Board"

class App extends Component{
  render(){
    return(
      <div>
        <Board />
      </div>
    );
  }
}

export default hot(module)(App);