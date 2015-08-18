//extract-text-webpack-plugin - потребуется для сборки всех css в один файл
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Webpack = require('webpack');
/*
 При сборке проекта, не важно в каком режиме, всегда определена переменная BUILD_DEV см. package.json
 При помощи этой переменной, можно определить в каком режиме осуществляется сборка и в зависимости от этого
 произвести нужные действия
 */
var development = JSON.parse(process.env.BUILD_DEV || 1);
//Если потребуется в скриптах/модулях знать в каком режиме работает приложение, то можно использовать переменную __DEV__
var definePlugin = new Webpack.DefinePlugin({
	__DEV__: development
});

module.exports = {

	entry: {
		//для работы в режеми development в качестве входной точки так же нужно указать webpack/hot/dev-server
		app: development ? ["webpack/hot/dev-server", "./app/main.js"] : ["./app/main.js"]
	},
	output: {
		//все собранные файлы будут сохраняться в path
		path: __dirname + '/assets',
		publicPath: '/assets/',
		//название файла, в котором будет объеденины все js файлы
		filename: 'bundle.js'       
	},
	module: {
		loaders: [
			{
				/*
				 компоненты reactjs написаны с использованием JSX разметки и классов, которые доступны только в es6,
				 чтобы итоговый js был понят браузерами, нужно привести его в нормальный вид, за это отвечает транспайлер babel,
				 который преобразует jsx разметку в обычный js, а так же код стандарта es6 преобразует в код стандарта es5
				 */

				test: /\.js$/,
				exclude: /(node_modules)/, 
				loader: "uglify!babel-loader"
			},
			/*
			 css файлы, при сборки проекта в продакшн режиме, объединяются в один файл bundle.css
			 В режиме разработки все css файлы будут загружены на страницу в тег style
			 */
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