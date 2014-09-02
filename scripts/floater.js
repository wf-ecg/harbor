/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        , */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Floater = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Floater',
        self = new G.constructor(name, '(construct a toc/index for big lists)'),
        Df;

    Df = { // DEFAULTS
        box: $(W.isIE ? 'html' : 'body'),
        last: $(null),
        space: 99,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function indexHandler(evt) {
        evt.preventDefault();

        var str = evt.target.attributes.getNamedItem('href').value;

        self.jump(str);
    }

    // EASE
    $.extend($.easing, {
        circ: function (p) {
            function easeIn(p) {
                return 1 - Math.sqrt(1 - p * p);
            }
            return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * - 2 + 2) / 2;
        },
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _jump(ele, xtra) {
        var amt, aprx, diff;

        xtra = xtra || 0;
        ele = $(ele || Df.box);

        if (ele.length) {
            Df.last.removeClass('target');

            amt = ele.offset().top | 0;
            aprx = (amt * 0.95 - xtra) | 0;
            Df.last = ele;

            if (ele.is('.dropdown')) {
                ele.addClass('target');
            } else {
                aprx += xtra;
            }

            Df.box.stop().animate({
                scrollTop: aprx,
            }, 333, 'circ', function () {
                diff = Math.abs(ele.offset().top - amt) | 0;

                if (U.debug(2)) {
                    C.debug(name, '_jump', {
                        amt: amt,
                        xtra: xtra,
                        aprx: aprx,
                        diff: diff,
                        ele: [ele],
                    });
                }
                if (!xtra || diff > Df.space) {
                    _jump(ele, diff || Df.space);
                } else {
                    if (U.debug()) {
                        C.debug(name, '_jump done');
                    }
                    Df.last.click();
                }
            });
        }
    }

    function _bind(these, index) {
        these = $(these || '.content h5:visible');
        index = $(index || '.content aside ul:visible');

        if (index.children().length) {
            return; // indexed already
        }

        if (U.debug(2)) {
            C.debug(name, '_bind', [these, index]);
        }

        these.each(function () {
            var me, id, ele;

            me = $(this);
            ele = $('<a>');

            id = me.text().match(/\b\w/g); //   make id from initials
            id = '__' + id.join(''); //         prefix programatic id
            // add anchor # id to index
            me.attr('id', id);
            ele.attr('href', '#' + id).text(me.text());
            $('<li>').appendTo(index).append(ele);
        });

        index.on('click', 'a', indexHandler);
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
        bind: _bind,
        jump: _jump,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    use hash bang to distinguish data requests

    incorp goodies from sibos
        fixed posi

*/
