// https://github.com/gruntjs/grunt-contrib-compass
module.exports = {
    dev: {
        options: {
            //config: 'tasks/config.rb',
            cssDir: 'app/build',
            environment: 'development', // production
            fontDir: 'fonts',
            imagesDir: 'app/images',
            javascriptsDir: "scripts",
            lineComments: false,
            outputStyle: 'compact',
            relativeAssets: true,
            sassDir: 'scss',
        },
    },
};
