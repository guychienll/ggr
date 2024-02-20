const path = require('path');

type WebpackFinalParams = {
  resolve: {
    alias: any;
  };
  module: {
    rules: {
      test: RegExp;
      exclude?: RegExp;
      use:
        | {
            loader: string;
          }[]
        | (
            | string
            | {
                loader: string;
                options: {
                  modules: {
                    localIdentName: string;
                  };
                };
              }
            | {
                loader: string;
                options: {
                  postcssOptions: {
                    plugins: string[];
                  };
                };
              }
          )[];
    }[];
  };
};

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async function (
    config: WebpackFinalParams,
    { configType }: any,
  ) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src/'),
      };
    }

    if (config.module && config.module.rules) {
      config.module.rules = config.module.rules.map((rule: any) => {
        if (/svg/.test(rule.test as string)) {
          return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
      });

      config.module.rules.push({
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      });

      config.module.rules.push({
        test: /\.module.(scss)?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      });

      config.module.rules.push({
        test: /\.(scss)?$/,
        exclude: /\.module.(scss)?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      });
    }

    return config;
  },
};
export default config;
