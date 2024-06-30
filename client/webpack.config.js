require("dotenv").config();
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },


  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    compress: true,
    host: process.env.HOST || "localhost",
    static: path.join(__dirname, "public"),
    port: 8080,
  },
};
