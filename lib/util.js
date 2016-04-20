var Util = {
  distance: function (initPos, endPos) {
    return Math.sqrt(
      Math.pow(initPos[0] - endPos[0], 2) + Math.pow(initPos[0] - endPos[0], 2)
    );
  },

  magnitude: function (vector) {
    return Util.distance([0,0], vector);
  },


  inherits: function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  }
};


module.exports = Util;
