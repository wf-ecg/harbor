module.exports = function(grunt) {
    grunt.registerTask('default',
        ['connect', 'jshint', 'concat', 'sass', 'uglify', 'watch']
        /* 'imagemin', 'sass' */
    );
};
