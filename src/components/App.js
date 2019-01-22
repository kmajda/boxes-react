import React, { Component } from "react"
import {hot} from "react-hot-loader"
import "../styles/App.css"
import Game from "./Game"

class App extends Component{
  render(){
    return(
      <div>
        <Game />
      </div>
    );
  }
}

export default hot(module)(App);