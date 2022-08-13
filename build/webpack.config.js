const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
const devMode = process.env.NODE_ENV === 'development'
const isAnalyze = process.env.NODE_ENV === 'analyze'

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false // 保留空格
                            }
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                    // {
                    //     loader: 'px2rem-loader',
                    //     // options here
                    //     options: {
                    //         remUni: 75,
                    //         remPrecision: 8
                    //     }
                    // }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, '../src/style/variables.scss')
                            ]
                        }
                    }
                    // {
                    //     loader: 'px2rem-loader',
                    //     // options here
                    //     options: {
                    //         remUni: 75,
                    //         remPrecision: 8
                    //     }
                    // }
                ]
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/i, // 图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]',
                                    esModule: false
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]',
                                    esModule: false
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                        // options: {
                        //     fallback: {
                        //         loader: 'file-loader'
                        //     }
                        // }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: process.cwd(),
        //     manifest: require('../public/vendor/vendor-manifest.json')
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new ProgressBarPlugin({
            format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        // (isAnalyze ? new BundleAnalyzerPlugin({
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 3003
        // }) : undefined),
        new BundleAnalyzerPlugin({
            analyzerMode: !isAnalyze ? 'disabled' : 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 3003
        }),
        new FriendlyErrorsPlugin(),
        new StylelintPlugin({
            context: 'src',
            configFile: path.resolve(__dirname, '../stylelint.config.js'),
            quiet: true,
            files: '**/*.(s(c|a)ss|css|vue)'
        }),
        // // 将 dll 注入到 生成的 html 模板中
        // new AddAssetHtmlPlugin({
        //     // dll文件位置
        //     filepath: path.resolve(__dirname, '../public/vendor/*.js'),
        //     // dll 引用路径
        //     publicPath: './vendor',
        //     // dll最终输出的目录
        //     outputPath: './vendor'
        // })
    ]
}
