const webpack = require('webpack');
const path = require('path');
const inProduction = (process.env.NODE_ENV === 'production');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports =  {
  entry: {
    app: [
      "./src/index.js",
      './src/scss/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: "[name].js",
    publicPath:'./public/'
  },
  devtool:  'source-map' ,
  module: {
    rules: [{
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpe?g|gif|svg|ttf|woff|woff2)$/,
        loaders: [{
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          },
          'img-loader'
        ]

      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['sounds' ,   'index.html', 'favicon.ico' ]
    }),
    new ExtractTextPlugin('[name].css'),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'public/*.html')),
      minimize: inProduction,
      purifyOptions: {
        whitelist:['glowGreen', 'glowBlue', 'glowRed', 'glowYellow']
}
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })
  ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
