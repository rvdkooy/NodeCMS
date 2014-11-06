module.exports = function(grunt) {


  var libs = ['jquery', 'jquery-ui', '_angular', '_angular-resource', '_angular-route',
   , 'bootstrap', 'underscore', 'dateformat'];

  grunt.initConfig({
    
    browserify:{
      libs: {
        files: {
          'system/public/dist/vendor.js': ['somefile.js'],
        },
        options: {
          preBundleCB: function (bundle) {
            libs.forEach(function (lib) {
              console.log('adding: "' + lib + '" to the vendor.js');
              bundle.require(lib)
            });
          }
        }
      },
      components: {
        files: {
          'system/public/dist/components.js': ['system/**/public/scripts/**/*.js'],
        },
        options: {
          preBundleCB: function (bundle) {
            console.log('Creating the components.js');
            libs.forEach(function (lib) {
              bundle.exclude(lib)
            });
          }
        }
      }
    },
    // concat: {
      
    //     options: {
    //       separator: grunt.util.linefeed + ';' + grunt.util.linefeed
    //     },
    //     dist: {
    //       src: [ 
    //           'system/public/scripts/vendor/jquery.ui.nestedSortable.js',
    //           'system/public/scripts/vendor/jquery.shake.js',
    //           'system/public/scripts/vendor/metisMenu/jquery.metisMenu.js',
    //           'system/public/scripts/vendor/morris/morris.js',
    //           'system/public/scripts/vendor/sharedFunctions.js',
    //           'system/public/scripts/vendor/sb-admin.js',  
    //           'system/public/scripts/vendor/growl/jquery.growl.js'],
    //       dest: 'system/public/scripts/dist/vendorscripts.js'
    //     }
      
    // },
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
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('test', ['servertests']);
  grunt.registerTask('build', ['browserify:libs', 'browserify:components']);
};