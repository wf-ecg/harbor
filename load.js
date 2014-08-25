/*jslint es5:true, white:false */
/*globals _, C, W, ROOT, Global, Modernizr, jQuery,
    Glob:true, Main:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Glob, Load;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Load = {};

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
    if (ROOT.conf.nom === 'wfmedia') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    Load.base = {
        test: W.isIE,
        yep: [
            G.lib + 'ie/split.js',
            G.lib + 'ie/selectivizr-min.js',
            G.lib + 'ie/rem.min.js',
            G.lib + 'iscroll/5.0.4/iscroll.js',
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
            G.loc + '_util.js',
            G.loc + 'js-view.js',
            G.loc + 'extract.js',
            G.loc + 'fetch.js',
            G.loc + 'routie.js',
        ],
        complete: function () {
            U = Util;
            routie('home:xxx', function (xxx, yyy, zzz) {
                //this gets called when hash == #users
                C.warn('routie use!', U.arrg(arguments), this);
            });
        },
    };

    Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
        yep: [
            // G.lib + 'fonts/archer.ssm.css',
            // G.lib + 'fonts/archer.ssm.itl.css',
        ],
        nope: [
            /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
            // '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
    };

    Load.main = {
        both: [
            G.src + 'anchor.js',
            G.src + 'floater.js',
            G.src + 'projector.js',
            G.src + 'scroller.js',
            G.src + '_main.js',
        ],
        complete: function () {
            ROOT.loaded($);
            W.Main.init();
        },
    };

    Load.test = {
        test: W.debug > 0,
        yep: [G.src + 'tests.js'],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
