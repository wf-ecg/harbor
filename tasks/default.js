module.exports = function(grunt) {

    grunt.registerTask('default', [
        'connect', 'sass',
        'jshint:precat', 'concat', 'jshint:postcat',
        'uglify', 'copy', 'watch',
    ]);

    grunt.registerTask('custom', 'Say hello!', function() {
        grunt.log.writeln("Custom task log");
    });

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln('\n\n\n\nWATCH >><< TARGET:', target, filepath);

//        var cfgkey = ['copy', 'files'];
//
//        grunt.config.set(cfgkey, [grunt.config.get(cfgkey)].map(function(file) {
//            file.src = filepath;
//            return file;
//        }));
    });

    // You can specify single files:
    foo = {
        src: 'foo/this.js',
        dest: '...'
    };  // Or arrays of files:
    foo = {
        src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'],
        dest: '...'
    };  // Or you can generalize with a glob pattern:
    foo = {
        src: 'foo/th*.js',
        dest: '...'
    };  // This single node-glob pattern:
    foo = {
        src: 'foo/{a,b}*.js',
        dest: '...'
    };  // Could also be written like this:
    foo = {
        src: ['foo/a*.js', 'foo/b*.js'],
        dest: '...'
    };  // All .js files, in foo/, in alpha order:
    foo = {
        src: ['foo/*.js'],
        dest: '...'
    };  // Here, bar.js is first, followed by the remaining files, in alpha order:
    foo = {
        src: ['foo/bar.js', 'foo/*.js'],
        dest: '...'
    };  // All files except for bar.js, in alpha order:
    foo = {
        src: ['foo/*.js', '!foo/bar.js'],
        dest: '...'
    };  // All files in alpha order, but with bar.js at the end.
    foo = {
        src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'],
        dest: '...'
    };  // Templates may be used in filepaths or glob patterns:
    foo = {
        src: ['src/<%= basename %>.js'],
        dest: 'build/<%= basename %>.min.js'
    };  // But they may also reference file lists defined elsewhere in the config:
    foo = {
        src: ['foo/*.js', '<%= jshint.all.src %>'],
        dest: '...'
    };
};
