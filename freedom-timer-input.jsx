var React = require('react');

var lang = {
	h: ['h', 'hour', 'hours'],
	m: ['m', 'min', 'mins', 'minute', 'minutes'],
	s: ['s', 'sec', 'secs', 'second', 'seconds']
}
var FreedomTimerInput = React.createClass({
	getInitialState() {
		return {};
	},
	onClick(){
		var standardTime = this._understandLang(this.refs.input.value);
		var timeInSeconds = this._toSecond(standardTime);
		this.props.onSetTime(timeInSeconds);
	},
	_understandLang(input){
		//init output array: 0h 0m 0s
		var output = {h: 0,m: 0,s: 0};
		//Split by space
		if(input){
			var arrInput = input.split(' ');
			for (var i = arrInput.length - 1; i >= 0; i--) {
				//Find matched word in lang
				var timeType = this._findInLang(arrInput[i]);
				if (timeType != -1 && i > 0 && !isNaN(arrInput[i-1])) {	
					switch(timeType){
						case 'h': 														
							output.h = arrInput[i-1];
							break;
						case 'm':
							output.m = arrInput[i-1];
							break;
						case 's':
							output.s = arrInput[i-1];
							break;
						default:
					}
				}
			};			
			return this._standardTheTime(output);
		}
	},
	_findInLang(text){
		if (lang.h.indexOf(text) > -1) {
			return 'h';
		}

		if (lang.m.indexOf(text) > -1) {
			return 'm';
		}

		if (lang.s.indexOf(text) > -1) {
			return 's';
		}
		return -1;
	},
	_standardTheTime(input){		
		var s = input.s % 60;
		var m = input.m + (input.s / 60);
		var h = input.h + (m / 60);
		var m = m % 60;

		if(h > 23){ //Over one day -> reset to default
			input = {h: 0,m: 0,s: 0};
		} else {
			input = {h: h, m: m, s: s};
		}

		return input;
	},
	_toSecond(input){
		return input.h*60*60 + input.m*60 + input.s;
	},
	render() {
		return (
			<div>
				<input ref='input' type='text' placeholder={this.props.placeholder}/>
				<input type='button' value={this.props.btName} onClick={this.onClick}></input>
			</div>
		);
	}
});

module.exports = FreedomTimerInput;