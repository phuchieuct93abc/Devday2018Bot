const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve( 'dist')
  },
 
  mode:'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader' ]
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:"index.html",
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({ 
      filename:"bot.html",
      template: './src/bot.html'
    }),
    new HtmlWebpackPlugin({ 
      filename:"calling.html",
      template: './src/calling.html'
    })
  ],
  

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    proxy:{
      '/api': {
        target: "https://console.dialogflow.com/api-client/demo/embedded/616d1a7f-fb60-439c-87fb-012789a05eff",
        secure: false,
        pathRewrite: {'^/api' : ''}

  
      }

    }
   
  }
};