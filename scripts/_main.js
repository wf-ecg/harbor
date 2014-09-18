/*jslint white:false, evil:true */
/*globals _, C, W, Glob, Util, jQuery,
        Anchor, Extract, Floater, Projector, Test, routie, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html;

    Df = { // DEFAULTS
        current: '',
        projector: null,
        inits: function () {
            body = $('body');
            html = $('html');
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    // func to contextualize content

    function capitalize(str) {
        var a = str.charAt(0).toUpperCase();
        var b = str.slice(1);
        return a + b;
    }

    function classifyCB(nom) {
        return function (oldDom) {
            if (U.debug(2)) {
                C.debug(name, 'classifyCB', nom);
            }

            oldDom.hide();
            body.removeClass('page ' + Df.current);

            if (nom === 'home') { // add class for page type
                body.addClass('home');
            } else {
                body.addClass('page ' + nom);
            }

            Floater.jump('#Body');
            body.find('.content').slideDown(); // reveal again

            if (nom === 'glossary') {
                Floater.bind();
            }

            Anchor.write(nom); // force url update?
            Df.current = nom;
        };
    }

    // func to deliver content
    function runExtractor(docnom) {
        if (body.is('.' + docnom)) { // prevent unneeded calls
            return;
        }
        if (U.debug()) {
            C.debug(name, 'runExtractor', docnom);
        }
        Extract.page('' + docnom + '.html', classifyCB(docnom)); // do not drill down to 'pages'
        W.document.title = 'Harbor Risk | ' + capitalize(docnom);
    }

    function bindExtractor() {
        Extract.init();
        var loc = $.parseUrl(W.location.href);

        if (loc.filename) {
            var ext = loc.filename.match(/\w+/).toString();
            ext = '#!' + (ext === 'index' ? 'home' : ext);
            W.location.href = loc.directory + ext;
        }

        // func to triage event
        function extractEvtHref(evt) {
            var url, doc;

            url = evt.target.attributes.getNamedItem('href').value; // extract link
            doc = Anchor.docFromHash(url);

            function isInternal(url) {
                var ext = /^(http|\/\/)/.exec(url);
                return !ext;
            }

            if (doc.charAt(0) !== '#') {

                if (isInternal(url)) { // load instead of open
                    evt.preventDefault();
                    runExtractor(doc);
                } else {
                    evt.target.setAttribute('target', 'external');
                }
            }
        }

        $('body').on('click', 'a', function (evt) {
            extractEvtHref(evt);
        }).on('extract', function (evt, str) {
            runExtractor(str, evt); // evt is unused
        });
    }

    function bindProjector() {
        Df.projector = Projector.attach('.iS-port');

        if (html.is('.dev')) { // stop annoying slideshow
            Df.projector.toggle();
        }
    }

    function fillin(src, sel) {
        var part = src.find(sel);

        body.find(sel).replaceWith(part);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function bindParts() {
        new G.Fetch('_parts.html', function (page) {

            var parts = $(page.body); // attach standard parts

            fillin(parts, 'header');
            fillin(parts, 'section.slideshow');
            fillin(parts, 'footer');
            fillin(parts, 'nav.sub-bot');

            bindProjector();
        });
    }

    function bindings() {
        Anchor.init();
        Binders.init();

        bindExtractor();
        bindParts();

        routie(':page', function (arg) {
            if (U.debug()) {
                C.debug(name, 'routie', arg, this);
            }

            arg = Anchor.read(arg);
            runExtractor(arg); // auto retore from hash

        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        C.info('Main inited @ ' + Date() + ' debug:', W.debug, self.mode);

        _.delay(bindings);
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        mode: eval(U.testrict),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
