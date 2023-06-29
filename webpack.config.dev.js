const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    publicPath: "./",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.mjs|js$/,
        exclude: /node_modules/,
        use: {
          loader: "buble-loader",
          options: {
            transforms: { asyncAwait: false },
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Snake game",
      template: "./public/index.html",
      inject: true,
    }),
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    port: 3000,
    compress: true,
    historyApiFallback: true,
    open: true,
  },
  stats: { errorDetails: true },
};
