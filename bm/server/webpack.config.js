var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// es5 style alternative
// fs.readdirSync(path.resolve(__dirname, 'node_modules'))
//     .filter(function(x) {
//         return ['.bin'].indexOf(x) === -1;
//     })
//     .forEach(function(mod) {
//         nodeModules[mod] = 'commonjs ' + mod;
//     });

module.exports =

  {
    // The configuration for the server-side rendering
    name: 'server',
    target: 'node',
    entry: path.resolve('./bin/www.js'),
    output: {
      path: path.resolve('.'),
      filename: 'www.js'
    },
    mode: 'production',
    externals: nodeModules,
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
      ]
    },
    plugins: [
      // new webpack.NormalModuleReplacementPlugin("^(react-bootstrap-modal)$", "^(react)$")
      // new webpack.IgnorePlugin(new RegExp("^(react-bootstrap-modal)$"))
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  };