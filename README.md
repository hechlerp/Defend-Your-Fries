#Defend Your Fries

[Defend Your Fries][ghpages]

[ghpages]: http://hechlerp.github.io

###On Entry

![start_page]

###Gameplay

![gameplay]

###Technical Details

- If a user wants to fling a hand into the air, a few things are required. The game needs to know when the play clicked and released the mouse, as well as the positions and object clicked. The first step is to determine whether your mousedown click actually grabbed one of the hand sprites. Because the sprites are not separate objects from the canvas, I needed to determine whether any of the "thieves" were close enough to the mouse click event to be grabbed.

        game.thieves.forEach( function(el) {
          if (
             e.offsetX < el.pos[0] + 10 &&
             e.offsetX > el.pos[0] - 60 &&
             e.offsetY > el.pos[1] - 30 &&
             e.offsetY < el.pos[1] + 30 &&
             el.grabbed === false
          ) {
            el.grabbed = true;
            
  The conditional continues below, but this snippet shows the rangefinding method for grabbing a sprite. The final part of the condition is critical, as it prevents you from grabbing two sprites at once. The grabbed quality is set to false again on release. I then needed to track the position and time of start and release. This is done through the mouseup and mouseout listeners, which are removed with the release function.
  
            var startPos = el.pos.slice(0);
            var timeGrabbed = Date.now();
            var release = function () {
              game.draggedThief = null;
              canvas.removeEventListener("mouseup", release);
              canvas.removeEventListener("mouseout", release);
              el.grabbed = false;
              var timeReleased = Date.now();
                el.vel[1] = (el.pos[1] - startPos[1])/(timeReleased - timeGrabbed) * 5;
                el.vel[0] = (el.pos[0] - startPos[0])/(timeReleased - timeGrabbed) * 5;
                if (el.pos[1] < game.ground) {
                  el.accel[1] = 0.3;
                } else {
                  el.vel[0] = el.runSpeed;
                }
              };
            canvas.addEventListener("mouseup", release);
            canvas.addEventListener("mouseout", release);
          }
        });

  The final closing braces are from the forEach and conditional in the first example. This snippet handles the logic for giving the sprites a release velocity and acceleration if they are released above the "ground". The timeRealeased function sets up a simple physics engine that is essential for gameplay.

###Features

- Users can fling hands in the air using click and drag.
- Gameplay controls are explained in modals.
- Points and health update dynamically.
- Reset button allows for easy restarts to games.

###To-do List

- [ ] Level up and upgrades
- [ ] Sprites and animations for upgrades







[start_page]: ./assets/images/start_page.png
[gameplay]: ./assets/images/gameplay.png
