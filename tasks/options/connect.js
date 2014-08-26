//github.com/gruntjs/grunt-contrib-connect
module.exports = {
    server: {
        options: {
            base: ['app', '.', '../..'],
            port: 8001,
            livereload: 7001,
            hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
        },
    }
};
