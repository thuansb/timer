var React =  require('react');

var Footer = React.createClass({

getInitialState() {
	return {isPaused: true};
},

_onStart(){
	var newVal = !this.state.isPaused;
	this.props.onStart(newVal);
	this.setState({isPaused: newVal});
},

_onReset(){
	this.props.onReset();
},

render() {
	var buttonLabel;
	if(this.state.isPaused){
		buttonLabel = 'START';
	} else {
		buttonLabel = 'STOP';
	}
	return (
		<div>
			<input type='button' onClick={this._onStart} value={buttonLabel}></input>
			<input type='button' onClick={this._onReset} value='RESET'></input>
		</div>
	);
}

});

module.exports = Footer;