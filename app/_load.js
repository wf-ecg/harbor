/*jslint white:false */
/*globals _, C, W, Glob:true, Util, jQuery,
        Global, Modernizr, ROOT, */
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
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
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
        both: ['./build/lib.js'],
        test: W.isIE,
        yep: [
            G.lib + 'ie/rem.min.js',
            G.lib + 'ie/split.js',
            G.lib + 'iscroll/5.0.4/iscroll.js',
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        complete: function () {
            if (W.isIE) {
                _.delay(function () {
                    M.load(G.lib + 'ie/selectivizr-min.js');
                }, 2222);
            }
        },
    };

    G.Load.font = {
        test: ROOT.conf.nom === 'localhost',
        yep: [
            /* G.lib + 'fonts/archer.ssm.css', */
            /* G.lib + 'fonts/archer.ssm.itl.css', */
        ],
        nope: [
            /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
            /* '//cloud.typography.com/6819872/633184/css/fonts.css',  ScrnSmrt */
        ],
    };

    G.Load.main = {
        both: [
            'build/src.js',
        ],
        complete: function () {
            _.delay(function () {
                ROOT.loaded($);
            }, 333);
            evil(W.Main && W.Main.init());
        },
    };

    G.Load.test = {
        test: W.debug >= 1,
        yep: [
            //G.src + 'tests.js'
        ],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([G.Load.base, G.Load.font, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
