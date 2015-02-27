/*jslint white:false */
/*globals W, Util */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//
// RequestAnimationFrame
//
window.W && W.Util && (Util.rafo = function (fnObj) {
    fnObj = fnObj || {};

    var rAF = 'equestAnimationFrame',
        name = 'Util.rafo',
        again, timer, runs = 1,
        U = this,
        noop = function () {};

    rAF = (W['r' + rAF] || W['mozR' + rAF] || W['webkitR' + rAF] || noop);

    function cb(nom) {
        if (fnObj[nom]) {
            fnObj[nom]();
        }
    }

    again = function () {
        if (timer === 'paused') {
            return;
        } else {
            W.clearTimeout(timer);
        }

        timer = W.setTimeout(function () {
            timer = 'paused';

            rAF(function () {
                runs += 1;
                timer = !rAF(again);

                cb('play');
            });
            cb('pause');
        }, 1e3);
        cb('always');

        rAF(again);
    };
    rAF(again); // kickoff
}) && Util.rafo();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
