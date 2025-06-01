const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './static/frontend'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|jpeg|png|jpg)$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: {
                    loader: 'url-loader',
                },
                generator: {
                  filename: '[name][ext]',
                  outputPath: 'fonts/',
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html',
        }),
      ],
      mode: 'development',
};