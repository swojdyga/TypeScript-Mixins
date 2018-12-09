const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
    const isProduction = argv.mode == 'production';

    return {
        target: 'node',
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'build')
        },
        resolve: {
            extensions: [
                '.ts'
            ]
        },
        watch: !isProduction,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'tslint.json'),
                                emitErrors: isProduction
                            }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    module: "amd",
                                    outFile: "./build/index.js"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        externals: [nodeExternals()]
    };
};