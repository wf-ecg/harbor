module.exports = {
    options: {
    // livereload: true,
    },
    scripts: {
        files: ['scripts/*.js', 'lib/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
            spawn: false,
        }
    },
//    css: {
//        files: ['css/*.scss'],
//        tasks: ['sass', 'autoprefixer', 'cssmin'],
//        options: {
//            spawn: false,
//        }
//    },
};
