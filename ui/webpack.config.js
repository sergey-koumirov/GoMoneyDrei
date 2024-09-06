const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["lodash"],
          },
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [],

  optimization: {
    chunkIds: "size",
    innerGraph: true,
  },

  mode: "development",
};
