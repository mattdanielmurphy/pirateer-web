const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [ path.join(__dirname, 'src'), path.join(__dirname, 'public') ]
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		host: '0.0.0.0',
		disableHostCheck: true,
		port: 80
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	resolve: {
		extensions: [ '.js', '.jsx' ]
	}
}
