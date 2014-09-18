/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        x, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Anchor = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Anchor',
        self = new G.constructor(name, '(manage hash data)'),
        Df, L;

    Df = { // DEFAULTS
        inits: function () {
            var tmp = self.read();

            if (U.debug()) {
                C.debug(name, tmp);
            }
        },
    };
    L = W.location;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    Anchor.wrap = function () {};

    Anchor.docFromHash = function (str) {
        var arr = str.split(/\/\#!|\.\/|\./); // split tokens
        // refers to document or hash?
        str = arr[1] ? (arr[0] || arr[1]) : '#';
        if (U.debug(2)) {
            C.debug(name, str);
        }
        return str;
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset() {
        L.href = L.origin + L.pathname;
    }

    function _write(str) {
        var tmp = L.pathname.split('/');

        if (tmp.pop()) { // document fragment
            C.warn(name, '_write', tmp);
            //L.pathname = tmp.join('/') + '/'; // rewrite without document
        }

        L.hash = '!' + str;
    }

    function _read(str) {
        var nom = str || L.hash;

        if (nom.charAt(0) === '#') {
            nom = nom.slice(1);
        }
        if (nom.charAt(0) === '!') {
            nom = nom.slice(1);
        }

        nom = (!nom || nom.length < 3) ? '' : nom; // filter name over 3 char
        nom = nom.split(/[\,\&\/]/g); //            segments?
        nom = nom[0] || nom[1]; //              in case started with slash

        if (!nom) {
            _write('home');
        }
        if (U.debug(2)) {
            C.debug(name, '_read', nom);
        }

        return nom;
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
