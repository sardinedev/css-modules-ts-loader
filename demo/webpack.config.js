const webpack = require("webpack");
const path = require("path");

const config = {
  entry: `./demo/src/index.ts`,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "./lib/index.js",
            options: {
              banner: false
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCaseOnly"
            }
          }
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
        ],
        include: /\.module\.css$/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["../node_modules"]
  }
};

module.exports = config;
