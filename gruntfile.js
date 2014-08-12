module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      
        options: {
          separator: grunt.util.linefeed + ';' + grunt.util.linefeed
        },
        dist: {
          src: ['public/admin/scripts/vendor/jquery-1.10.2.js', 
              'public/admin/scripts/vendor/angular.min.js', 
              'public/admin/scripts/vendor/angular-resource.min.js', 
              'public/admin/scripts/vendor/jquery-ui.min.js',
              'public/admin/scripts/vendor/jquery.ui.nestedSortable.js',
              'public/admin/scripts/vendor/ui-bootstrap-0.10.0.min.js',
              'public/admin/scripts/vendor/underscore-min.js',      
              'public/admin/scripts/vendor/jquery.shake.js',
              'public/admin/scripts/vendor/jquery.cookie.js',
              'public/admin/scripts/vendor/metisMenu/jquery.metisMenu.js',
              'public/admin/scripts/vendor/morris/raphael-2.1.0.min.js',
              'public/admin/scripts/vendor/morris/morris.js',
              'public/admin/scripts/vendor/dateformat.js',
              'public/admin/scripts/vendor/sharedFunctions.js',
              'public/admin/scripts/vendor/bootstrap.js',
              'public/admin/scripts/vendor/sb-admin.js',  
              'public/admin/scripts/vendor/growl/jquery.growl.js',
              'public/admin/scripts/vendor/tinymce/tinymce.min.js',
              'public/admin/scripts/vendor/jquery.fileupload.js',
              'public/admin/scripts/vendor/jquery.iframe-transport.js'],
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