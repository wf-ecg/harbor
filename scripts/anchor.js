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
        L.href = L.origin + L.pathname;
    }

    function _read() {
        var nom = L.hash.slice(1);
        var cut = /[\,\&\/]/;

        nom = (!nom || nom.length < 3) ? '' : nom;
        nom = nom.split(cut);

        if (U.debug(1)) {
            C.debug(name, '_read', nom);
        }
        return (nom[0] || nom[1]);
    }

    function _write(str) {
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
