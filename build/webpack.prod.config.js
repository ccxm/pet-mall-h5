const path = require('path')
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge').default
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: path.resolve(__dirname, '../public'),
        //         to: path.resolve(__dirname, '../dist')
        //     }]
        // })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并行
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        // splitChunks: {
        //     chunks: 'all',
        //     cacheGroups: {
        //         libs: {
        //             name: 'chunk-libs',
        //             test: /[\\/]node_modules[\\/]/,
        //             chunks: 'initial'
        //         }
        //     }
        // }
    }
})
