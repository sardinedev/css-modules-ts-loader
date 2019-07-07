[![codecov](https://codecov.io/gh/greyskullrocks/css-modules-typings-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/greyskullrocks/css-modules-typings-loader)

# css-modules-ts-loader

The `css-modules-ts-loader` creates a `.d.ts` file with css classes and ids to be imported by typescript.

## Getting Started

First, you'll need to install `css-modules-ts-loader`:

```console
npm install --save-dev @greyskullrocks/css-modules-ts-loader
```

And then configure your webpack config file:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-modules-ts-loader",
            options: {
              banner: "Hey, css-modules-ts-loader created this file for you!"
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
      }
    ]
  }
};
```

## How it works?

This loader depends on `css-loader` and the `modules` option to be enabled.

## Options

|          Name           |        Type         | Default | Description                                                        |
| :---------------------: | :-----------------: | :-----: | :----------------------------------------------------------------- |
| **[`banner`](#banner)** | `{Boolean\|String}` | `true`  | Creates a message at the beginning of each generated `.d.ts` file. |

### `banner`

Type: `{Boolean\|String}`
Deafault: `true`

Creates a message at the beginning of each generated `.d.ts` file. You can specify your own message by passing your own string.

## License

[MIT](./LICENSE)
