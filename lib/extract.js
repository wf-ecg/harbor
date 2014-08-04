/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, Mobile, Page, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Extract',
        self = new G.constructor(name, '(page parser and storage)'),
        Df, DOMparts, SRCcache;

    Df = { // DEFAULTS
        recent: null,
        point: 'section.content',
        container: '.content',
        DOMparts: DOMparts = {},
        SRCcache: SRCcache = {},
        inits: function () {
            this.point = $(this.point).first();
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function callback() {
        C.debug.apply(C, [name, 'generic callback'].concat(arguments));
    }

    function addParts(page) {
        var parts = $(page.body).scout(Df.container).children();
        // this will only parse the children of top elements [html/body/head]
        DOMparts[page.url].append(parts);
        return parts;
    }

    function fetchSource(url, cb) {
        if (U.debug(2)) {
            C.debug(name, 'fetchSource', url);
        }
        SRCcache[url] = new G.Fetch(url, function (fetch) {
            addParts(fetch);
            cb();
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _extract(url, cb) {
        var newDom, oldDom;

        newDom = DOMparts[url]; // in cache?
        oldDom = Df.point.children();

        cb = cb || callback;

        if (!newDom) { // never loaded
            newDom = $('<div>');
            fetchSource(url, function () { // start running
                cb(oldDom);
            });
            DOMparts[url] = newDom.appendTo(Df.point); // add dom pointer
        } else {
            cb(oldDom);
        }
        newDom.show();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        // extend jquery
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };
    }

    $.extend(self, {
        __: Df,
        init: _init,
        page: _extract,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
