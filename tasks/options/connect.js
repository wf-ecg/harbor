// https://github.com/gruntjs/grunt-contrib-connect
module.exports = {
    server: {
        options: {
            base: ['app', '.', '../..'],
            //hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
            livereload: true,
            //open: true,
            port: 8972,
        },
    },
};
