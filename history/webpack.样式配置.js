// webpack 是node写出来的 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {  
    port:3000,
    progress: true,
    contentBase: './build/', 
    compress: true, 
  },
  mode: 'development', 
  entry: './src/index.js', 
  output: {
    filename: 'bundle.[hash:8].js', 
    path: path.resolve(__dirname, 'build') 
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, 
        collapseWhitespace: true, 
      },
      hash: true,
    }) 
  ],
  module: { // 模块解析
    rules: [
      /*
        规则：
          css-loader 解析 @import这种语法
          style-loader 他是把css 插入到head的标签中
          loader的特点 希望单一
          loader的顺序 默认是从右向左执行 从下到上执行
          loader还可以写成 对象形式
          可以处理less文件
      */
     {
       test: /\.css$/,
       use: [
         {
           loader: 'style-loader',
           options: {
             insert: 'body', // 把style标签放在 body标签底部
           }
         },
         'css-loader'
       ]
     },
     {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
          // options: {
          //   insert: 'head', // head标签底部
          // }
        },
        'css-loader', // @import 解析路径
        'less-loader', // 把less -> css
        ]
      }
    ]
  }
}