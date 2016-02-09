;
(function () {

    'use strict';


    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
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

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }

    function init() {

        var overlay = document.querySelector('.md-overlay');
        var body = document.querySelector('body');
        var mobileBody = document.getElementsByTagName('body');
		[].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {

            var modal = document.querySelector('#' + el.getAttribute('data-modal'));
            var close = modal.querySelector('.md-close');

            function removeModal(hasPerspective) {
                classie.remove(modal, 'md-show');

                if (hasPerspective) {
                    classie.remove(document.documentElement, 'md-perspective');
                }
            }

            function removeModalHandler() {
                removeModal(classie.has(el, 'md-setperspective'));
            }

            el.addEventListener('click', function (ev) {
                classie.add(modal, 'md-show');
                classie.add(body, 'stop-scrolling');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);

                if (classie.has(el, 'md-setperspective')) {
                    setTimeout(function () {
                        classie.add(document.documentElement, 'md-perspective');
                    }, 25);
                }
            });

            close.addEventListener('click', function (ev) {
                ev.stopPropagation();
                removeModalHandler();
                classie.remove(body, 'stop-scrolling');
            });

        });

    }


    var myself = document.getElementById('az-myself');
    var pros = document.getElementById('az-tabs-section');

    var awstab = document.getElementById('aws-tab');
    var setab = document.getElementById('search-engine-tab');
    var matab = document.getElementById('mobile-app-tab');
    var watab = document.getElementById('web-app-tab');

    var aws = document.getElementById('aws');
    var se = document.getElementById('search-engine');
    var ma = document.getElementById('mobile-app');
    var wa = document.getElementById('web-app');

    function showAndHideothers(aws, se, ma, wa) {
        aws.style.display = "block";
        se.style.display = "none";
        ma.style.display = "none";
        wa.style.display = "none";
    }

    function setTabColor(awstab, setab, matab, watab) {
        awstab.style.color = "#00bfff";
        awstab.style.backgroundColor = "white";
        awstab.style.borderRadius = "5px";
        awstab.style.opacity = 1;
        setab.style.color = "black";
        setab.style.backgroundColor = "";
        setab.style.opacity = 1;
        matab.style.color = "black";
        matab.style.backgroundColor = "";
        matab.style.opacity = 1;
        watab.style.color = "black";
        watab.style.backgroundColor = "";
        watab.style.opacity = 1;
    }
    showAndHideothers(aws, se, ma, wa);
    setTabColor(awstab, setab, matab, watab);
    awstab.addEventListener('click', function () {
        showAndHideothers(aws, se, ma, wa);
        setTabColor(awstab, setab, matab, watab);
    });
    setab.addEventListener('click', function () {
        showAndHideothers(se, aws, ma, wa);
        setTabColor(setab, awstab, matab, watab);
    });
    matab.addEventListener('click', function () {
        showAndHideothers(ma, se, aws, wa);
        setTabColor(matab, awstab, setab, watab);
    });
    watab.addEventListener('click', function () {
        showAndHideothers(wa, se, ma, aws);
        setTabColor(watab, awstab, setab, matab);
    });

    function setHeight(id, height) {
        document.getElementById(id).style.height = height + "px";
    }
    setHeight("az-myself", innerHeight + 60);
    setHeight("aws", innerHeight - 60);
    setHeight("search-engine", innerHeight - 60);
    setHeight("mobile-app", innerHeight - 60);
    setHeight("web-app", innerHeight - 60);
    window.addEventListener('mousewheel', function (e) {
        var direction = e.wheelDelta < 0 ? 'down' : 'up';
        var topPos = 0;
        var myselPos = findPos(myself);
        var proPos = findPos(pros);
        var cur = document.body.scrollTop;

        if (e.wheelDelta < 0) {
            e.preventDefault();
            disableScroll();
            if (cur < myselPos) {
                console.log("to my");
                pageScroll(5, myselPos);
                setTimeout(function () {
                    enableScroll();
                }, 1500);
            } else if (cur < proPos) {
                console.log("to pro");
                pageScroll(5, proPos);
                setTimeout(function () {
                    enableScroll();
                }, 1500);
            }
        } else if (e.wheelDelta > 0) {
            if (cur > myselPos) {
                disableScroll();
                e.preventDefault();
                pageScroll(-5, myselPos);
                setTimeout(function () {
                    enableScroll();
                }, 1500);
            } else if (cur > 0) {
                disableScroll();
                e.preventDefault();
                pageScroll(-5, 0);
                setTimeout(function () {
                    enableScroll();
                }, 1500);
            }
        }
    });

    function pageScroll(step, targetPos) {
        window.scrollBy(0, step);
        if (step > 0) {
            if (document.body.scrollTop < targetPos - 20) {
                setTimeout(function () {
                    pageScroll(step, targetPos)
                }, 1);
            } else {
                window.scrollTo(0, targetPos);
            }
        } else {
            if (document.body.scrollTop > targetPos + 20) {
                setTimeout(function () {
                    pageScroll(step, targetPos)
                }, 1);
            } else {
                window.scrollTo(0, targetPos);
            }
        }

    }

    init();

})();