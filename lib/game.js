var FryThief = require("./fry_thief");
var Fries = require("./fries");
var GameView = require("./game_view");

var Game = function (ctx, canvas) {
  this.thieves = [];
  this.fries = new Fries({pos: [800, 550]});
  this.ctx = ctx;
  this.rate = 200;
  this.draggedThief = null;
  this.ground = 550;
  this.displayedPoints = 0;
  this.pointIncrementRate = 0;
  this.points = 0;
};

Game.BG_COLOR = "#ccc";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.MAX_THIEVES = 10;



Game.prototype.maybeAddThieves = function () {
  if (this.thieves.length < Game.MAX_THIEVES) {
    var spawn = Math.random() * this.rate;
    if (spawn <= 1) {
      this.thieves.push(new FryThief({
        pos: [0, this.ground],
        vel: [Math.random() * 1.5 + 0.5,0],
        accel: [0,0],
        game: this,
      }));
    }
    if (this.rate > 50) {
      this.rate -= 0.05;
    }
  }
};

Game.prototype.drag = function (canvas, e) {
  if (this.draggedThief) {
    if (e.offsetX < 0) {
      this.draggedThief.pos[0] = 1;
    } else {
      this.draggedThief.pos[0] = e.offsetX;
    }
    this.draggedThief.pos[1] = e.offsetY ;
    this.draggedThief.vel[0] = 0;
    this.draggedThief.vel[1] = 0;
  }
};

Game.prototype.start = function () {
  this.lastTime = Date.now();
  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.addEventListener("mousemove", this.drag.bind(this, canvas));
  this.gameRunner();
};

Game.prototype.gameRunner = function () {
  var gameRunner = setInterval(function() {
    var timeDelta = Date.now() - this.lastTime;
    this.moveObjects(timeDelta, this.ctx);
    this.draw(this.ctx);
    this.lastTime = Date.now();
    this.maybeAddThieves();
    this.thieves.forEach( function (fryThief) {
      if (fryThief.grabbed) {
        this.draggedThief = fryThief;
      }
    }.bind(this));
    if (this.over()) {
      window.clearInterval(gameRunner);
      this.onlose();
    }

  }.bind(this), 20);

};

Game.prototype.reset = function () {
  this.fries.health = 1000;
  this.points = 0;
  this.pointIncrementRate = 0;
  this.rate = 200;
  this.thieves = [];
};


Game.prototype.remove = function (fryThief) {
  this.thieves.splice(this.thieves.indexOf(fryThief), 1);
  this.points += 30;
  this.pointIncrementRate += 3;
};

Game.prototype.isOutOfXBounds = function (posX) {
  return (posX < 0) || (posX > Game.DIM_X);
};

Game.prototype.allObjects = function () {
  return [].concat(this.fries, this.thieves);
};

Game.prototype.moveObjects = function (delta, ctx) {
  this.thieves.forEach( function (el) {
    el.move(delta, ctx);
    if (this.isOutOfXBounds(el.pos[0])) {
      el.vel[0] = -el.vel[0];
    }
  }.bind(this));
};

Game.prototype.draw = function (ctx) {
  this.incrementPoints.call(this, this.pointIncrementRate);
  ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "transparent";
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "#fff";
  ctx.font = "18px sans-serif";
  ctx.fillText(((this.displayedPoints) + " points"), 100, 30);
  this.allObjects().forEach( function(el) {
    el.draw(ctx);
  });
};



Game.prototype.over = function () {
  if (this.fries.health <= 0) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.incrementPoints = function (rate) {
  if (this.points > this.displayedPoints) {
    this.displayedPoints += rate;
    if (this.displayedPoints > this.points) {
      this.displayedPoints = this.points;
    }
  } else {
    this.pointIncrementRate = 0;
  }
};

module.exports = Game;
