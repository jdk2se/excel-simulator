const path                 = require('path');
const CopyPlugin           = require('copy-webpack-plugin');
const ESLintPlugin         = require('eslint-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	const isDev  = !isProd;

	const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;
	const plugins  = () => {
		const base = [
			new HtmlWebpackPlugin({
				template: './index.html',
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'src', 'favicon.ico'),
						to: path.resolve(__dirname, 'dist', 'favicon.ico'),
					},
				]
			}),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			}),
		];

		if (isDev && false) { // Только для демонстрации подключения линтеров.
			base.push(new ESLintPlugin());
		}

		return base;
	};

	return {
		context: path.resolve(__dirname, 'src'),
		entry: {
			main: [
				'core-js/stable',
				'regenerator-runtime/runtime',
				'./index.js',
			]
		},
		output: {
			path:     path.resolve(__dirname, 'dist'),
			clean:    true,
			filename: filename('js'),
		},
		resolve: {
			extensions: ['.js'],
			alias: {
				'@':     path.resolve(__dirname, 'src'),
				'@core': path.resolve(__dirname, 'src', 'core'),
			}
		},
		devServer: {
			port: 8080,
			open: true,
			hot: true,
			watchFiles: './',
		},
		plugins: plugins(),
		devtool: isDev ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			],
		},
	}
}