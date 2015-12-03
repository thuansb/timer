var React = require('react');
var Footer = require('./footer.jsx');

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
			alert('Time over!!!');
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
	render() {
		return (
			<div>
				<h2>TIMER</h2>
				<span style={{fontSize: '40px'}}>
					{this.state.countdownVal + ' seconds'}
				</span>								
				<Footer onStart={this._onStart} onReset={this._onReset} />				
			</div>
		);
	}
});

module.exports = Timer;