/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Floater = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Floater',
        self = new G.constructor(name, '(construct a toc/index for big lists)'),
        Df;

    Df = { // DEFAULTS
        box: $(W.isIE ? 'html' : 'body'),
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function indexHandler(evt) {
        evt.preventDefault();

        var str = this.attributes.getNamedItem('href').value;

        self.scroll(str);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _scroll(ele, amt) {
        amt = amt || 0;
        ele = $(ele || Df.box);

        if (U.debug()) {
            C.debug(name, '_scroll', [amt + 'px', ele]);
        }

        if (ele.length) {
            ele.addClass('target');

            Df.box.stop().animate({
                scrollTop: ele.offset().top + amt,
            }, 666, function () {
                if (!amt) {
                    _scroll(ele, -99);
                }
                _.delay(function () {
                    ele.removeClass('target');
                }, 999);
            });
        }
    }

    function _bind(eles, toc) {
        if (U.debug()) {
            C.debug(name, '_bind', [eles, toc]);
        }

        var these, index;

        these = $(eles || '.content h5:visible');
        index = $(toc || '.content aside ul:visible');

        if (index.children().length) {
            return;
            throw new Error('indexed already');
        }

        these.each(function () {
            var me, id, ele;

            me = $(this);
            ele = $('<a>');

            // make id from initials
            id = me.text().match(/\b\w/g);
            id = '§' + id.join('');

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
        scroll: _scroll,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    use hash bang to distinguish data requests

    incorp goodies from sibos
        fixed posi

*/
