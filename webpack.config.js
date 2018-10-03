const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var glob = require('glob');

function toObject(paths) {
    var ret = {};
    console.log(paths);

    paths.forEach((a) =>{
        a.forEach((path) =>{
            ret[path.split('/').slice(-1)[0]] = path;
            console.log(path);
        })
    })
    return ret;
}

module.exports = {
    entry: toObject([glob.sync('./src/videos/*.mp4'),glob.sync('./src/index.js')]),
    output: {
        path: path.resolve('dist')
    },

    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg|mp3|mp4|mov)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: "bot.html",
            template: './src/bot.html'
        }),
        new HtmlWebpackPlugin({
            filename: "calling.html",
            template: './src/calling.html'
        })
    ],


    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        proxy: {
            '/api': {
                target: "https://console.dialogflow.com/api-client/demo/embedded/616d1a7f-fb60-439c-87fb-012789a05eff",
                secure: false,
                pathRewrite: {'^/api': ''}


            }

        }

    }
};
