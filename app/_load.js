/*jslint white:false */
/*globals _, C, W, Global, Util, jQuery,
        Glob:true, Main, Modernizr, ROOT, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Tests = $.Callbacks();
    G.Load = {};

    _.defaults(G, { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        ven: ROOT.dir + '/vendor/',
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
        test: W.isIE,
        yep: [
            G.ven + 'msie/rem.min.js',
            G.ven + 'msie/split.js',
            G.ven + 'msie/iscroll.js', // fkin ie
        ],
        nope: [
            G.ven + 'iscroll.js', // current standards
        ],
        both: [
            G.ven + 'routie.js',
            /* */
            G.dir + 'build/lib.js',
        ],
        complete: function () {
            if (W.isIE) {
                IScroll = undefined;
            }
            U = Util;
            Data = new G.constructor('Data', '(catchall data fixture)');
        },
    };

    G.Load.main = {
        both: [
            G.dir + 'build/src.js',
        ],
        complete: function () {
            _.delay(function () {
                M.load('./msie/selectivizr-min.js');
                ROOT.loaded($);
            }, 333);
            eval(W.Main && W.Main.init());
        },
    };

    G.Load.test = {
        test: W.debug >= 1,
        //yep: ['_tests.js'],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
        ],
    };
    M.load([G.Load.base, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
