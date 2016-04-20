var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.stopped = false;

};


GameView.prototype.bindKeyHandlers = function () {
  var game = this.game;

  key("enter", function () {
    this.progress();
  }.bind(this));
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  game.draw(this.ctx);
  this.game.onlose = this.lost;
  this.ctx.fillStyle = "rgba(0,0,0, 0.4)";
  this.ctx.fillRect(0,0,1000,600);

  this.ctx.fillStyle = "#fff";
  this.ctx.font = "18px sans-serif";
  this.ctx.textAlign = "left";
  this.startText();
  this.stopped = true;
};

GameView.prototype.startText = function () {
  this.ctx.fillText("Welcome to Defend Your Fries! Ward off moochers by throwing", 250, 300);
  this.ctx.fillText("them up high enough with the mouse. If you run out of fries, you lose!", 250, 350);
  this.ctx.textAlign = "center";
  this.ctx.fillText("Press ENTER to start", 500, 400);
};

GameView.prototype.progress = function () {
  if (this.game.over()) {
    this.game.reset();
    this.stopped = false;
    this.game.start();
  } else if (this.stopped) {
    this.stopped = false;
    this.game.start();
  }
};

GameView.prototype.lost = function () {
  this.ctx.fillStyle = "rgba(0,0,0, 0.4)";
  this.ctx.fillRect(0,0,1000,600);
  this.ctx.font = "24px sans-serif";
  this.ctx.fillStyle = "#fff";
  this.ctx.textAlign = "center";
  this.ctx.fillText(
    ("Your fries are all gone! You earned " + this.points + " points. Press ENTER to start a new game."),
    500,
    350
  );
  this.stopped = true;
};

module.exports = GameView;
