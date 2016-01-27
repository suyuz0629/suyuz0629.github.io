/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;
(function () {

    'use strict';

    //    var modal = document.getElementById('myModal');
    //
    //    // Get the button that opens the modal
    //    var btn = document.getElementById("myBtn");
    //
    //    // Get the <span> element that closes the modal
    //    var span = document.getElementsByClassName("close")[0];
    //
    //    // When the user clicks on <span> (x), close the modal
    //    span.onclick = function () {
    //        modal.style.display = "none";
    //    }
    //
    //    // When the user clicks anywhere outside of the modal, close it
    //    window.onclick = function (event) {
    //        if (event.target == modal) {
    //            modal.style.display = "none";
    //        }
    //    }

    //    document.getElementById("effect-honey-twitter").addEventListener("click", function () {
    //        modal.style.display = "block";
    //    });

    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }

    //    addEventListener("load", function () {
    //        var links = document.getElementsByTagName("a");
    //        for (var i = 0; i < links.length; i++) {
    //            links[i].addEventListener("click", function (e) {
    //                //prevent event action
    //                e.preventDefault();
    //            })
    //        }
    //    });
    addEventListener("load", function () {
        //        document.getElementById("az-header").style.display = "none";
        //        var height = findPos(document.getElementById("az-tabs-section"));
        //        if (document.getElementById("az-header").style.top !== height + "px") {
        //            document.getElementById("az-header").style.top = height + "px";
        //        }
    });
    addEventListener("scroll", function () {
        var height = findPos(document.getElementById("az-tabs-section"));
        if (document.body.scrollTop > height - 60) {
            document.getElementById("az-header").style.position = "fixed";
            document.getElementById("az-header").style.top = 0;
            document.getElementsByClassName("glass")[0].style.backfaceVisibility = "false";
        } else {
            document.getElementById("az-header").style.position = "";
        }
        //        console.log(document.getElementsByClassName("glass")[0].style);
    });

})();