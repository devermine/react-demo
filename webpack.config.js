var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Webpack = require('webpack');

var development = JSON.parse(process.env.BUILD_DEV || 1);

var definePlugin = new Webpack.DefinePlugin({
	__DEV__: development
});

module.exports = {

	entry: {
		app: development ? ["webpack/hot/dev-server", "./app/main.js"] : ["./app/main.js"]
	},
	output: {
		path: __dirname + '/assets',
		publicPath: '/assets/',
		filename: 'bundle.js'       
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/, 
				loader: "uglify!babel-loader"
			},
			{ 
				test: /\.min\.css/,
				loader: development ? "style-loader!css-loader" : ExtractTextPlugin.extract("css-loader")
			},
			{
				test: /\.styl$/,
				loader: development ? "style-loader!css-loader!stylus-loader" : ExtractTextPlugin.extract("css-loader!stylus-loader")
			},
			{ 
				test: /img.*\.(png|jpg)$/, 
				loader: "file-loader?name=images/[name].[ext]" 
			}
		]
	},
	plugins: development ? [definePlugin] : [new ExtractTextPlugin("bundle.css"), definePlugin]
};