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
        projector: null,
        inits: function () {
            body = $('body');
            html = $('html');
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    // func to contextualize content

    function classify(nom) {
        return function (oldDom) {
            if (U.debug(2)) {
                C.debug(name, 'classify', nom);
            }

            oldDom.hide();
            body.removeClass();

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
        Extract.page('' + docnom + '.html', classify(docnom)); // do not drill down to 'pages'
    }

    function bindExtractor() {
        Extract.init();

        // func to triage event
        $('body').on('click', 'a', function (evt) {
            var url, doc;

            url = this.attributes.getNamedItem('href').value; // extract link

            function getDocname(str) {
                var arr = str.split(/\/\#!|\.\/|\./); // split tokens
                // refers to document or hash?
                str = arr[1] ? arr[0] || arr[1] : '#';
                return str;
            }

            doc = getDocname(url);

            function isInternal(url) {
                var ext = /^(http|\/\/)/.exec(url);
                return !ext;
            }

            if (doc.charAt(0) !== '#') {

                if (isInternal(url)) { // load instead of open
                    evt.preventDefault();
                    runExtractor(doc);
                } else {
                    this.setAttribute('target', 'external');
                }
            }
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
    /// INTERNAL

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
        init: _init,
        mode: eval(U.testrict),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
