module.exports = {
    options: {
        beautify: true,
        compress: false,
        mangle: false,
//        sourceMap: true,
    },
    my_target: {
        files: {
            'build/src.min.js': ['build/src.js']
        }
    },
};
