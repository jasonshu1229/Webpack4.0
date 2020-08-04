// webpack 是node写出来的 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {  // 开发服务器
    port:3000,
    progress: true,
    contentBase: './build/', // 运行build文件夹下的内容
    open:true, // 自动打开浏览器
    compress: true, // zip 压缩
  },
  mode: 'development', //两种模式 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build') // 绝对路径（当前路径下新建 build 文件夹）
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 压缩的时候去掉 双引号
        collapseWhitespace: true, // 打包出来的文件 压缩成一行 
      },
      hash: true, // hash戳 一段数字 缓存对比
    }) 
  ]
}

console.log(path.resolve(__dirname, 'build'))