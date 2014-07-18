/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (U) {
    var name = 'timeline',
        I = Object.create(null);

    function Trivent(time, side, icon) {
        this.time = (time || 55) % 91;
        this.side = side || 'top';
        this.icon = icon || 'goal';
    }

    function Px(n) {
        return (n | 0) + 'px';
    }

    function Pc(n) {
        return (n | 0) + '%';
    }

    U[name] = $.extend(I, {
        defs: {
            cache: $(),
            h: 0,
            w: 0,
        },
        bar: 'table',
        data: null,
        div: '.timeline .events',
        wrap: '',
        addEvent: function (tv) { // trivent [time, icon, side]
            var icon, point, set, off, pol;
            tv = tv || [];

            if (tv.constructor !== Trivent) {
                tv = new Trivent(tv[0], tv[1], tv[2]);
            }
            off = this.h / 2;
            pol = (tv.side === 'top') ? - 1 - off : off; // -1px fixer??
            point = $('<div>').addClass('trivent').attr('data-time', tv.time);
            icon = point.clone();
            set = icon.add(point);

            point.css({
                left: Pc(9),
                top: Px(pol + off),
            }).appendTo(this.div).addClass('point');

            icon.css({
                backgroundColor: Data.lookup(tv.icon),
                color: tv.icon,
                left: Pc(9),
                top: Px(2 * pol + off),
            }).appendTo(this.wrap).addClass(tv.icon);

            // new call stack
            U.delay(0, function () {
                I.moveEvent(tv.time, set.centerize());
            });
            this.cache = this.cache.add(set);
        },
        moveEvent: function (time, eles) {
            eles.css({
                left: Pc(this.timeTpc(time)),
            });
        },
        measureBar: function () {
            this.w = this.bar.outerWidth();
            this.h = this.bar.outerHeight();
            this.m = this.w / 10; // figure 10% margins
            this.w -= this.m * 2; // inner cells
            return [this.w, this.h];
        },
        timeTpc: function (time) {
            //             factor in lead and tail
            return this.adjustpc(time / 90 * 100);
        },
        pxTpc: function (px) {
            px = px || 0;
            return (px / this.w * 100) | 0;
        },
        pcTpx: function (pc) {
            pc = pc || 100;
            return (this.w * pc / 100) | 0;
        },
        adjustpx: function (num) {
            num *= 0.8; // remove lead and tail (10%)
            num += this.m;
            return num;
        },
        adjustpc: function (num) {
            num *= 0.8; // remove lead and tail (10%)
            num += 10;
            return num;
        },
        reset: function (data) {
            this.cache.remove();
            this.load(data || this.data);
        },
        load: function (arr) {
            this.data = arr;

            $.extend(this, this.defs);
            this.measureBar();

            $.each(arr, function () {
                I.addEvent(this);
            });
        },
        init: function (data) {
            if (this.inited) {
                this.reset(data);
            } else {
                this.inited = true;
                data = data || this.data;

                this.div = $(this.div).click(function () {
                    I.reset();
                });
                this.bar = this.div.find(this.bar);
                this.wrap = this.div.parent();
                this.load(data);

                C.debug([name, I]);
            }
        },
    });

}(Utils));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


*/
