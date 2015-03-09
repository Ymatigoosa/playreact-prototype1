'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build'],
        concurrent: {
            dev: ['nodemon:app', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: [
                '*.js',
                '{actions,configs,components,services,stores}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        nodemon: {
            app: {
                script: './server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/js',
                    publicPath: '/public/js/',
                    filename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    // tasks
    grunt.registerTask('default', ['clean', 'jshint', 'concurrent:dev']);
};

