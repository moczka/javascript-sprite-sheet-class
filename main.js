window.addEventListener('load', onWindowLoad, false);

function onWindowLoad(){
    canvasApp();
}

function canvasApp(){
    
			//sets up game engine
		window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, FRAME_RATE);
			};
})();
    
    
    var mainCanvas = $('#mainCanvas'); 
    var pauseButton = $('#pauseLoop');
    var updateFPS = $('#updateFPS');
    var itemFPS = $('#itemFPS');
    
    var mainContext = mainCanvas.getContext('2d');
    var loopOn = true;
    var spriteObject = {
                        width: 110,
                        height: 102,
                        from: 0,
                        to: 15,
                        fps: 60,
                        numCol:4,
                        numRow:4,
                        speed:1
                        };
    var numberSprite = new SpriteSheet();
    numberSprite.setCanvas(mainCanvas);
    numberSprite.init('assets/sprites/numbers.png', spriteObject);
    
    var spriteObject3 = {
                        width: 250,
                        height: 125,
                        from: 0,
                        to: 7,
                        fps:60,
                        numCol:2,
                        numRow:4,
                        speed:18
                        };
    
    
    var catSprite = new SpriteSheet();
    catSprite.setCanvas(mainCanvas);
    catSprite.init('assets/sprites/runningcat.png', spriteObject3);
    
    console.log(catSprite.totalFrames);
    
    var spriteObject4 = {
                        width: 108,
                        height: 140,
                        from: 0,
                        to: 7,
                        fps:60,
                        numCol:8,
                        numRow:2,
                        speed:18
                        };
    
    var boySprite = new SpriteSheet();
    boySprite.setCanvas(mainCanvas);
    boySprite.init('assets/sprites/runningboy.png', spriteObject4);
    
    
    var spriteObject5 = {
                        width: 56,
                        height: 80,
                        from: 0,
                        to: 8,
                        fps:60,
                        numCol:3,
                        numRow:9,
                        speed:12,
                        loop: true,
                        };
    
    
    var foxSprite = new SpriteSheet();
    foxSprite.setCanvas(mainCanvas);
    foxSprite.init('assets/sprites/dancingfox.png', spriteObject5);
    
    //add listeners to modify the fps of each sprite animation or pause the game loop.
    mainCanvas.addEventListener('mousedown', onCanvasClick, false);
    pauseButton.addEventListener('mousedown', onPauseButton, false);
    updateFPS.addEventListener('mousedown', onUpdateFPS, false);
    
    //objects for collision purposes, not actually needed for sprite animation whatsoever.
    var object1 = {x: 50, y: 200, width:numberSprite.width, height: numberSprite.height};
    var object2 = {x:360, y: 150, width:catSprite.width, height: catSprite.height};
    var object3 = {x:230, y:150, width: boySprite.width, height: boySprite.height};
    var object4 = {x:700, y:150, width: foxSprite.width, height: foxSprite.height};
    var spriteSelected = '';
    
    var mouse = {x:0, y:0, width:2, height:2};
    
    //initiates loop
    gameLoop();
    
    function drawCanvas(){
        
        mainContext.clearRect(0,0,mainCanvas.width, mainCanvas.height);
        
       numberSprite.play(50, 200);       
        catSprite.play(360, 150);
        boySprite.play(230,150);
        foxSprite.play(700,150);
    
    }
    
    
    
    function gameLoop(){
        if(loopOn){
         requestAnimFrame(gameLoop);
         drawCanvas();
        }
    }
    
    function onPauseButton(e){
        var target = e.target; 
        
        loopOn = !loopOn;
        gameLoop();
        
        if(!loopOn){
          target.innerHTML = "Start";
        }else{
          target.innerHTML = "Pause";   
        }
        
    }
    
    
    function onCanvasClick(e){
        mouse.x = e.clientX - mainCanvas.getBoundingClientRect().left;
        mouse.y = e.clientY - mainCanvas.getBoundingClientRect().top;
        
        if(hitTest(mouse, object1)){
           itemFPS.value = numberSprite.speed;
            spriteSelected = 'numbers';
           }
        else if(hitTest(mouse, object2)){
           itemFPS.value = catSprite.speed;  
            spriteSelected = 'cat';
        }
         else if(hitTest(mouse, object3)){
           itemFPS.value = boySprite.speed;  
             spriteSelected = 'boy';
        }
         else if(hitTest(mouse, object4)){
           itemFPS.value = foxSprite.speed;  
             spriteSelected = 'fox';
        }
    }
    
    function onUpdateFPS(){
        switch(spriteSelected){
            case 'numbers':
                numberSprite.setSpeed(itemFPS.value);
                break;
            case 'boy':
                boySprite.setSpeed(itemFPS.value);
                break;
            case 'cat':
                catSprite.setSpeed(itemFPS.value);
                break;
            case 'fox':
                foxSprite.setSpeed(itemFPS.value);
                break;  
        }
        
    }
    
    
    function hitTest(object1, object2){
   		var left1 = object1.x;
   		var left2 = object2.x;
   		var right1 = object1.x + object1.width;
   		var right2 = object2.x + object2.width;
   		var top1 = object1.y;
   		var top2 = object2.y;
   		var bottom1 = object1.y + object1.height;
   		var bottom2 = object2.y + object2.height;

   		if (bottom1 < top2) return(false);
   		if (top1 > bottom2) return(false);
   		if (right1 < left2) return(false);
   		if (left1 > right2) return(false);
   		return(true);
	}
    
    
    
    
    function SpriteSheet(){
        this.width;
        this.height;
        this.x;
        this.y;
        this.context;
        this.canvasHeight;
        this.canvasWidth;
        this.speed;
        this.numCol;
        this.numRow;
        this.src;
        this.currentFrame;
        this.finalFrame;
        this.startFrame;
        this.totalFrames;
        this.appFPS;
        this.loop = true;
        
        var frames = [];
        var sprite;
        var frameIncrement;
        var frameIndex;
        
        var self = this;
        this.setCanvas = function(canvas){
            self.context = canvas.getContext('2d');
            self.canvasHeight = canvas.height;
            self.canvasWidth = canvas.width;
        };
        this.init = function(source, spriteObject, loadHandler){
            //sets up the source of the spriteSheet and adds a load listener if a handler was passed in.
            sprite = new Image();
            sprite.src = source;
            self.src = source;
            
            //adds the load handler for your app - game.
            if(loadHandler != undefined){
                sprite.addEventListener('load', loadHandler, false);
            }
            
            //sets up sprite properties from the spritesheet info object being passed in.
            self.width = spriteObject.width || 32;
            self.height = spriteObject.height || 32;
            self.numCol = spriteObject.numCol || 1;
            self.numRow = spriteObject.numRow || 1;
            self.startFrame = spriteObject.from || 0;
            self.finalFrame = spriteObject.to || 0;
            self.speed = spriteObject.speed || 15;
            self.totalFrames = spriteObject.numCol * spriteObject.numRow - 1;
            self.loop = (spriteObject.loop != undefined)? spriteObject.loop: true;
            self.appFPS = spriteObject.fps;
            
            //creates the decimal of increment for each second
            frameIncrement = self.speed/spriteObject.fps;
            frameIndex = self.startFrame;        
            
            //creates a variable holding the length of the array holding the frames
            var totalFramesLength = spriteObject.numCol * spriteObject.numRow;
            
            for(var i = 0; i < totalFramesLength; i++){
                var frame = {regX:0, regY:0};
                
                //indexes the regX and regY points of each sprite frame into the array.
                if(i>=self.numCol){
                    frame.regX = (i - Math.floor(i/self.numCol)*self.numCol)*self.width;
                    frame.regY = Math.floor(i/self.numCol)*self.height;
                }else{
                    frame.regX = i * self.width;
                    frame.regY = 0;
                }
                
                //pushes the objects with the regX and regY for each frame into a frame array.
                frames.push(frame);
                
            }
              
        };
        
        //use this method to locate or move the sprite sheet to a cordinate
        this.play = function(x, y){
            self.x = x;
            self.y = y;

            //no animation will be playeed if the starting frame is equal to the final frame.
            if(self.startFrame === self.finalFrame){
               
                self.currentFrame = frames[self.startFrame];
                self.context.drawImage(sprite, self.currentFrame.regX, self.currentFrame.regY, self.width, self.height, self.x, self.y, self.width, self.height);
                
            }else{
    
                //increments the frameIndex by a decimal, this will be floored because it is used to find an item in the frame array.
                frameIndex += frameIncrement;
                
                if(frameIndex >= self.finalFrame + 1){
                    frameIndex = (self.loop)? self.startFrame: self.finalFrame;
                }
                
                //floors the current index to a whole number so to find an object in the frame array
                self.currentFrame = frames[Math.floor(frameIndex)];
               
                //surrounds the sprite into a white block for debugging purposes, you can remove this in your final app
                self.context.strokeStyle = '#FFFFFF';
                self.context.strokeRect(self.x, self.y, self.width, self.height);
                //draws the section of the image given the regX and regY as well as the width and height
                self.context.drawImage(sprite, self.currentFrame.regX, self.currentFrame.regY, self.width, self.height, self.x, self.y, self.width, self.height); 
            } 
        };
        
        //use this method to change the fps speed of your sprite sheet animation
        this.setSpeed = function(speed){
            //reason why a method for this is needed is because there is  math to be done when speed is changed.
          self.speed = speed || self.speed;
            frameIncrement = self.speed / self.appFPS;
            frameIndex = self.startFrame;   
        };
        
                                       
    }    
    
function $(selector){
 return document.querySelector(selector);   
    
}
//end of canvas app    
}

