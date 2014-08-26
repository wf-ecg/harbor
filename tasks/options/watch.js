//github.com/gruntjs/grunt-contrib-watch
module.exports = {
    options: {
        livereload: 7972,
        spawn: false,
    },
    app: {
        files: ['app/*.js'],
        tasks: ['jshint'],
    },
    js: {
        files: ['libs/*.js', 'scripts/*.js'],
        tasks: ['jshint', 'concat'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass'], // 'autoprefixer', 'cssmin', 'compass'
    },
    html: {
        files: ['app/**/*.html'],
        options: {
            spawn: false,
        },
    },
    config: {
        files: ['Gruntfile.js', 'tasks/*.js', 'tasks/options/*.js'],
        tasks: ['default'],
    },
};
