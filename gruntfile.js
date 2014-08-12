module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      
        options: {
          separator: ';'
        },
        dist: {
          src: ['public/admin/scripts/vendor/**/*.js'],
          dest: 'public/admin/dist/vendorscripts.js'
        }
      
    },
    // uglify: {
    //   dist: {
    //     files: {
    //       'dist/vendor.min.js': ['dist/vendor.js']
    //     }
    //   }
    // },

    watch: {
      
      // src: {
      //   files: ['lib/*.js', 'css/**/*.scss', '!lib/dontwatch.js'],
      //   tasks: ['default'],
      // },
      servertests: {
        files: 'specs/server/**/*.js',
        tasks: ['servertests'],
      }
    }
  });

  grunt.registerTask('servertests', 'run server tests', function () {
    var done = this.async();
    require('child_process').exec('npm test', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['servertests', 'watch']);
  grunt.registerTask('build', ['servertests', 'concat:dist']);
};