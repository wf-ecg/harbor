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
        if (body.is('.' + doc)) {
            return;
        }

        return function (oldDom) {
            C.debug(name, 'classify', doc);

            oldDom.hide();
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
        Df.projector = Projector.attach('.iS-port');

        if (html.is('.dev')) {
            Df.projector.toggle();
        }
    }

    function bindings() {
        Anchor.init();
        Extract.init();

        routie('glossary', Floater.bind);

        bindProjector();
        bindExtractor();

        $('nav.sub-top').dblclick(function () {
            $(this).toggleClass('fixed shadow');
        })
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
