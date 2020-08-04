// webpack 是node写出来的 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({ // js压缩
        cache: true,
        parallel: true, // 并发处理
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  devServer: {  
    port:3000,
    progress: true,
    contentBase: './build/', 
    compress: true, 
  },
  mode: 'production', 
  entry: './src/index.js', 
  output: {
    filename: 'bundle.[hash:8].js', 
    path: path.resolve(__dirname, 'build') 
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
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
          MiniCssExtractPlugin.loader,
         'css-loader',
         'postcss-loader',
       ]
     },
     {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', // @import 解析路径
        'postcss-loader',
        'less-loader', // 把less -> css
        ]
      }
    ]
  }
}