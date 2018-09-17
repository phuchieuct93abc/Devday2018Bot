const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve( 'dist')
  },
 
  watch:true,
  mode:'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader' ]
      }
    ]
  },

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