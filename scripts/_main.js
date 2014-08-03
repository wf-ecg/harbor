/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Anchor, Extract, Projector, */
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
    function classify(doc) {
        body.find('.content').slideUp(0); // hide old content

        return function () {
            C.debug(name, 'classify', doc);

            body.removeClass();

            if (doc === 'home') { // add class for page type
                body.addClass('home');
            } else {
                body.addClass('page ' + doc);
            }
            body.find('.content').slideDown(); // reveal again
            Anchor.write(doc);
        };
    }

    // func to deliver content
    function runExtractor(doc) {
        Extract.page(doc + '.html', classify(doc));
    }

    function bindExtractor() {
        var hash = Anchor.read() || 'home';

        runExtractor(hash); // auto retore from hash

        // func to triage event
        $('body').on('click', 'a', function (evt) {
            var url = this.attributes.getNamedItem('href').value;
            var doc = url.split('.');

            // refers to document or hash?
            doc = doc[1] ? doc[0] : '#';

            function isInternal(url) {
                var ext = /^(http|\/\/)/.exec(url);
                return !ext;
            }

            if (doc.charAt(0) !== '#') {

                if (isInternal(url)) {
                    evt.preventDefault();
                    // load instead of open
                    runExtractor(doc);
                } else {
                    this.setAttribute('target', 'external');
                }
            }
        });
    }

    function bindProjector() {
        if (body.is('.home')) {
            Df.projector = Projector.attach('._projector');

            if (html.is('.dev')) {
                Df.projector.toggle();
            }
        }
    }

    function bindFloater(delay) {
        routie('glossary', Floater.bind);

        if (delay) {
            return _.delay(bindFloater);
        }
        if (body.is('.glossary')) {
            Floater.bind('.content h5:visible','.content aside ul:visible');
        }
    }

    function bindings() {
        Anchor.init();
        Extract.init();
        bindFloater();
        bindProjector();
        bindExtractor();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

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
