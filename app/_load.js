/*jslint white:false */
/*globals _, C, W, Glob:true, Util, jQuery,
        Global, Main, Modernizr, ROOT, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Tests = $.Callbacks();
    G.Load = {};

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
    });

    if ($.browser.msie) {
        $(function () {
            $('html').addClass('msie');
            $('body').on('mouseover', '.region, .widget, a, li', function () {
                $(this).addClass('hover');
            }).on('mouseout', '.region, .widget, a, li', function () {
                $(this).removeClass('hover');
            });
        });
        W.debug--;
    }
    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    G.Load.base = {
        both: ['./build/lib.js', './build/vendor.js'],
        complete: function () {
            if (W.isIE) {
                IScroll = undefined;
            }
        },
    };

    G.Load.main = {
        test: W.isIE,
        yep: ['./build/msie.js'],
        both: ['./build/src.js'],
        complete: function () {
            _.delay(function () {
                M.load('./msie/selectivizr-min.js');
                ROOT.loaded($);
            }, 333);
            evil(Main && Main.init());
        },
    };

    G.Load.test = {
        test: W.debug >= 0,
        //yep: ['_tests.js'],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
        ],
    };
    M.load([G.Load.base, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
