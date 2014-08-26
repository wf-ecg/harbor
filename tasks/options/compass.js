//github.com/gruntjs/grunt-contrib-compass
module.exports = {
    dist: {
        options: {
            config: 'tasks/config.rb',
            environment: 'development', // production
            // cssDir: 'app/build',
            // sassDir: 'styles',
        },
    },
    // dev: { //  Another target
    //     options: {
    //         sassDir: 'sass',
    //         cssDir: 'css',
    //     },
    // },
};
