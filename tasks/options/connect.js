module.exports = {

    // CONNECT
    // https://github.com/gruntjs/grunt-contrib-connect

    options: {
        livereload: 7972,
        port: 8972,
    },
    base: {
        options: {
            base: ['app', '.', '../..'],
            open: false,
        },
    },
    full: {
        options: {
            base: ['app', '.', '../..'],
            //hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
            open: 'http://localhost:8972', // target url to open
        },
    },
};
