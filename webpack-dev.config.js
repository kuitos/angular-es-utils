/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/' // hot loader publish dir
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.css']
	},
	eslint: {
		configFile: '.eslintrc',
		emitWarning: true,
		emitError: true,
		formatter: require('eslint-friendly-formatter')
	},
	postcss: [autoprefixer({browsers: ['last 2 versions']})],
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				include: [path.join(__dirname, 'src')]
			}
		],

		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /(node_modules|bower_components)/,
				include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
			},
			{
				test: /\.html$/,
				loader: 'html',
				query: {interpolate: true},
				exclude: /(node_modules|bower_components)/,
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash:8].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
			}

		]
	}
};
