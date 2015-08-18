import React from "react";

class Currency extends React.Component {  

	constructor(props) {
		super(props);
		
		this.state = {
			currencies: [], 
			prev_currencies: [], 
			url: props.url.replace("CURRENCIES", '%22'+props.currencies.join('%22,%20%22')+'%22')
		};
	}
	
	componentDidMount() {
		this.getCurrency();		
		this.timer = setInterval(() => {
			this.getCurrency();
		}, 5000);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	
	getCurrency() {
		this._loadData(this.state.url, (data) => {
			this.setState({
				currencies: data.query.results.rate.length === undefined?[data.query.results.rate]:data.query.results.rate,
				prev_currencies: this.state.currencies
			});	
		});
	}
	
	_loadData(url, success) {
		var ud = '_' + +new Date,
			script = document.createElement('script'),
			head = document.getElementsByTagName('head')[0] 
				   || document.documentElement;

		window[ud] = function(data) {
			head.removeChild(script);
			success && success(data);
		};

		script.src = url.replace('callback=?', 'callback=' + ud);
		head.appendChild(script);
	}
	
	render() {
		let currencies = this.state.currencies.map((data, i) => {
			
			let diff = this.state.prev_currencies[i] ? Number((data.Bid - this.state.prev_currencies[i].Bid).toFixed(4)) : 0;
			let cls = '';			
			if (diff < 0) {
				cls = 'down';
			} else if(diff > 0){
				cls = 'up';
			}
			
			return (
				<div className="row" key={i}>
					<div className="col-xs-4 text-left">
						{data.Name}
					</div>
					<div className="col-xs-4 text-right">
						{data.Bid}
					</div>
					<div className={"col-xs-4 text-right " + cls}>
						{diff}
					</div>
				</div>
			);
		});
		
		return 	(
			<div className="container-fluid">
				<h3 className="text-center">Курсы валют</h3>
				{currencies}
			</div>
		);
	}
	
}

Currency.defaultProps = {
	url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20%28CURRENCIES%29&env=store://datatables.org/alltableswithkeys&format=json&callback=?',
	currencies: [
		"USDEUR", "USDJPY", "USDRUB",
		"EURUSD", "USDJPY", "GBPUSD",
		"USDCAD", "USDHKD", "USDCNY", "AUDUSD"
	]
};

export default Currency;