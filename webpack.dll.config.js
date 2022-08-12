const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// dll文件存放的目录(建议存放到public中)
const dllPath = './public/vendor'
module.exports = {
    mode: 'production',
    entry: {
        vendor: ['vue', 'vuex', 'vue-router', 'axios', 'vant']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, dllPath),
        library: '[name]_[hash]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, dllPath, '[name].manifest.json'),
            context: process.cwd()
        })
    ]
}
