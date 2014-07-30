/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, Mobile, Page, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Extract',
        self = new G.constructor(name, '(page parser and storage)'),
        Df;

    Df = { // DEFAULTS
        recent: null,
        point: 'section.content',
        extracts: {},
        sources: {},
        select: '.content',
        inits: function () {
            this.point = $(this.point).first();
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function callback() {
        C.debug.apply(C, [name, 'callback'].concat(arguments));
    }

    function takeSource(url, cb) {
        if (U.debug()) {
            C.debug(name, 'takeSource', url);
        }
        Df.sources[url] = new Page(url, cb || callback);
    }

    function append(page) {
        // this will only parse the children
        // of top elements [html/body/head]
        Df.recent = $(page.body).scout(Df.select).children();
        return Df.extracts[page.url].append(Df.recent);
    }

    // function scrub(jq) {
    //     var hold = $('<div>');          // make new bucket
    //     jq.children().appendTo(hold);   // move kids from old
    //     jq.empty();                     // rinse out dirty nodes
    //     jq.append(hold.children());     // bring back pure elements
    // }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _extract(url, cb) {
        var jq = Df.extracts[url]; // in cache?
        Df.point.children().hide();

        if (!jq) { // never loaded
            jq = $('<div>');
            Df.extracts[url] = jq.appendTo(Df.point);
            takeSource(url, append);
        }(cb || callback)(jq);
        jq.show();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(cb) {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        // extend jquery
        $.fn.scout = function (sel) {
            // find and/or filter
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
