(function () {

    var width, height, largeHeader, canvas, ctx, stars, target, animateHeader = true;
    var colors = [
        "193,69,164,", "0,172,230,", "121,253,250,"
    ];
    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: 0,
            y: height
        };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('header-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');



        // create stars
        stars = [];
        for (var x = 0; x < width * 0.2; x++) {
            var c = new Star();
            stars.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            ctx.font = '80pt zag';
            //            ctx.lineWidth = 0;
            var img = new Image();
            img.src = "img/bg.png";
            var pat = ctx.createPattern(img, "repeat");
            ctx.fillStyle = pat; //'#2dd3d3';
            ctx.textAlign = "center";
            ctx.fillText('Allen Zeng', width / 2, height / 2);
            for (var i in stars) {
                stars[i].draws();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Star() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 300;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = 0.2 + Math.random() * 0.6;
            //            _this.velocity = 0.2 + (Math.abs(_this.pos.x - width / 5) / width) * Math.random() * 0.8;
            //            _this.r = 255 - Math.floor(Math.random() * 250);
            //            _this.g = 255 - Math.floor(Math.random() * 250);
            //            _this.b = 255 - Math.floor(Math.random() * 250);
            _this.color = Math.floor(Math.random() * 10) % 3;
            _this.outerRadius = 20 * (0.1 + Math.random() * 0.5);
            _this.innerRadius = 10 * (0.1 + Math.random() * 0.5);
            _this.spikes = Math.floor((Math.random() * 10) + 1) % 3 + 4;
            _this.rotation = 0.5 + Math.random() * 0.5;
            _this.limit = 60 + Math.random() * 100;
        }
        //        console.log(_this.outerRadius + " " + _this.innerRadius);
        //        console.log(_this.r + " " + _this.g + " " + _this.b);
        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);

            //            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fillStyle = 'rgba(' + _this.r + ',' + _this.g + ',' + _this.b + ',' + _this.alpha + ')';
            ctx.fill();
        };

        this.draws = function () {
            if (_this.alpha <= 0) {
                init();
            }
            var step = Math.PI / _this.spikes;
            _this.pos.y -= _this.velocity;
            if (_this.pos.y < _this.limit) {
                _this.pos.y = height + Math.random() * 200;
            }
            var time = new Date();
            ctx.save();
            ctx.translate(_this.pos.x, _this.pos.y);
            _this.rotation = 10;
            ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + _this.rotation * ((2 * Math.PI) / 60000) * time.getMilliseconds());
            ctx.translate(-_this.pos.x, -_this.pos.y);
            ctx.beginPath();
            var rot = Math.PI / 2 * 3;
            ctx.moveTo(_this.pos.x, _this.pos.y - _this.outerRadius);
            for (i = 0; i < _this.spikes; i++) {
                cx = _this.pos.x + Math.cos(rot) * _this.outerRadius;
                cy = _this.pos.y + Math.sin(rot) * _this.outerRadius;
                ctx.lineTo(cx, cy);
                rot += step;

                cx = _this.pos.x + Math.cos(rot) * _this.innerRadius;
                cy = _this.pos.y + Math.sin(rot) * _this.innerRadius;
                ctx.lineTo(cx, cy);
                rot += step;
                //                console.log(i);
            }
            //            _this.rot += Math.PI / 2 * 36;
            //            ctx.rotate(Math.PI * 2 / 10);
            ctx.lineTo(_this.pos.x, _this.pos.y - _this.outerRadius);
            //            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fillStyle = 'rgba(' + colors[_this.color] + _this.alpha + ')';
            //            ctx.fillStyle = 'rgba(' + _this.r + ',' + _this.g + ',' + _this.b + ',' + _this.alpha + ')';
            ctx.fill();
            ctx.restore();
            // draw your object
            //            ctx.closePath();
        }
    }

})();