import React, { Component } from "react"
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

export default App;