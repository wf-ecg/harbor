module.exports = function(grunt) {

    grunt.registerTask('default',[
        'connect', 'jshint', 'sass', 'concat', 'uglify', 'watch' /* 'imagemin', 'compass' */
    ]);

    grunt.registerTask('custom', 'Say hello!', function() {
        grunt.log.writeln("Custom task log");
    });

    grunt.registerTask('dev', ['connect', 'watch']);

};
