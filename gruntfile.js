module.exports = function(grunt) {

  var libs = ['jquery', 'jquery-ui', '_angular', '_angular-resource', '_angular-route',
   'bootstrap', 'ui-bootstrap', 'underscore', 'dateformat', 'morris', 'nestedsortable', 
  'jquery.shake', 'jquery.metisMenu', 'sbadmin'];

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
          'system/public/dist/components.js': [
            'system/**/public/scripts/**/*.js', 
            'components/**/public/scripts/**/*.js'],
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
    watch: {
      browserify:{
        files: ['system/**/public/scripts/**/*.js','components/**/public/scripts/**/*.js'],
        tasks: ['browserify:components'],
      },
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
  grunt.registerTask('build', ['browserify:libs', 'browserify:components', 'watch:browserify']);
};