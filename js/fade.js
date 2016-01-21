;
(function () {
    new Slideshow(document.getElementById('az-slideshow'));

    /* Mockup responsiveness */
    var body = docElem = window.document.documentElement,
        header = document.getElementById('az-header'),
        mockup = header.querySelector('.az-mockup'),
        mockupWidth = mockup.offsetWidth;

    scaleMockup();

    function scaleMockup() {
        var wrapWidth = header.offsetWidth,
            val = wrapWidth / mockupWidth;

        mockup.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
        mockup.style.WebkitTransform = 'scale3d(' + val + ', ' + val + ', 1)';
    }

    window.addEventListener('resize', resizeHandler);

    function resizeHandler() {
        function delayed() {
            resize();
            resizeTimeout = null;
        }
        if (typeof resizeTimeout != 'undefined') {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(delayed, 50);
    }

    function resize() {
        scaleMockup();
    }

    var ie = (function () {
        var undef, rv = -1; // Return value assumes failure.
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());

    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function disable_scroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function enable_scroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    var docElem = window.document.documentElement,
        scrollVal = 0,
        isRevealed = false,
        noscroll = true,
        isAnimating = false,
        container = document.getElementById('az-container'),
        tabs = document.getElementById('az-tabs');

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }

    var first = true;
    var second = true;

    function scrollPage() {
        scrollVal = scrollY();

        if (first) {
            first = false;
            second = true;
        } else if (second) {
            if (window.innerWidth > 1000) {
                window.scrollTo(0, findPos(document.getElementById("az-name")));
            }
            second = false;
        }
        if (noscroll && !ie) {
            if (scrollVal < 0) return false;
            // keep it that way
        }

        if (classie.has(container, 'notrans')) {
            classie.remove(container, 'notrans');
            return false;
        }

        if (isAnimating) {
            return false;
        }

        if (scrollVal <= 0 && isRevealed) {
            toggle(0, scrollVal);
        } else if (scrollVal > 0 && !isRevealed) {
            toggle(1, scrollVal);
        }
        scrollVal = 0;
    }

    function toggle(reveal, value) {
        isAnimating = true;
        if (window.innerWidth > 1000) {
            disable_scroll();
        }
        if (reveal) {
            classie.add(container, 'modify');
            classie.add(tabs, 'modify');
        } else {
            noscroll = true;
            classie.remove(container, 'modify');
            classie.remove(tabs, 'modify');
        }
        isRevealed = !isRevealed;


        if (reveal) {
            noscroll = false;
        }

        if (window.innerWidth > 1000 && window.onwheel == preventDefault) {
            setTimeout(function () {

                enable_scroll();

            }, 1000);
        }
        isAnimating = false;
    }

    window.addEventListener('scroll', scrollPage);
})();