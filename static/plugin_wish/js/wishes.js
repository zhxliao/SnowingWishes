// By morriswmz
// ==========================================================
// Important:
// Feel free to use it as long as you credit me and provide a link to this post
// ==========================================================

function snowing(message) {
    // shortcuts
    var persons=message.split('$-$'),
        someColor=new Array('green','red','yellow','blue','orange','purple');
    var howmany=persons.length,
        iter=0,
        numColor=someColor.length;
    var win = window,
        body = document.body,
        random = Math.random,
        createElement = function (tag) { return document.createElement(tag) },
        vendors = ['ms', 'moz', 'webkit'],
        canvasId = '__snowyMorris_',
        transformKey;

    if (win.__snowy__) {
        body.removeChild(document.getElementById(canvasId));
        delete win['__snowy__'];
        return;
    }
    win.__snowy__ = true;
    // shim
    var requestAnimationFrame = (function(){
    return win.requestAnimationFrame ||
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        function (callback){
            setTimeout(callback, 1000 / 60);
        };
    })();

    var canvas = createElement('div'),
        canvasStyle = canvas.style,
        flakes = [],
        fallenFlakes = [],
        t = 0;

    canvas.id = canvasId;
    canvasStyle.position = 'fixed';
    canvasStyle.zIndex = 65535;
    body.appendChild(canvas);

    // check transform prefix
    if (canvasStyle.transform) {
        transformKey = 'transform';
    } else {
        for (var i = 0;i < vendors.length;i++) {
            if (canvasStyle[vendors[i] + 'Transform'] != undefined) {
                transformKey = vendors[i] + 'Transform';
                break;
            }
        }
    }

    function createTranslateString(x, y) {
        return 'translate(' + x + "px," +y+"px)"; 
    }

    function addPx(x) {
        return x + 'px';
    }
    

    function emitNewFlake() {
        var newFlake = fallenFlakes.pop(),
            newSize = random() * 7 +3,
            element;
        if (!newFlake) {
            element = createElement('div');
            element.style.position = 'fixed';
            element.style.background = '#fff';
        
            if (random()>0.9){
            element.innerHTML='<span onmouseover="popup('+'\''+' '+persons[iter%howmany].split('@-@')[0]+'的祝福：'+  '<br/><br/>'+persons[iter%howmany].split('@-@')[1]+'<br/><br/>'+persons[iter%howmany].split('@-@')[2]+'\''+' );">'+persons[iter%howmany].split('@-@')[0]+'</span>';
            element.style.color=someColor[iter%numColor];
            iter+=1;
            }
            
            canvas.appendChild(element);
            newFlake = { e : element };
        } else {
            element = newFlake.e;
        }
        
        // reset position and velocity
        newFlake.x = random() * win.innerWidth;
        newFlake.y = -5;
        newFlake.vx = newFlake.vy = 0;

        // set style
        var style = element.style;
        style.width = style.height = addPx(newSize);
        style.borderRadius = addPx(newSize / 2);

        if (transformKey) {
            style.left = style.top = addPx(0);
            style[transformKey] = createTranslateString(newFlake.x, newFlake.y);
        } else {
            style.left = addPx(newFlake.x);
            style.top = addPx(0);
        }

        flakes.push(newFlake);
    }

    // mainloop
    function render() {
        if (!win.__snowy__) return;

        var currentFlake,
            tvx, theta, sint, cost, style;
        if (t%2 == 0) {
            for (var i = 0;i < flakes.length;i++) {
                currentFlake = flakes[i];
                
                // update with random walk
                currentFlake.vy += 9.8 / 30;          // is it acceleration of gravity
                currentFlake.vy *= 0.90;
                currentFlake.x += 0.5*currentFlake.vx;
                currentFlake.y += currentFlake.vy;
                theta = (random() - 0.52) * 3.14 / 12;
                sint = Math.sin(theta);
                cost = Math.cos(theta);
                tvx = currentFlake.vx;
                currentFlake.vx = tvx * cost - currentFlake.vy * sint;
                currentFlake.vy = tvx * sint + currentFlake.vy * cost;

                style = currentFlake.e.style;
                
                // remove fallen flakes
                if (currentFlake.x > win.innerWidth + 10 || currentFlake.x < -10 || currentFlake.y > window.innerHeight + 10 || currentFlake.y < -10) {
                    flakes.splice(i, 1);
                    if (transformKey) {
                        style[transformKey] = createTranslateString(-10, -10);
                    } else {
                        style.left = addPx(-999);
                    }
                    fallenFlakes.push(currentFlake);
                } else {

                    // apply new style
                    if (transformKey) {
                        style[transformKey] = createTranslateString(currentFlake.x, currentFlake.y);
                    } else {
                        style.left = addPx(currentFlake.x);
                        style.top = addPx(currentFlake.y);
                    }
                    
                }
            }
        }

        // emit new snow flakes
        if (t >= 30) {
            if (flakes.length < 100 || fallenFlakes.length < 2) {
                for (var k = 0; k < 8;k ++) emitNewFlake();
            }
            t = 0;
        } else {
            t++;
        }
        
        requestAnimationFrame(render);
    }
    render();
}



// http://www.queness.com/post/1696/create-a-beautiful-looking-custom-dialog-box-with-jquery-and-css3