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
                annotation: 'dist/css/maps/' // ...to the specified directory
            },

            processors: [
              require('pixrem')(), // add fallbacks for rem units
              require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
              //require('cssnano')() // minify the result
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['sass', 'postcss', 'watch']);
};
