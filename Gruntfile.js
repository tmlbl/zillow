module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserify: {
            dev: {
                src: 'fe/index.js',
                dest: 'www/index.js',
                options:{
                    browserifyOptions: {
                        paths:['node_modules','fe/'],
                        debug: true
                    },
                    preBundleCB: function (bundle) {
                        bundle.plugin('tsify', { });
                    }
                }
            },
            dist: {
                src: 'fe/index.js',
                dest: 'www/index.js',
                options:{
                    browserifyOptions: {
                        paths:['node_modules','fe/'],
                        debug: true
                    },
                    preBundleCB: function (bundle) {
                        bundle.plugin('tsify', { });
                    }
                }
            },
            data: {
                src: 'fe/data.js',
                dest: 'www/data.js',
                options:{
                    browserifyOptions: {
                        paths:['node_modules','fe/'],
                        debug: true
                    }
                }
            }
        },
        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: [
                    'fe/*.ts',
                    'www/**/*.css',
                    'www/index.html',
                    'fe/**/*.ts'
                ],
                tasks: ['ts', 'browserify:dist']
            },
            data: {
                options: {
                    livereload: true
                },
                files: [
                    'fe/data/*.js',
                    'fe/data.js',
                    'www/index.html'
                ],
                tasks: ['browserify:data']
            }
        },
        ts: {
            dev: {
                src: ['fe/index.ts', '!node_modules/**/*.ts'],
                options: {
                    module: "commonjs"
                }
            }
        }
    });

    // Load the npm installed tasks

    grunt.registerTask('default', ['ts', 'browserify:dist', 'watch']);
    grunt.registerTask('data', ['browserify:data', 'watch']);
    grunt.registerTask('build', ['ts', 'browserify:dist']);

};
