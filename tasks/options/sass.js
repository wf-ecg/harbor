//github.com/gruntjs/grunt-contrib-sass
module.exports = {
    dist: {
        options: {
            compass: true,
            require: 'animation',
            sourcemap: 'auto',
            style: 'compact',
            update: true,
        },
        files: {
            'app/build/screen.css': 'scss/screen.scss',
        }
    }
};
