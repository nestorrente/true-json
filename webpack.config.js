const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const BUNDLE_HEADER = `
${packageJson.description}
v${packageJson.version}

${packageJson.homepage}

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

const commonConfig = {
    devtool: 'source-map',
    // mode: 'development',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    plugins: [
        new webpack.BannerPlugin({banner: BUNDLE_HEADER})
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
};

const standaloneConfig = {
    ...commonConfig,
    entry: './src/main/standalone-entry.js',
    output: {
        ...commonConfig.output,
        filename: 'true-json.js',
        library: {
            name: 'TrueJSON',
            type: 'var',
            export: 'default'
        }
    }
};

const moduleConfig = {
    ...commonConfig,
    entry: './src/main/module-entry.ts',
    output: {
        ...commonConfig.output,
        filename: 'true-json.umd.js',
        library: {
            name: 'TrueJSON',
            type: 'umd'
        },
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    }
};

module.exports = [
    standaloneConfig,
    moduleConfig
];
