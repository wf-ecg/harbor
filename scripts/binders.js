/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Binders = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Binders',
        self = new G.constructor(name, '(misc)'),
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
            if (!W.isIE && $(evt.toElement).is(this)) {
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

        $('#Wrap').on('inview', function (evt, vis, lr, tb) { // visi?, left+right, top+bottom
            if (U.debug(2)) {
                C.debug(name, 'bindFixed', vis, lr, tb, [evt]);
            }
            if (tb === 'bottom') {
                header.addClass('fixed');
            } else {
                header.removeClass('fixed');
            }
        });
    }

    function bindSearch() {
        var cx, gcse, s;
        cx = '006146512309439838370:zwrrqyaixxi';

        gcse = W.document.createElement('script');
        gcse.async = true;
        gcse.src = '//www.google.com/cse/cse.js?cx=' + cx;
        gcse.type = 'text/javascript';

        s = W.document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);

    }

    function bindings() {
        // bindAltnav();
        bindBlur();
        bindDrops();
        bindFixed();
        bindSearch();
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

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
