var Util = require("./util");

var FryThief = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.runSpeed = options.vel[0];
  this.color = "#000";
  this.game = options.game;
  this.accel = options.accel;
  this.grabbed = false;
  this.stealing = false;
  this.closing = 0;
};

FryThief.prototype.draw = function (ctx) {
  if (this.stealing && this.stealing <= 10) {
    this.stealing += 1;
    ctx.drawImage(document.getElementById("master-hand-open"), this.pos[0] - 40, this.pos[1] - 50, 50, 50);
  } else if (this.stealing > 10 && this.stealing <= 20) {
    this.stealing += 1;
    ctx.drawImage(document.getElementById("master-hand-closing"), this.pos[0] - 38, this.pos[1] - 40, 50, 50);
  } else if (this.stealing > 20 && this.stealing <= 30) {
    this.stealing += 1;
    ctx.drawImage(document.getElementById("master-hand-closed"), this.pos[0] - 38, this.pos[1] - 40, 50, 50);

  } else if (this.stealing && this.stealing > 30) {
    this.stealing += 1;
    ctx.drawImage(document.getElementById("master-hand-clenched"), this.pos[0] - 32, this.pos[1] - 30, 37, 37);
    if (this.stealing >= 45) {
      this.stealing = 1;
    }
  } else {
    ctx.drawImage(document.getElementById("master-hand"), this.pos[0] - 40, this.pos[1] - 40, 40, 40);
  }
};

var NORMAL_FRAME_TIME_DELTA = 1000/60;

FryThief.prototype.move = function (timeDelta, ctx) {
  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
  var deltaX = this.vel[0] * velocityScale;
  var deltaY = this.vel[1] * velocityScale;
  if (this.pos[1] + deltaY > this.game.ground) {
    this.splat();
    this.pos[1] = this.game.ground;
    this.accel[1] = 0;
    this.vel[1] = 0;
  } else {
    this.pos[1] = this.pos[1] + deltaY;
  }
  if (this.pos[1] === this.game.ground) {
    this.vel[0] = this.runSpeed;
  }
  this.vel = [this.vel[0] + this.accel[0], this.vel[1] + this.accel[1]];
  this.adjustX(deltaX, ctx);
};

FryThief.prototype.splat = function () {
  if (this.vel[1] >= 13) {
    this.game.remove(this);
  }
};

FryThief.prototype.adjustX = function (deltaX, ctx) {
  if (this.pos[1] === this.game.ground && this.pos[0] >= (this.game.fries.pos[0] + 30)) {
    this.pos[0] = this.game.fries.pos[0] + 30;
    this.vel[0] = 0;
    if (this.game.fries.health >= 0.3) {
      this.game.fries.health -= 0.3;
    } else {
      this.game.fries.health = 0;
    }

    this.game.fries.changed = true;
    if (!this.stealing) {
      this.stealing = 1;
    }

  } else {
    this.pos[0] = this.pos[0] + deltaX;
    this.stealing = false;
  }
};

FryThief.prototype.other = function () {
  console.log("http://www.freesound.org/people/wubitog/sounds/234783/");
};


module.exports = FryThief;
