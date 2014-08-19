module.exports = {
    options: {
    // livereload: true,
    },
    scripts: {
        files: ['scripts/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
            spawn: false,
        }
    },
}
