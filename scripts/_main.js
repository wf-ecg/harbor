/*jslint es5:true, white:false */
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
                Floater.jump('#Body');
            } else {
                body.addClass('page ' + nom);
                Floater.jump('#Body');
            }

            body.find('.content').slideDown(); // reveal again
            Anchor.write(nom);
        };
    }

    // func to deliver content
    function runExtractor(docnom) {
        if (body.is('.' + docnom)) {
            return;
        }
        if (U.debug()) {
            C.debug(name, 'runExtractor', docnom);
        }
        Extract.page('pages/' + docnom + '.html', classify(docnom));
    }

    function bindExtractor() {
        Extract.init();

        // func to triage event
        $('body').on('click', 'a', function (evt) {
            var url, doc;

            url = this.attributes.getNamedItem('href').value;
            doc = url.split(/\.|\/\#!/);

            // refers to document or hash?
            doc = doc[1] ? doc[0] || doc[1] : '#';

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

    function bindTests() {
        Tests.init();
        Tests.bind();
    }

    function bindings() {
        Anchor.init();

        bindProjector();
        bindExtractor();

        routie(':page', function (arg) {
            if (U.debug()) {
                C.debug(name, 'routie', arg, this);
            }

            arg = Anchor.read(arg);
            runExtractor(arg); // auto retore from hash

            if (arg === 'glossary') {
                Floater.bind();
            }
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
