import React from "react";

class DigitalClock extends React.Component {  

	constructor(props) {
		super(props);
		this.state = this._getTime();
	}
	
	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState(this._getTime());
		}, 1000);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	_getTime(){
		let currentDate = new Date();
		return {
			hours: 		currentDate.getHours(),
			minutes: 	currentDate.getMinutes(),
			seconds: 	currentDate.getSeconds()
		}
	}
	
	render() {
		return (
			<div>
				<h3 className="text-center">Часы</h3>
				<h3 className="text-center">
					<div>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
				</h3>
			</div>
		);
	}
	
}

export default DigitalClock;