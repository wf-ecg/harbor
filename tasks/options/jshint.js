module.exports = {

    // JSHINT
    // https://github.com/gruntjs/grunt-contrib-jshint

    options: {
        force: true,
        '-W015': true,
        //        '-W013': true,
        //        '-W033': true,
        '-W061': true,
    },
    beforeconcat: ['app/*.js', 'scripts/*.js'],
    afterconcat: ['app/build/src.js'],
};
