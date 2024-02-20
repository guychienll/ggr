const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

const baseConfig = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name]-[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, './tsconfig.json'),
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.module.(scss)?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: isProduction
                                ? {
                                      localIdentName: '[hash:base64:5]',
                                  }
                                : {
                                      localIdentName:
                                          '[name]__[local]___[hash:base64:5]',
                                  },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: { 'postcss-preset-env': {} },
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(scss)?$/,
                exclude: /\.module.(scss)?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    tailwindcss: {},
                                    'postcss-preset-env': {},
                                },
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/static'),
        },
        port: 3000,
        open: true,
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: 'static' }],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

let config = {};

if (isProduction) {
    config = merge(baseConfig, {
        stats: 'errors-only',
        devtool: false,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                        compress: {
                            passes: 2,
                        },
                    },
                }),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        },
    });
} else {
    config = module.exports = merge(baseConfig, {
        stats: 'minimal',
        devtool: 'eval-source-map',
        optimization: {
            minimize: false,
        },
    });
}

module.exports = config;
