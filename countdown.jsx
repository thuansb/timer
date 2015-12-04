var React = require('react');
var Footer = require('./footer.jsx');
var FreedomTimerInput = require('./freedom-timer-input.jsx');

var Timer = React.createClass({
	getInitialState() {
		return {countdownVal: this.props.initVal};
	},
	_tick(){
		if(this.state.countdownVal > 0){
			var newVal = this.state.countdownVal - 1;
			this.setState({countdownVal: newVal});	
		} else {
			if(this.interval){
				clearInterval(this.interval);
			}
			//alert('Time over!!!');
			var audio = new Audio('beep.mp3');
			var repeatTimes = 0;
			audio.addEventListener('ended', function() {		        
		        if(repeatTimes <= 3){
			        this.currentTime = 0;
			        this.play();	
		        }		        
		    }.bind(null, repeatTimes), false);
			audio.play();
		}
	},
	componentDidMount() {
		
	},
	_onStart(isPaused) {
		if (isPaused){
			if(this.interval){
				clearInterval(this.interval);
			}
		} else {
			this.interval = setInterval(this._tick, 1000);						
		}
	},
	_onReset() {
		this.setState({countdownVal: this.props.initVal});
	},
	_onSetTime(timeInSeconds){
		if(this.interval){
			clearInterval(this.interval);
		}
		this.setState({countdownVal: timeInSeconds});	
		this._onStart(false);
	},
	_secondToHMS(input){		
		var s = input % 60;
		var m = parseInt(input / 60);
		var h = parseInt(m / 60);
		m = m % 60;

		if(h > 23){ //Over one day -> reset to default
			input = {h: 0, m: 0, s: 0};
		} else {
			input = {h: h, m: m, s: s};
		}

		return input;
	},
	render() {
		var timeInHMS = this._secondToHMS(this.state.countdownVal);
		var bigFont = {fontSize: '30px'};
		return (
			<div>
				<h2>TIMER</h2>
				<FreedomTimerInput onSetTime={this._onSetTime} placeholder='e.g. 10 mins' btName='SET' />
				<span style={bigFont}>
					{timeInHMS.h}
				</span>
				<span>h </span>
				<span style={bigFont}>
					{timeInHMS.m}
				</span>
				<span>m </span>
				<span style={bigFont}>
					{timeInHMS.s}
				</span>			
				<span>s </span>					
				<Footer onStart={this._onStart} onReset={this._onReset} />				
			</div>
		);
	}
});

module.exports = Timer;