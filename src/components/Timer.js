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
      showTimeout: false,
      counter: 15,
      interval: null,
      timeout: null
    };

    this.manageTimeout = this.manageTimeout.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  manageTimeout(){
    clearInterval(this.state.interval);
    if(!this.props.isBoardBlocked){
      this.props.blockBoard();
      this.setState({showTimeout: true});
    }
  }

  setTimer(){
    let interval = setInterval(() => {
      this.setState((state) => ({counter: state.counter -1}));
    }, 1000);
    this.setState({interval: interval});
  }

  componentDidMount(){
    this.props.blockBoard();
    let timeout = setTimeout(() => {
      this.props.unBlockBoard();
      this.setTimer();
    }, 1800);
    this.setState({timeout: timeout})
  }

  componentDidUpdate(){
    if(this.props.isFinished){
      clearInterval(this.state.interval);
    }
    if(this.state.counter == 0){
      this.manageTimeout();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
    clearTimeout(this.state.timeout);
  }

  render(){
    const timeout = this.state.showTimeout ? <div className="timeout">TIMEOUT!</div> : null;
    return(
      <div>
        <div className='timer-info animateTimer'>YOU HAVE {this.state.counter} SECONDS!</div>
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