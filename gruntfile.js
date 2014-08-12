module.exports = function(grunt) {

  grunt.initConfig({
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

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['servertests', 'watch']);
  grunt.registerTask('default', ['servertests']);
};