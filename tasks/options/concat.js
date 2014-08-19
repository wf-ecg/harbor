module.exports = {
    dist: {
        src: [
        'lib/[a-z]*.js',
        ],
        dest: 'build/lib.js',
    },
    dist1: {
        src: [
        'scripts/[a-z]*.js', // 'scripts/_main.js',
        ],
        dest: 'build/src.js',
    },
};
