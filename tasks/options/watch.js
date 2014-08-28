// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
    options: {
        //spawn: false,
        livereload: true,
    },
    app: {
        files: ['app/*.js'],
        tasks: ['jshint'],
    },
    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint', 'concat:lib'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint', 'concat:src'],
    },
    css: {
        options: {
            livereload: false,
        },
        files: ['scss/**/*.scss'],
        tasks: ['sass'], // 'autoprefixer', 'cssmin', 'compass'
    },
    html: {
        files: ['app/**/*.html'],
    },
    config: {
        options: {
            reload: true,
        },
        files: ['Gruntfile.js', 'tasks/*.js', 'tasks/options/*.js'],
        tasks: ['default'],
    },
};
