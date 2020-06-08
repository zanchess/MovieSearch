const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ROOT_DIRECTORY = path.join(__dirname, '..')
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src')

const config = {
  entry: [path.resolve('./src/app/js/main.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.html')
    }),
    new CopyWebpackPlugin([
      { from: path.join(SRC_DIRECTORY, 'app/assets'), to: path.join(ROOT_DIRECTORY, 'build') }
    ])
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, exclude: /node_modules/, 
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|pdf|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'audio',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  }
}

module.exports = config
