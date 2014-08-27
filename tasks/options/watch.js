//github.com/gruntjs/grunt-contrib-watch
module.exports = {
    options: {
        spawn: false,
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
    livereload: {
        // These files are sent to the live reload server after sass compiles to them
        options: {
            livereload: 7972,
        },
        files: ['app/build/src.js'],
    },
};
