/*jslint white:false */
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
        if (U.debug(2)) {
            C.debug.apply(C, [name, 'generic callback'].concat(arguments));
        }
    }

    function addParts(page, find) {
        var parts = $(page.body).filterAll(find).children();
        // this will only parse the children of top elements [html/body/head]
        DOMparts[page.url].append(parts);
        return parts;
    }

    function srcFocus(page) {
        if (!page.body) {
            page.body = '<section class="content"><h4>try another link</h4><h2>Page Not Found</h2><section>';
        }
//        page.body = page.body.replace(/\.\.\//g, './'); // adjust for depth
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function fetchSource(url, cb) {
        if (U.debug(2)) {
            C.debug(name, 'fetchSource', url);
        }
        SRCcache[url] = new G.Fetch(url, function (fetch) {
            srcFocus(fetch);
            addParts(fetch, Df.container);
            cb();
        });
    }

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
        return newDom.show();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
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