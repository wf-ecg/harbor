/*jslint white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
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
        both: [
            G.lib + 'jquery/mobile/1.4.2/jquery.mobile.js',
            //G.loc + '_util.js',
            //G.loc + 'jq-inview.js',
            //G.loc + 'js-view.js',
            //G.loc + 'extract.js',
            //G.loc + 'fetch.js',
            //G.loc + 'routie.js',
            './build/lib.js',
        ],
        test: W.isIE,
        yep: [
            G.lib + 'ie/split.js',
            G.lib + 'ie/selectivizr-min.js',
            G.lib + 'ie/rem.min.js',
            G.lib + 'iscroll/5.0.4/iscroll.js',
            G.loc + '_util.poly.js',
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        complete: function () {
            U = Util;
        },
    };

    G.Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
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
            //G.src + 'anchor.js',
            //G.src + 'binders.js',
            //G.src + 'floater.js',
            //G.src + 'projector.js',
            //G.src + 'scroller.js',
            //G.src + '_main.js',
            './build/src.js',
        ],
        complete: function () {
            ROOT.loaded($);
            evil(W.Main && W.Main.init());
        },
    };

    G.Load.test = {
        test: W.debug >= 0,
        yep: [
            G.src + '_tests.js'
        ],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([G.Load.base, G.Load.font, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
