module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      
        options: {
          separator: grunt.util.linefeed + ';' + grunt.util.linefeed
        },
        dist: {
          src: ['system/assets/admin/scripts/vendor/jquery-1.10.2.js', 
              //'system/assets/admin/scripts/vendor/angular.min.js', 
              //'system/assets/admin/scripts/vendor/angular-resource.min.js', 
              'system/assets/admin/scripts/vendor/jquery-ui.min.js',
              'system/assets/admin/scripts/vendor/jquery.ui.nestedSortable.js',
              //'system/assets/admin/scripts/vendor/ui-bootstrap-0.10.0.min.js',
              'system/assets/admin/scripts/vendor/underscore-min.js',      
              'system/assets/admin/scripts/vendor/jquery.shake.js',
              'system/assets/admin/scripts/vendor/jquery.cookie.js',
              'system/assets/admin/scripts/vendor/metisMenu/jquery.metisMenu.js',
              'system/assets/admin/scripts/vendor/morris/morris.js',
              'system/assets/admin/scripts/vendor/dateformat.js',
              'system/assets/admin/scripts/vendor/sharedFunctions.js',
              'system/assets/admin/scripts/vendor/bootstrap.js',
              'system/assets/admin/scripts/vendor/sb-admin.js',  
              'system/assets/admin/scripts/vendor/growl/jquery.growl.js'],
          dest: 'system/assets/admin/dist/vendorscripts.js'
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
        files: ['apps/**/server/**/*.js','system/specs/server/**/*.js'],
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