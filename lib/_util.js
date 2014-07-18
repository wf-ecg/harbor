/*jslint es5:true, white:false */
/*globals C, D, W, $ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/**
 * Top level @namespace for Utils/sync (project unaware code)
 */
var Utils = {
    delay: function (ms, fn) {
        if (!fn) {
            fn = ms;
            ms = 999;
        }
        W.setTimeout(fn, ms > 5 ? ms : 5);
    },
    lead: function (str) {
        var rem = 13 - str.length;

        while (0 < rem--) {
            str += '.';
        }
        return str;
    },
    args: function () {
        return arguments;
    },
    arrg: function (x) {
        return Array.prototype.slice.apply(x);
    },
    def: function (arg) {
        return (typeof arg !== 'undefined');
    },
    pre: function (s) {
        C.debug.apply(C, arguments);
        s = this.arrg(arguments).join(', \n');
        this.put($('<pre>').text(s));
    },
    put: function (e) {
        $(e).after('<hr>').appendTo('body');
    },
    assert: function (a, b, c) {
        var sa = JSON.stringify(a);
        var sb = JSON.stringify(b);

        this.pre('strings', sa, sb);
        C.assert(sa === sb, [c || 'notes', ['raw', a, b]]);
    },
    initBegin: function () {
        C.group('loading');
    },
    initFinish: function () {
        C.groupEnd();
    },
};

Utils.initBegin();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*
Polyfills
*/

if (typeof Object.create !== 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if (o === null) {
                o = {}; //throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o !== 'object') {
                throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
    }());
}
