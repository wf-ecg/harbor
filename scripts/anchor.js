/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        x, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Anchor = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Anchor',
        self = new G.constructor(name, '(manage hash data)'),
        Df, L;

    Df = { // DEFAULTS
        inits: function () {},
    };
    L = W.location;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    Anchor.wrap = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset() {
        if (U.debug(2)) {
            C.debug(name, '_reset', x);
        }
        L.href = L.origin + L.pathname;
    }

    function _read() {
        if (U.debug(2)) {
            C.debug(name, '_read', x);
        }
        var tmp = L.hash.replace('/','');
        var cut = /[\,\&]/;

        tmp = (!tmp || tmp.length < 2) ? '' : tmp.slice(1);
        tmp = tmp.match(cut) ? tmp.split(cut) : tmp;

        return tmp;
    }

    function _write(str) {
        if (U.debug(2)) {
            C.debug(name, '_write', x);
        }
        L.hash = str;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        reset: _reset,
        read: _read,
        write: _write,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    know when to set hash
    know when to read it
        initial load
        find out if extraction is needed

*/
