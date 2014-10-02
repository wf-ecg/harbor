/*jslint white:false, evil:true */
/*globals _, C, W, Glob, Util, jQuery,
        Anchor, Binders, Extract, Floater, Projector, Test, routie, */
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
    }

    function bindExtractor() {
        Extract.init();
        var loc = $.parseUrl(W.location.href), ext = loc.hashbang;

        if (loc.filename) {
            ext = loc.filename.match(/\w+/).toString();
            ext = '#!' + (loc.hashbang || (ext === 'index' ? 'home' : ext));
            ext = 'index.html' + ext;
            W.location.href = loc.directory + ext;
        } else if (!loc.hashbang) {
            W.location.href = loc.directory + '#!home';
        }

        // func to triage event
        function extractEvtHref(evt) {
            var url, doc;

            url = evt.currentTarget.attributes.getNamedItem('href').value; // extract link
            doc = Anchor.docFromHash(url);

            function isInternal(url) {
                var ext = /^(mailto|http|\/\/)/.exec(url);
                return !ext;
            }

            if (doc.charAt(0) !== '#') {

                if (isInternal(url)) { // load instead of open
                    evt.preventDefault();
                    runExtractor(doc);
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

    function bindMisc() {
        $('body').on('click', function (evt) {
            if (!W.isIE && $(evt.toElement).is(this)) {
                $('#Flood').toggleClass('blur');
            }
        });

        $('.content').on('click', '.dropdown', function (evt) {
            var me = $(this).next();

            me.toggle('fast', function () {
                if (me.css('display') !== 'none') me.css({
                    display: 'inline-block',
                });
            });
        });
        // bind class follow to header parent to fix positioning
        $('#Wrap').on('inview', function (evt, vis, lr, tb) { // visi?, left+right, top+bottom
            var parent = $('#Body');

            if (U.debug(2)) {
                C.debug(name, 'bindMisc', vis, lr, tb, [evt]);
            }
            if (tb === 'bottom') {
                parent.addClass('follow');
            } else {
                parent.removeClass('follow');
            }
        });
    }

    function bindSearch() {
        var cx, gcse, s;
        cx = '006146512309439838370:zwrrqyaixxi';

        gcse = W.document.createElement('script');
        gcse.async = true;
        gcse.src = '//www.google.com/cse/cse.js?cx=' + cx;
        gcse.type = 'text/javascript';

        s = W.document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function fetchParts(cb) {
        return new G.Fetch('__parts.html', function (page) {

            var parts = $(page.body); // attach standard parts

            fillin(parts, 'header');
            fillin(parts, 'section.slideshow');
            fillin(parts, 'footer');
            fillin(parts, 'nav.sub-bot');

            if (cb) {
                cb();
            }
        });
    }

    function bindings() {
        Anchor.init();

        bindMisc();
        bindSearch();
        bindExtractor();

        fetchParts(bindProjector);

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
