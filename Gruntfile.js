module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    //"css/skeleton.css": "scss/skeleton.scss",
                    "css/base.css": "scss/base.scss"
                }
            }
        },

        postcss: {
          options: {
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'css/maps/' // ...to the specified directory
            },

            processors: [
              require('pixrem')(), // add fallbacks for rem units
              require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
              require('cssnano')() // minify the result
            ]
          },
          dist: {
            src: 'css/*.css'
          }
        },

        watch: {
            options: {
                livereload: false,
            },
            styles: {
                files: ['scss/**/*.scss'], // which files to watch
                tasks: ['sass', 'postcss'],
                options: {
                    nospawn: true
                }
            }
        },

        copy: {
            html: {
                files: [
                    { src: 'index.html', dest: 'build/' }
                  ]
                },
            static: {
                files: [
                    { src: 'images/*', dest: 'build/' }
                  ]
                },
            css: {
                files: [
                  { src: 'css/base.css', dest: 'build/' }
                ]
              },
            js: {
                files: [
                  { src: 'scripts/core.js', dest: 'build/' }
                ]
            },
          },

          clean: {
            dist: ['build', 'dist.zip']
          },

          compress: {
            dist: {
              options: {
                archive: 'dist.zip'
              },
              files: [
                  { src: 'build/**' }
              ],
              expand: true,
              cwd: 'build/',
              src: ['**/*'],
              dest: '/'
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['sass', 'postcss', 'watch']);
    grunt.registerTask('build', ['sass', 'postcss', 'clean', 'copy', 'compress']);
};
