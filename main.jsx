var React =  require('react');
var ReactDOM = require('react-dom');
var Timer = require('./countdown.jsx');
ReactDOM.render(
	<Timer initVal={30} />,
	document.getElementById('timer')
);

