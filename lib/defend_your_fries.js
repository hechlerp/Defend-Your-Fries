var Game = require("./game");
var GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  var ctx = canvas.getContext("2d");


  game = new Game(ctx, canvas);



  canvas.addEventListener("mousedown", function (e) {
    game.thieves.forEach( function(el) {
      if (
         e.offsetX < el.pos[0] + 10 &&
         e.offsetX > el.pos[0] - 60 &&
         e.offsetY > el.pos[1] - 30 &&
         e.offsetY < el.pos[1] + 30 &&
         el.grabbed === false
      ) {
        el.grabbed = true;
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
  });
  new GameView(game, ctx).start();


});
