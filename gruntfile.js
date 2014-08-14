module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      
        options: {
          separator: grunt.util.linefeed + ';' + grunt.util.linefeed
        },
        dist: {
          src: ['apps/system/assets/scripts/vendor/jquery-1.10.2.js', 
              'apps/system/assets/scripts/vendor/angular.min.js', 
              'apps/system/assets/scripts/vendor/angular-resource.min.js', 
              'apps/system/assets/scripts/vendor/jquery-ui.min.js',
              'apps/system/assets/scripts/vendor/jquery.ui.nestedSortable.js',
              'apps/system/assets/scripts/vendor/ui-bootstrap-0.10.0.min.js',
              'apps/system/assets/scripts/vendor/underscore-min.js',      
              'apps/system/assets/scripts/vendor/jquery.shake.js',
              'apps/system/assets/scripts/vendor/jquery.cookie.js',
              'apps/system/assets/scripts/vendor/metisMenu/jquery.metisMenu.js',
              'apps/system/assets/scripts/vendor/morris/raphael-2.1.0.min.js',
              'apps/system/assets/scripts/vendor/morris/morris.js',
              'apps/system/assets/scripts/vendor/dateformat.js',
              'apps/system/assets/scripts/vendor/sharedFunctions.js',
              'apps/system/assets/scripts/vendor/bootstrap.js',
              'apps/system/assets/scripts/vendor/sb-admin.js',  
              'apps/system/assets/scripts/vendor/growl/jquery.growl.js',
              'apps/system/assets/scripts/vendor/tinymce/tinymce.min.js',
              'apps/system/assets/scripts/vendor/jquery.fileupload.js',
              'apps/system/assets/scripts/vendor/jquery.iframe-transport.js'],
          dest: 'apps/system/assets/dist/vendorscripts.js'
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
        files: 'apps/system/specs/server/**/*.js',
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