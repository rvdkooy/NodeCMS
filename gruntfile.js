module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      
        options: {
          separator: grunt.util.linefeed + ';' + grunt.util.linefeed
        },
        dist: {
          src: ['system/public/scripts/vendor/jquery-1.10.2.js', 
              //'system/public/scripts/vendor/angular.min.js', 
              //'system/public/scripts/vendor/angular-resource.min.js', 
              'system/public/scripts/vendor/jquery-ui.min.js',
              'system/public/scripts/vendor/jquery.ui.nestedSortable.js',
              //'system/public/scripts/vendor/ui-bootstrap-0.10.0.min.js',
              'system/public/scripts/vendor/underscore-min.js',      
              'system/public/scripts/vendor/jquery.shake.js',
              'system/public/scripts/vendor/jquery.cookie.js',
              'system/public/scripts/vendor/metisMenu/jquery.metisMenu.js',
              'system/public/scripts/vendor/morris/morris.js',
              'system/public/scripts/vendor/dateformat.js',
              'system/public/scripts/vendor/sharedFunctions.js',
              'system/public/scripts/vendor/bootstrap.js',
              'system/public/scripts/vendor/sb-admin.js',  
              'system/public/scripts/vendor/growl/jquery.growl.js'],
          dest: 'system/public/scripts/dist/vendorscripts.js'
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
        files: ['components/**/server/**/*.js','system/server/specs/server/**/*.js'],
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

  grunt.registerTask('test', ['servertests']);
  grunt.registerTask('build', ['concat:dist']);
};