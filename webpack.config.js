const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => {
  const inProduction = env.production === true
  const platform = env.platform
  return {
    entry: {
      bundle: './src/index.js',
      vendor: ['jquery']
    },
    output: {
      path: path.resolve(__dirname, './public'),
      filename: '[name].[hash].js',
      publicPath: ''
    },
    context: __dirname,
    devtool:
      process.env.NODE_ENV === 'production'
        ? 'cheap-module-source-map'
        : 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader', 'postcss-loader'],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(png|svg|jpe?g|gif|svg|ttf|woff|woff2)$/,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]'
              }
            },
            'img-loader'
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loaders: [
            {
              loader: 'standard-loader',
              options: {
                error: false,
                snazzy: true,
                parser: 'babel-eslint'
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CleanWebpackPlugin(['public'], {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: ['sounds', 'favicon.ico']
      }),
      new ExtractTextPlugin('[name].css'),
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
        minimize: inProduction,
        purifyOptions: {
          whitelist: ['glowGreen', 'glowBlue', 'glowRed', 'glowYellow']
        }
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: inProduction,
          postcss: [autoprefixer()]
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(inProduction),
        PLATFORM: JSON.stringify(platform)
      })
    ]
  }
}
