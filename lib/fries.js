var Fries = function (options) {
  this.pos = options.pos;
  this.health = 1000;
  this.changed = false;
};

Fries.prototype.draw = function (ctx) {
  var offset = function () {
    if (this.changed) {
      var intensity = (1 - (this.health / 1000)) * 20;
      return (Math.random() * intensity) - (intensity / 2);
    } else {
      return 0;
    }
  };
  ctx.drawImage(document.getElementById("fries"), this.pos[0], this.pos[1] - 45, 80, 80);
  ctx.fillStyle= "#fff";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(("You have " + Math.floor(this.health) + " fries left"), 770 + offset.call(this), 30 + offset.call(this), 250);
  if (this.health < 400) {
    ctx.fillStyle = "#000";
    ctx.fillText(("You have " + Math.floor(this.health) + " fries left"), 770 + offset.call(this), 30 + offset.call(this), 250);
  }
  if (this.health < 200) {
    ctx.fillStyle = "#f00";
    ctx.fillText(("You have " + Math.floor(this.health) + " fries left"), 770 + offset.call(this), 30 + offset.call(this), 250);
  }
  ctx.fillStyle = "#ccc";
  ctx.fillRect(600, 50, 350, 30);
  ctx.strokeStyle = "#000;";
  ctx.lineWidth = 10;
  ctx.strokeRect(600, 50, 350, 30);
  ctx.fillStyle = "#f00";
  ctx.fillRect(605, 55, (this.health / 2.94), 20);
  this.changed = false;
};

module.exports = Fries;
