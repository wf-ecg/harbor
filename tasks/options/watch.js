//github.com/gruntjs/grunt-contrib-watch
module.exports = {
    options: {
        livereload: 7001,
    },
    app: {
        files: ['app/*.js'],
        tasks: ['jshint'],
        options: {
            spawn: false,
        },
    },
    js: {
        files: ['libs/*.js', 'scripts/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
            spawn: false,
        },
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass'], // 'autoprefixer', 'cssmin', 'compass'
        options: {
            spawn: false,
        },
    },
    html: {
        files: ['app/*.html'],
        options: {
            spawn: false,
        },
    },
};
