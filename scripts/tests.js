/*jslint es5:true, white:false */
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
    // HELPERS (defaults dependancy only)

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function bindAltnav() {
        $('nav.sub-top').dblclick(function () {
            $(this).toggleClass('fixed shadow');
        });
    }

    function bindBlur() {
        $('body').click(function (evt) {
            if ($(!W.isIE && event.toElement).is(this)) {
                $('#Flood').toggleClass('blur');
            }
        });
    }

    function bindDrops() {
        $('.content').on('click', '.dropdown', function (evt) {
            $(this).next().toggle('fast');
        });
    }

    function bindFixed() {
        var header = $('#Body');

        $('.slideshow').on('inview', function (a, b, c, d) {
            C.log(b, c, d)
            if (d === 'both') {
                header.removeClass('fixed');
            } else {
                header.addClass('fixed');
            }
        });
    }

    function bindings() {
        bindAltnav();
        bindBlur();
        bindDrops();
        bindFixed();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        _.delay(bindings);

        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
    });

    return self.init();
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
