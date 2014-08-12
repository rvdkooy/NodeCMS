module.exports = function(grunt) {

  // grunt.registerTask('default', '1st task', function() {
  //   grunt.log.write('this is my first grunt task ').ok();
  // });

  grunt.registerTask('default', 'run mocha tests', function () {
    var done = this.async();
    require('child_process').exec('npm test', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
};