/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller, Projector, */
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

    function classify(name) {
        body.find('.content').slideUp(0);

        return function () {
            body.removeClass();

            if (name === 'home') {
                body.addClass('home');
            } else {
                body.addClass('page ' + name);
            }
            body.find('.content').slideDown();
        };
    }

    function bindExtractor() {
        var hash = Anchor.read() || 'home';

        Extract.page( hash + '.html', classify(hash));

        $('body').on('click', 'a', function (evt) {
            var page = this.attributes.getNamedItem('href').value;
            var name = page.split('.');

            name = name[1] ? name[0] : '#';

            if (name.charAt(0) === '#') {
                return;
            } else {
                Anchor.write(name);
            }

            // for internal pages
            if (!/^(http|\/\/)/.exec(page)) {
                evt.preventDefault();
                Extract.page(page, classify(name));
            } else {
                this.setAttribute('target', 'external');
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

    function bindings() {
        Anchor.init();
        Extract.init();
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

function foo(me, evt) {
    console.log(me, evt);
    $(me).find('a').removeClass('active');
    $(evt.target).addClass('active');
}
