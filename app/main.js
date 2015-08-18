import React from "react";

import DigitalClock from "./js/components/DigitalClock";
import Calculator from "./js/components/Calculator";
import Currency from "./js/components/Currency";

require("./css/bootstrap.min.css");
require("./css/bootstrap-theme.min.css");
require("./css/custom.styl");

React.render(
	<DigitalClock />,
	document.getElementById("digital_clock")
);

React.render(
	<Calculator />,
	document.getElementById("calculator")
);

/*
 * You may set currencies 	
 * ex.: currencies={["USDEUR", "USDJPY"]}
 */
React.render(
	<Currency />,
	document.getElementById("currency")
);