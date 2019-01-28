import React, { Component } from "react"
import "../styles/App.css"

export default class Timer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      addAnimateClass: true,
      showTimeout: false,
      counter: 20,
      interval: null
    };

    this.handleReset = this.handleReset.bind(this);
    this.manageTimeout = this.manageTimeout.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }
  
  handleReset(){
    clearInterval(this.state.interval)
    let cloneState = {...this.state};
    cloneState.addAnimateClass = false;
    cloneState.showTimeout = false;
    cloneState.counter = 20;
    this.setState({...cloneState}, () => this.setTimer());
  }

  manageTimeout(){
    clearInterval(this.state.interval);
    if(!this.props.isBoardBlocked){
      this.props.blockBoard();
      this.setState({showTimeout: true});
    }
  }

  setTimer(){
    setTimeout(() => {
      this.props.unBlockBoard();
      let interval = setInterval(() => {
        let counter = this.state.counter - 1;
        this.setState({counter: counter});
      }, 1000);
      this.setState({interval: interval});
    }, 1800);
  }

  componentDidMount(){
    this.setTimer();
  }

  componentDidUpdate(){
    if(this.props.isFinished){
      clearInterval(this.state.interval);
    }
    if(this.state.counter == 0){
      this.manageTimeout();
    }
    if(!this.state.addAnimateClass){
      setTimeout(() => this.setState({addAnimateClass: true}), 0);
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  render(){
    const animateClass = this.state.addAnimateClass ? 'animateTimer' : '';
    const timeout = this.state.showTimeout ? <div className="timeout">TIMEOUT!</div> : null;

    return(
      <div>
        <div className={'timer-info ' + animateClass}>YOU HAVE {this.state.counter} SECONDS!</div>
        {timeout}
      </div>
    );
  }
}