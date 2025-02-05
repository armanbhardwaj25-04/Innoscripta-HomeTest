const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Entry point for the app
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // other minimizers (like TerserPlugin for JS)
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"], // Resolve these file types
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Transpile TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Use Babel to transpile JavaScript files
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000, // Port for the dev server
    hot: true, // Hot module reloading
  },
  mode: "development", // Change to 'production' for optimized builds
};
