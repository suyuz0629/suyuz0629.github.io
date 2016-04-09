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
		[].slice.call(document.querySelectorAll('.az-md-trigger')).forEach(function (el, i) {

            var modal = document.querySelector('#' + el.getAttribute('data-modal'));
            var close = modal.querySelector('.az-md-close');

            function removeModal(hasPerspective) {
                classie.remove(modal, 'az-md-show');

                if (hasPerspective) {
                    classie.remove(document.documentElement, 'az-md-perspective');
                }
            }

            function removeModalHandler() {
                removeModal(classie.has(el, 'az-md-setperspective'));
            }

            el.addEventListener('click', function (ev) {
                classie.add(modal, 'az-md-show');
                classie.add(body, 'stop-scrolling');
                classie.add(body, 'stop-point');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);

                if (classie.has(el, 'az-md-setperspective')) {
                    setTimeout(function () {
                        classie.add(document.documentElement, 'az-md-perspective');
                    }, 25);
                }
            });

            close.addEventListener('click', function (ev) {
                ev.stopPropagation();
                removeModalHandler();
                classie.remove(body, 'stop-scrolling');
                classie.remove(body, 'stop-point');
            });

        });
        initMobile();
    }


    var myself = document.getElementById('az-myself');
    var pros = document.getElementById('az-tabs-section');

    var awstab = document.getElementById('aws-tab');
    var matab = document.getElementById('mobile-app-tab');

    var aws = document.getElementById('aws');
    var ma = document.getElementById('mobile-app');

    function showAndHideothers(aws, ma) {
        aws.style.display = "block";
        ma.style.display = "none";
    }

    function setTabColor(awstab, matab, color) {
        awstab.style.color = "#ffd700";
        awstab.style.backgroundColor = color;
        awstab.style.borderTopLeftRadius = "7px";
        awstab.style.borderTopRightRadius = "7px";
        awstab.style.opacity = 1;
        matab.style.color = "black";
        matab.style.backgroundColor = "";
        matab.style.opacity = 1;
    }
    showAndHideothers(aws, ma);
    setTabColor(awstab, matab, "#1c9b94");
    awstab.addEventListener('click', function () {
        showAndHideothers(aws, ma);
        setTabColor(awstab, matab, "#1c9b94");
    });
    matab.addEventListener('click', function () {
        showAndHideothers(ma, aws);
        setTabColor(matab, awstab, "#ffb6ae");
    });

    var currentImageInMobile = 0;
    var mobileDescription = {
        1: "This is the Map page",
        2: "This is the Menu panel",
        3: "This is the Login modal",
        4: "This is the Setting section",
        5: "This is the Menu panel after login"
    }

    function initMobile() {
        var left = document.getElementById('leftSign');
        var right = document.getElementById('rightSign');
        left.addEventListener('click', function () {
            currentImageInMobile--;
            currentImageInMobile += 5;
            currentImageInMobile %= 5;
            changeImage();
        });
        right.addEventListener('click', function () {
            currentImageInMobile++;
            currentImageInMobile %= 5;
            changeImage();
        });
    }

    function changeImage() {
        var image = document.getElementById('mobile-image');
        var description = document.getElementById('mobile-description')
        image.src = 'img/mobile/image' + (currentImageInMobile + 1) + '.png';
        description.innerHTML = mobileDescription[currentImageInMobile + 1];
    }

    init();

})();