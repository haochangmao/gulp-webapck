import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import opt from 'minimist'; //获取命令行参数
import 'babel-polyfill';
import path from 'path';

// process.traceDeprecation = true;
process.noDeprecation = true

let args = process.argv,
    argsOpt = opt(args);
	
let commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		filename: 'js/[name].js'
	}),
	ExtractSCSS = new ExtractTextPlugin({
		filename: 'css/[name].css',
		disable: false,
		allChunks: true
	}),
	config = { //收银台页面
		context: path.resolve(__dirname, 'src'),
		// context: './src',
		// devtool: argsOpt.pro || argsOpt.test || argsOpt.repro ? '' : 'source-map',
		cache: true,
		profile: true,
		entry: {
			common: ['scss/reset.scss','./js/modules/util.js', './js/modules/resize.js', 'babel-polyfill'],
			index: './js/index.js',
		},
		output: {
		    // jsonpFunction: 'fqlpc',
		    // library: 'FUQIANLAPC',
		    // libraryTarget: 'umd',
		    path: '', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
		    publicPath: '', //模板、样式、脚本、图片等资源对应的server上的路径
		    filename: 'js/[name].js', //每个页面对应的主js的生成配置
		    sourceMapFilename: '[name].map'
		},
		plugins: [
		    new CopyWebpackPlugin([
		        {
		            from: 'images',
		            to: 'images'
		        }
		    ]),
			new webpack.DefinePlugin({
				'API_HOST':'"/manager"'
			}),
		    new webpack.ProvidePlugin({ //引入全局
		        // 'Vue': 'vue',
		        // 'VueRouter': 'vue-router',
		        // 'VueResource': 'Vue-resource',
		        $: 'jquery',
		        jQuery: 'jquery'
		    }),
		    // new webpack.optimize.OccurenceOrderPlugin(),
		    // new webpack.optimize.DedupePlugin(),
		    // commonsPlugin,
		    ExtractSCSS, //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
			new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
			    // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
			    filename: 'index.html', //生成的html存放路径，相对于path
			    cache: false,
			    template: 'index.html', //html模板路径
			    inject: true, //js插入的位置，true/'head'/'body'/false
			    hash: true, //为静态资源生成hash值
			    chunks: ['common', 'index'] //需要引入的chunk，不配置就会引入所有页面的资源
			    // minify: {
			    //     removeComments: true, //移除HTML中的注释
			    //     collapseWhitespace: true
			    // }
			}),
		],
			resolve: {
				alias: {
					'vue': path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
					'vue-router':path.resolve(__dirname,'./node_modules/vue-router/dist/vue-router.js')
				},
				modules: [
					'./src',
					'node_modules'
				]
				// root: './src',
				// modulesDirectories: ['node_modules']
			},
			module: {
				rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						extractCSS: true
					}
				},
				{
					test: /\.(png|jpg|gif|svg|webp|ttc|ttf|eot|woff)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 1000,
								name: 'css/img/[name].[ext]?[hash]'
							}
						}
					]
					// loader: 'url?limit=1000&name=css/img/[name].[ext]?[hash]'
				}, {
					test: /\.html$/,
					use: [
						'html-loader'
					]
					// loader: 'html'
				}, {
					test: /\.js?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['env']
						}
					}
					// query: {
					//     presets: ['es2015']
					//     // cacheDirectory: true,
					//     // plugins: ['transform-runtime'],
					//     // sourceMaps: 'both'
					// }
				}, { //编译SCSS生成link链接
					test: /\.scss$/,
					// loader: ExtractSCSS.extract('style', 'css!sass')
					use: ExtractSCSS.extract({
						fallback: 'style-loader',
						use: [{
							loader: 'css-loader'
						}, {
							loader: 'sass-loader'
						}]
					})
				}]
			}
		};
	
		let UglifyJs = new webpack.optimize.UglifyJsPlugin({ //压缩js
				compress: {
					warnings: false
				}
			}),
			cssLoader = { //编译SCSS生成link链接
				test: /\.scss$/,
				// loader: ExtractSCSS.extract('style', 'css!sass')
				use: ExtractSCSS.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader?minimize'
					}, {
						loader: 'sass-loader'
					}]
				})
			};
	
		(argsOpt.pro || argsOpt.test || argsOpt.repro) && config.plugins.push(UglifyJs);
		(argsOpt.pro || argsOpt.test || argsOpt.repro) && (config.module.rules[4] = cssLoader);
	
	export default config;