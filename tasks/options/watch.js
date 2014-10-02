module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base'],
    },
    html: {
        files: ['app/**/*.html'],
    },
    reloads: {
        options: {
            livereload: 7972,
        },
        files: ['app/**/*', '!**/*.map'],
        tasks: ['jshint:precat', 'sync:base'],
    },
    warn: {
        options: { reload: !false, },
        files: ['Gruntfile.js', 'tasks/**/*'],
        tasks: ['foobar'],
    },
};
