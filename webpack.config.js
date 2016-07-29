module.exports = {
  entry: {
    application: __dirname + '/src/application.tsx',
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js']
  },
  // https://webpack.github.io/docs/library-and-externals.html
  externals: {
    lodash: "_"
  },
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      // https://twitter.com/t_wada/status/684228193281150977
      { test: /\.json$/, loader: 'json-loader' }
    ],
    postLoaders: [
      { test: /_test\.ts(x?)$/, loader: 'webpack-espower-loader' }
    ]
  }
};
