const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "./",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "production",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  optimization: {
    minimize: true,
    minimizer: ["...", new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
