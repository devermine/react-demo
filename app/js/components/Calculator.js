import React from "react";

class Calculator extends React.Component {  

	constructor(props) {
		super(props);
		
		this.state = {
			result: 0,
			medium_result: '',
			operation: ''
		};
	}
	
	inputHandler(event) {
		event.preventDefault();
		
		var current_param = this.state.result.toString().concat(event.target.text);
		var point_count = (current_param.match(/\./g) || []).length;
		
		if (point_count > 1 && event.target.text === '.') {
			current_param = current_param.substring(0, current_param.length - 1);
		}
		
		if (!/\./.test(current_param)) {
			current_param = parseInt(current_param);
		}
		
		this.setState({result: current_param});		
	}
	
	actionHandler(event) {
		event.preventDefault();
		
		this.setState({
			result: 0,
			medium_result: this._getResult() ? this._getResult() : this.state.result.toString(),
			operation: event.target.text
		});
	}
	
	resultHandler(event) {
		event.preventDefault();
		
		this.setState({
			result: this._getResult(),
			medium_result: '',
			operation: ''
		});
	}
	
	_getResult() {
		if (!this.state.operation || !this.state.medium_result) {
			return 0;
		}
		
		var total;
		switch(this.state.operation){
			case '+':
			case '-':
				total = Number(this.state.medium_result) + Number(this.state.operation + this.state.result);
				break;
			case '/':
				if (!Number(this.state.result)) return 0;
				total = Number(this.state.medium_result) / Number(this.state.result);				
				break;
			case '*':
				total = Number(this.state.medium_result) * Number(this.state.result);			
				break;			
		}
		
		return Number(total.toFixed(5));
	} 
	
	_resetAll(event) {
		event.preventDefault();
		
		this.setState({
			result: 0,
			medium_result: '',
			operation: ''
		});
	}
	
	render() {		
		return 	(
			<div className="calc_widget">
				<h3 className="text-center">Калькулятор</h3>
				<div>
					<div className="thumbnail">
						<p className="result">{this.state.medium_result}{this.state.operation}</p>
						<input type="text" className="form-control calc_field" placeholder="0" value={this.state.result} readOnly />
					</div>
					<div className="container-fluid">
						<div className="row">
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">1</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">2</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">3</a>&nbsp;
							<a href="#" className="btn btn-default key_basic_double btn-danger key_clear_screen" onClick={this._resetAll.bind(this)} role="button">cls</a>
						</div>
						<div className="row">
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">4</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">5</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">6</a>&nbsp;
							<a href="#" className="btn btn-default key_basic btn-info key_action" onClick={this.actionHandler.bind(this)} role="button">+</a>&nbsp;
							<a href="#" className="btn btn-default key_basic btn-info key_action" onClick={this.actionHandler.bind(this)} role="button">-</a>
						</div>
						<div className="row">
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">7</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">8</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">9</a>&nbsp;
							<a href="#" className="btn btn-default key_basic btn-info key_action" onClick={this.actionHandler.bind(this)} role="button">/</a>&nbsp;
							<a href="#" className="btn btn-default key_basic btn-info key_action" onClick={this.actionHandler.bind(this)} role="button">*</a>
						</div>
						<div className="row">
							<a href="#" className="btn btn-default key_basic_double key_digital" onClick={this.inputHandler.bind(this)} role="button">0</a>&nbsp;
							<a href="#" className="btn btn-default key_basic key_digital" onClick={this.inputHandler.bind(this)} role="button">.</a>&nbsp;
							<a href="#" className="btn btn-default key_basic_double btn-primary key_result" onClick={this.resultHandler.bind(this)} role="button">=</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Calculator;