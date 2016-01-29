;
(function () {

    'use strict';

    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }

    addEventListener("scroll", function () {
        var height = findPos(document.getElementById("az-tabs-section"));
        if (document.body.scrollTop > height - 60) {
            document.getElementById("az-header").style.position = "fixed";
            document.getElementById("az-header").style.top = 0;
            document.getElementsByClassName("glass")[0].style.backfaceVisibility = "false";
        } else {
            document.getElementById("az-header").style.position = "";
        }
    });

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
                //                mobileBody.bind('touchmove', function (e) {
                //                    e.preventDefault()
                //                });
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
                //                mobileBody.unbind('touchmove');
                classie.remove(body, 'stop-scrolling');
            });

        });

    }

    init();

})();