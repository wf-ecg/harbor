module.exports = function(grunt) {

    grunt.registerTask('default', [
        'connect', 'jshint', 'sass', 'concat', 'uglify', 'watch' /* 'imagemin', 'compass' */
    ]);

    grunt.registerTask('custom', 'Say hello!', function() {
        grunt.log.writeln("Custom task log");
    });

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln('action, filepath, target', action, filepath, target);
    });
};
