module.exports = {

    // CONNECT
    // https://github.com/gruntjs/grunt-contrib-copy

    main: {
        expand: true,
        cwd: 'app/build/',
        src: ['**'],
        dest: '/web/docs/wf-ecg/harbor/4/app/build/',
    },
};
