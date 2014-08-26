//github.com/gruntjs/grunt-contrib-concat
module.exports = {
    options: {
        sourceMap: true,
    },
    bootstrap: {
        options: {
            sourceMap: false,
        },
        src: [
            'libs/bootstrap/jquery.js',
            'libs/bootstrap/modernizr.js',
            'libs/bootstrap/lodash.underscore.js',
            'libs/bootstrap/console.js',
            'libs/bootstrap/global.js',
        ],
        dest: 'app/build/boot.js',
    },
    libs: {
        src: [
            'libs/*.js',
        ],
        dest: 'app/build/lib.js',
    },
    scripts: {
        src: [
            'scripts/[a-z]*.js', 'scripts/_main.js',
        ],
        dest: 'app/build/src.js',
    },
};

