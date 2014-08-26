module.exports = function(grunt) {

    // Utility to load the different option files based on their names
    function synthobj(path) {
        var glob, object, key;

        glob = require('glob');
        object = {};

        glob.sync('*', {
            cwd: path
        }).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });
        return object;
    }

    // Start initial config object
    var config = {
        pkg: grunt.file.readJSON('./package.json'),
    };

    // Load tasks from the tasks folder
    // Load tasks/options by the name: watch.js => watch{}
    grunt.loadTasks('tasks');
    grunt.util._.extend(config, synthobj('./tasks/options/'));

    grunt.initConfig(config);
    // grunt.loadNpmTasks('grunt-contrib-compass');

    require('load-grunt-tasks')(grunt);
    console.log(grunt['package']);
};
