/*jslint es5:true, white:false */
/*globals _, C, W, ROOT, Global, jQuery,
        Util:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function ($) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(limited utils)'),
        U;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    U = {
        args: function () {
            return arguments;
        },
        arrg: function (args) {
            return Array.prototype.slice.apply(args);
        },
        debug: function (n) {
            return W.debug >= (n || 1);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], this.arrg(arguments));
        },
        echoing: function (arr) {
            arr = this.arrg(arguments);
            return function () {
                C.warn(arr);
            };
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     */
    U.shuffleArray = function (array) {
        var i, j, temp;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    // usage: log('inside coolFunc', this, arguments);
    // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    U.log = function () {
        U.log.history = U.log.history || [];
        U.log.history.push(arguments);
        if (W.console) {
            W.console.log(Array.prototype.slice.call(arguments));
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// POLYFILL

    // Object.create
    if (typeof Object.create !== 'function') {
        (function () {
            var F = function () {};
            Object.create = function (o) {
                if (arguments.length > 1) {
                    throw Error('Second argument not supported');
                }
                if (o === null) {
                    o = {}; //throw Error('Cannot set a null [[Prototype]]');
                }
                if (typeof o !== 'object') {
                    throw TypeError('Argument must be an object');
                }
                F.prototype = o;
                return new F();
            };
        }());
    }

    // Indexof IE8 polyfill
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }

            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }
            return -1;
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// JQUERY
    // <reify> take array of selector strings and replace each with page query
    $.reify = function (selarr) {
        $.each(selarr, function (i, e) {
            selarr[i] = $(e);
        });
    };
    // <toString> shorthand logging of element identity
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jq:[' + (out.join(', ') || '(empty)') + ']');
    };
    // <filterAll> find items at root query level and below
    $.fn.filterAll = function (sel) {
        return this.filter(sel).add(this.find(sel));
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _fixIE() {
        $('body').on('mouseover', '*', function (evt) {
            evt.stopPropagation();
            $(this).addClass('hover');
        }).on('mouseout', '*', function (evt) {
            evt.stopPropagation();
            $(this).removeClass('hover');
        });
    }

    W.isIE && _fixIE();

    $.extend(self, {
        testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
        fixIE: _fixIE,
    }, U);

    return self;
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
