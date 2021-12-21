const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.html$/i,
        type: "asset/resource",
        generator: {
          filename: "index.html",
        },
      },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      // },
      // {
      // test: '/\\/$|index\\.html/',
      // type: "asset/resource",
      // generator: {
      //   filename: 'index.html'
      // },
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "img",
          to: "img",
        },
        {
          from: "css",
          to: "css",
        },
        {
          from: "profile.html",
          to: "profile.html",
        },
        // {
        //   context: path.resolve(__dirname, "dist"),
        //   from: "./*.html",\
        // },
      ],
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      "...",
      new TerserPlugin(),
      new HtmlMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                // That setting might be close to lossless, but it’s not guaranteed
                // https://github.com/GoogleChromeLabs/squoosh/issues/85
                quality: 100,
              },
              webp: {
                lossless: 1,
              },
              avif: {
                // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                cqLevel: 0,
              },
            },
          },
        },
      }),
    ],
  },
  resolve: {
    modules: ["node_modules"],
    fallback: [],
  },
  entry: ["./js/index.js", "./index.html"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "nft.bundle.js",
    clean: true,
  },
};
