const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge').default

module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3003,
        hot: true,
        host: '0.0.0.0',
        contentBase: '../dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    stats: 'errors-only'
})
