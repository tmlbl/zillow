module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserify: {
            dev: {
                src: 'src/index.js',
                dest: 'assets/js/index.js',
                options:{
                    browserifyOptions: {
                        paths:['fe/components/node_modules','fe/ts'],
                        debug: true
                    },
                    preBundleCB: function (bundle) {
                        bundle.plugin('tsify', { });
                    }
                }
            },
            dist: {
                src: 'src/index.js',
                dest: 'assets/js/index.js',
                options:{
                    browserifyOptions: {
                        paths:['../../node_modules','src/'],
                        debug: true
                    },
                    preBundleCB: function (bundle) {
                        bundle.plugin('tsify', { });
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
                    '*.html',
                    'src/*.ts'
                ],
                tasks: ['ts', 'browserify:dist']
            }
        },
        ts: {
            dev: {
                src: ['src/*.ts', '!node_modules/**/*.ts'],
                options: {
                    module: "commonjs"
                }
            }
        }
    });

    // Load the npm installed tasks

    grunt.registerTask('default', ['ts', 'browserify:dist','watch']);
    grunt.registerTask('build', ['less:dist', 'ts', 'browserify:dist', 'copy:dist']);

};
