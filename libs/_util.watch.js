/*jslint white:false */
/*globals _, C, W, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function Watcher(testFn, doneFn, interval) {
    interval = interval || 500;
    doneFn = doneFn || this._done;
    testFn = testFn || this._test;

    var self = this;

    function _run() {
        var out = testFn();
        self.runs++;
        if (out) {
            self.stop()[':fire'](out).tested = out;
        }
    }

    if (this instanceof Watcher) {
        this.runs = 0;
        this[':fire'] = function () {
            this.result = doneFn.apply(doneFn, arguments);
            delete this[':fire'];
            return this;
        };
        this.time = W.setInterval(_run, interval);
        W.setTimeout(_run);
        C.debug('Watching', this);
    } else {
        C.warn('invoking Watcher as constructor');
        return new Watcher(testFn, doneFn, interval);
    }
}
Watcher.prototype = {
    fire: function () {
        if (this[':fire']) {
            this[':fire'].apply(this, arguments);
        }
    },
    stop: function () {
        W.clearInterval(this.time);
        delete this.stop;
        return this;
    },
    _done: function () {
        return C.log('Watched', arguments) || 'default';
    },
    _test: function () {
        return !(Math.random() * 5 | 0);
    },
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
