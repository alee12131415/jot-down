const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                options: {
                    babelrc: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}
