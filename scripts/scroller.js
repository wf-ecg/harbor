/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        speed: 7777, /* auto advance */
        iscroll: {
            indicators: [{
                el: null, /* later */
                resize: false,
                interactive: true,
            }],
            keyBindings: false,
            eventPassthrough: false,
            momentum: true,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: 999,
        },
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only

    Scroller.wrap = function () {};

    function scrollNext(scroller) {
        if (U.debug(2)) {
            C.debug(name, 'scrollNext', scroller);
        }
        var ln, pg;

        ln = scroller.pages.length;
        pg = (1 + scroller.currentPage.pageX) % ln;
        scroller._execEvent('beforeScrollStart'); // polyfill event

        _.delay( function () {
            scroller.goToPage(pg, 0);
            scroller._execEvent('scrollStart');
        }, Df.iscroll.snapSpeed);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    //  attach expand/contract/status events to items with _reveal

    function _autoScroll(scroller) {
        if (U.debug(2)) {
            C.debug(name, '_autoScroll', scroller);
        }
        var interva, indicat;

        if (!scroller.pages) {
            return;
        }

        interva = W.setInterval(function () {
            scrollNext(scroller);
        }, Df.speed);

        indicat = W.isIE ? scroller.indicator1 : scroller.indicators[0];

        $(indicat.wrapper) //
        .parent() //
        .one('click keypress touchend', function () {
            if (U.debug(2)) {
                C.debug(name, 'click keypress touchend', scroller);
            }
            $(this).find('.control').trigger('toggle');
        });
        return interva;
    }

    function _attachPort(viewSelector) {
        self.init();
        if (U.debug(2)) {
            C.debug(name, '_attachPort viewSelector:', viewSelector);
        }
        var viewPort, gauge, scroller;

        viewPort = $(viewSelector);
        gauge = viewPort.find('.iS-proxy');

        gauge.on('mouseup touchend click', function (evt) {
            var cds;
            cds = {
                t: $(evt.target),
                x: evt.offsetX,
                y: evt.offsetY,
                w: gauge.innerWidth(),
                l: scroller.pages.length,
                calc: function () {
                    if (!cds.t.is(gauge)) {
                        scroller._execEvent('scrollEnd');
                        cds.x += cds.t.position().left;
                    }
                    cds.p = (cds.x / cds.w * cds.l) | 0;
                    C.warn(cds);
                    return (cds.p);
                },
            };
            if (!cds.x) { // touch device has no offsetX?
                evt.preventDefault();
                gauge.trigger('advance.' + name);
            } else {
                scroller.goToPage(cds.calc(), 0);
            }
        });

        gauge.on('advance.' + name, function () {
            scrollNext(scroller);
        });

        Df.iscroll.indicators[0].el = gauge.get(0);
        scroller = new IScroll(viewPort.get(0), Df.iscroll); //github.com/cubiq/iscroll

        scroller.on('scrollStart', function () {
            viewPort.addClass('scrolling');
        });
        scroller.on('scrollEnd', function () {
            viewPort.removeClass('scrolling');
        });
        scroller.on('flick', U.echoing('flick'));

        // store IScroll (internally and as data on wrapper)
        Df.all.push(scroller);
        viewPort.data(name, scroller);
        return scroller;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        attach: _attachPort,
        auto: _autoScroll,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
