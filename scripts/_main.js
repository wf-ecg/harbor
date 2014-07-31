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

    function bindExtractor() {
        Extract.init();

        $('body').on('click', 'a', function (evt) {
            var page = this.attributes.getNamedItem('href').value;
            var name = page.split('.')[0];

            // for internal pages
            if (!/^(http|\/\/)/.exec(page)) {
                evt.preventDefault();

                Extract.page(page, function () {
                    body.removeClass();
                    if (name === 'home') {
                        body.addClass('home');
                    } else {
                        body.addClass('page ' + name);
                    }
                });
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
        bindExtractor();
        bindProjector();
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
