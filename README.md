# javascript-sprite-sheet-class
A custom made class to handle sprite sheets animations for HTML5 Javascript Canvas games. Sprite sheets used in this example were exported from Adobe flash and do not have any margin padding between frames.

IMPORTANT:
 Once you create an instance of the SpriteSheet class, you will need to pass in the source of the sprite sheet, an object with information regarding the width and height of each frame, the speed and so on. A third optional parameter can be passed which is the function in charged of loading items in your game or application.

HOW TO USE:

Create an instance of the SpriteSheet class. Before making use of this instance, you will need to call the setCanvas() method. Pass in the canvas (NOT THE CONTEXT) of the canvas where you want to draw your image on. Then, you will need to create a dynamic object holding necessary information of your sprite sheet such as width, height, animation speed of each frame that will be passed in the init() method. All the necessary properties of this object will be described below. You can create this object inside the init() function parameter or create it outside. 

The Sprite info object MUST include the following properties:

var spriteInfoObject = {
                        width: 110, <- width of each frame of the sprite sheet.
                        height: 102, <- height of each frame of the sprite sheet.
                        from: 0, <- starting frame of your desired animation
                        to: 15,   <— final frame you want to have animated.
                        fps: 60,  <— your game or app FPS.
                        numCol:4, <— number of columns of your sprite sheet. 
                        numRow:4, <- number of rows of your sprite sheet.
                        speed:1  <- speed in FPS that you want your animation to have.
			loop: false <- OPTIONAL: if you don’t want the animation to loop, 					set to false.
                        };

Each animation frame will be indexed inside of an array so when you want to set the starting frame, start counting from 0 on. 

The only EXCEPTION is when you declare the amount of rows and columns that your sprite sheet has in the sprite sheet info object, these must be counted starting at 1 because they represent the total length of the frame array and not its indexes. 

EXAMPLE: if your sprite sheet has 3 different images all next to one another forming one long row. You must declare that this sprite sheet has 3 columns, one for each image, and only one row.

The next step, is to call the init() method. The first parameter will be the source of the sprite sheet, the second parameter the sprite sheet info object we covered earlier and last a function that handles loading of your assets. This last parameter is optional.

FULL EXAMPLE: 

    var spriteInfoObject = {
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
    numberSprite.init('assets/sprites/numbers.png', spriteInfoObject);

   //IN YOUR DRAW METHOD OR FUNCTION CALL play(x, y) method.
  
   numberSprite.play(32, 520);





If you want to display only one frame, set the starting frame equal to the final frame. You can change the FPS speed of your sprite sheet animation by using the .setSpeed(speed) method. Please remember that the speed is always in FPS.

Check out all the examples here: 

 https://rawgit.com/moczka/javascript-sprite-sheet-class/master/main.html

PS: If you want to change the FPS of one of the animated sprites, tap/click on it and change the number in the field below. Then you can press “UPDATE” to render the changes.

