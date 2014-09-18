/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Tests:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Tests = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Tests',
        self = new G.constructor(name, '(misc experiments)'),
        Df;

    Df = { // DEFAULTS
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



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
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
