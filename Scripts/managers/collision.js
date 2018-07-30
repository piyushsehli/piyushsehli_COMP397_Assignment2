var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.check = function (object1, object2) {
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < object1.halfHeight + object2.halfHeight) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "ufo":
                            var yaySound = createjs.Sound.play("coin");
                            yaySound.volume = 0.2;
                            managers.Game.ScoreBoard.Score += 100;
                            return 1;
                            break;
                        case "meteor":
                            var thunderSound = createjs.Sound.play("explosion");
                            thunderSound.volume = 0.2;
                            managers.Game.ScoreBoard.Lives -= 1;
                            return 1;
                            break;
                        case "bullet":
                            var thunderSound2 = createjs.Sound.play("bulletSound");
                            thunderSound2.volume = 0.2;
                            managers.Game.ScoreBoard.Score += 100;
                            return 1;
                            break;
                        case "enemy":
                            var thunderSound3 = createjs.Sound.play("explosion");
                            thunderSound3.volume = 0.2;
                            managers.Game.ScoreBoard.Lives -= 1;
                            return 1;
                            break;
                    }
                    return 0;
                }
            }
            else {
                object2.isColliding = false;
                return 0;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map