import "../styles/App.css"
import { blockBoard, unBlockBoard } from "../actions/index"
import { Component } from "react"
import PropTypes from 'prop-types'
import React from "react"
import { connect } from "react-redux"

class Timer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      addAnimateClass: true,
      showTimeout: false,
      counter: 15,
      interval: null,
      disableReset: false
    };

    this.handleReset = this.handleReset.bind(this);
    this.manageTimeout = this.manageTimeout.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }
  
  handleReset(){
    if(this.state.disableReset){
      return;
    }
    
    clearInterval(this.state.interval);
    let cloneState = {...this.state};
    cloneState.addAnimateClass = false;
    cloneState.showTimeout = false;
    cloneState.counter = 15;
    cloneState.interval = null;
    this.setState(cloneState, () => this.setTimer());
  }

  manageTimeout(){
    clearInterval(this.state.interval);
    if(!this.props.isBoardBlocked){
      this.props.blockBoard();
      this.setState({showTimeout: true});
    }
  }

  setTimer(){
    this.setState({disableReset: true}, function () {
      setTimeout(() => {
        this.setState({disableReset: false});
        this.props.unBlockBoard();
        let interval = setInterval(() => {
          let counter = this.state.counter - 1;
          this.setState({counter: counter});
        }, 1000);
        this.setState({interval: interval});
      }, 1800);
    });
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
      setTimeout(() => this.setState({addAnimateClass: true}), 100);
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

const mapStateToProps = state => {
  return {isBoardBlocked: state.board.isBoardBlocked};
};
const mapDispatchToProps = dispatch => ({
  blockBoard: () => {dispatch(blockBoard())},
  unBlockBoard: () => {dispatch(unBlockBoard())}
});

Timer.propTypes = {
  blockBoard: PropTypes.func.isRequired,
  unBlockBoard: PropTypes.func.isRequired,
  isBoardBlocked: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Timer);