(function () {

    var width, height, largeHeader, canvas, ctx, enterprise, stars, target, img, pat, mousePos, animateHeader = true;
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

        img = new Image();
        img.src = "../img/letter.png";
        stars = [];
        canvasInit();
        animate();
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function writeMessage(canvas, message) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
    }

    function canvasInit() {

        enterprise = new Enterprise();
        canvas.addEventListener('mousemove', function (evt) {
            mousePos = getMousePos(canvas, evt);
        }, false);

        // create stars

        for (var x = 0; x < width * 0.01; x++) {
            var c = new Star();
            stars.push(c);
        }
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
            if (enterprise.pos.x > width || enterprise.pos.y < 0 || enterprise.pos.y > height) {
                CleanupCachedCanvasses();
                canvasInit();
            }
            ctx.clearRect(0, 0, width, height);
            ctx.font = '80pt bold'; // curlz-mt';
            pat = ctx.createPattern(img, "repeat-x");
            ctx.fillStyle = pat;
            ctx.textAlign = "center";
            ctx.fillText('Allen Zeng', width / 2, height / 2);

            enterprise.fly();
            for (var i in stars) {
                stars[i].draws();
            }

        }
        requestAnimationFrame(animate);
    }

    function CleanupCachedCanvasses() {
        var delList = new Array();
        for (name in canvas) {
            delList.push(name);
        }
        for (i = 0; i < delList.length; i++) {
            delete canvas[delList[i]];
        }
        delete delList;
    }

    function Enterprise() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.image = new Image();
            _this.image.src = "../img/enterprise-normal.png";
            _this.reverse = new Image();
            _this.reverse.src = "../img/enterprise-reverse.png";
            _this.pos.x = 0; // - 10 * _this.image.width;
            _this.pos.y = height * Math.random();
            _this.xvelocity = 1.0 + Math.random() * 0.6;
            _this.yvelocity = 1.0 - Math.random() * 2.0;
            _this.widthRatio = 0.16;
            _this.heightRatio = 0.16;
        }

        _this.fly = function () {
            if (mousePos && mousePos.x && mousePos.x != _this.pos.x + _this.image.width * _this.widthRatio && mousePos.y != _this.pos.y + _this.image.height * _this.heightRatio / 2) {

                _this.newyVelocity = (mousePos.y - _this.pos.y - _this.image.height * _this.heightRatio / 2) / 100;
                ctx.save();
                _this.newxVelocity = (mousePos.x - _this.pos.x - _this.image.width * _this.widthRatio) / 100;
                _this.pos.x += _this.newxVelocity;
                _this.pos.y += _this.newyVelocity;
                ctx.translate(_this.pos.x + _this.image.width * _this.widthRatio, _this.pos.y + _this.image.height * _this.heightRatio / 2);
                ctx.rotate(Math.atan(_this.newyVelocity / _this.newxVelocity));
                ctx.translate(-(_this.pos.x + _this.image.width * _this.widthRatio), -(_this.pos.y + _this.image.height * _this.heightRatio / 2));

                if (mousePos.x >= _this.pos.x + _this.image.width * _this.widthRatio) {
                    ctx.drawImage(_this.image, _this.pos.x, _this.pos.y, _this.image.width * _this.widthRatio, _this.image.height * _this.heightRatio);
                } else {
                    ctx.drawImage(_this.reverse, _this.pos.x, _this.pos.y, _this.image.width * _this.widthRatio, _this.image.height * _this.heightRatio);
                }
            } else {
                _this.pos.x += _this.xvelocity;
                _this.pos.y += _this.yvelocity;
                ctx.save();
                ctx.translate(_this.pos.x, _this.pos.y);
                ctx.rotate(Math.atan(_this.yvelocity / _this.xvelocity));
                ctx.translate(-_this.pos.x, -_this.pos.y);

                ctx.drawImage(_this.image, _this.pos.x, _this.pos.y, _this.image.width * _this.widthRatio, _this.image.height * _this.heightRatio);
            }
            ctx.restore();

        }
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
            _this.velocity = 0.6 + Math.random() * 0.6;
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

        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
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
            }
            ctx.lineTo(_this.pos.x, _this.pos.y - _this.outerRadius);
            ctx.fillStyle = 'rgba(' + colors[_this.color] + _this.alpha + ')';
            ctx.fill();
            ctx.restore();
        }
    }

})();