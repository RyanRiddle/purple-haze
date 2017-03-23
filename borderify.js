function addCanvas() {
    var canvas = document.getElementById("purple-rain");
    if (!canvas) {
        canvas = document.createElement("canvas");
    }
    canvas.style.height = "100%";
    canvas.style.width = "100%";
    canvas.id = "purple-rain";
    canvas.style.zIndex = "10000";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";

    document.body.prepend(canvas);
    return canvas;
}

var isRain = true;

function makeItRain(canvas) {
    var canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = '#a157e8';
    var W = window.innerWidth;
    var H = window.innerHeight;
    var HEART = "💜";
    var hearts = [];

    function addHeart() {
        var x = Math.random() * W;
        var y = 0;
        hearts.push({"x": x, "y": y});
    }

    function moveHearts(hearts) {
        if (isRain) {
            canvasContext.clearRect(0, 0, W, H);
        }

        for (var i = 0; i < hearts.length; i++) {
            var delta = i % 2 ? 2 : 1;
            hearts[i].y += delta;
            var x = hearts[i].x;
            var y = hearts[i].y;
            canvasContext.fillText(HEART, x, y);
        }
    }

    function removeHearts(hearts) {
        return hearts.filter((h) => {
            return h.y < H;
        });
    }


    function animate() {
        addHeart();
        hearts = removeHearts(hearts);
        moveHearts(hearts);
        window.requestAnimationFrame(animate);
    }

    animate();
}

browser.runtime.onMessage.addListener(changeSetting);

function changeSetting () {
    isRain = !isRain;
}

var canvas = addCanvas();
window.setTimeout(function() {
    makeItRain(canvas);
}, 1000);
