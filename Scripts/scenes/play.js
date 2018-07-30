var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // constructors
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        Play.prototype._buildMeteors = function () {
            for (var count = 0; count < this._meteorNum; count++) {
                this._meteors.push(new objects.Meteor());
            }
        };
        Play.prototype._removeCurrentBullet = function (bullet) {
            var temp = bullet;
            this._bulletClicked = this._bulletClicked.filter(function (obj) { return obj !== bullet; });
            this.removeChild(temp);
        };
        // public methods
        Play.prototype.Start = function () {
            this.engineSound = createjs.Sound.play("engine");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;
            this._plane = new objects.Plane();
            this._background = new objects.Background();
            this._ufo = new objects.Ufo();
            // creates an empty array of type meteor
            this._meteors = new Array();
            this._meteorNum = 3;
            this._buildMeteors();
            // bullet
            this._bulletClicked = new Array();
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._plane.Update();
            this._background.Update();
            this._ufo.Update();
            this._bulletClicked.forEach(function (bullet) {
                if (bullet.Update()) {
                    // it will check the boundary of bullet and will updated if bullete reach to boundary
                    _this._removeCurrentBullet(bullet);
                }
                else {
                    // check cololision between enemy and bullet
                    //this._ufo.forEach(enemy => {
                    _this._enemyCollision = managers.Collision.check(_this._ufo, bullet);
                    if (_this._enemyCollision) {
                        // reset and remove enemy
                        _this._ufo.Reset();
                        _this.removeChildAt(_this._ufo.y);
                        //   reset and remove bullet
                        _this._removeCurrentBullet(bullet);
                        managers.Game.ScoreBoard.Score +=
                            100;
                    }
                    //});
                }
            });
            managers.Collision.check(this._plane, this._ufo);
            this._meteors.forEach(function (meteor) {
                meteor.Update();
                managers.Collision.check(_this._plane, meteor);
            });
        };
        Play.prototype.Reset = function () {
        };
        Play.prototype.Destroy = function () {
            this.engineSound.stop();
            this.removeAllChildren();
        };
        Play.prototype.Main = function () {
            console.log("Starting - PLAY SCENE");
            // adding the background to the scene
            this.addChild(this._background);
            // adding the ufo to the scene
            this.addChild(this._ufo);
            // adding the plane to the scene
            this.addChild(this._plane);
            // adding the cloud to the scene
            for (var _i = 0, _a = this._meteors; _i < _a.length; _i++) {
                var meteor = _a[_i];
                this.addChild(meteor);
            }
            // handaling click event for bullets
            this._background.on("click", function () {
                // cerate a new object every time and add into list
                var bullet;
                bullet = new objects.Bullet();
                bullet.y = this._plane.y;
                bullet.x = this._plane.x;
                this._bulletClicked.push(bullet);
                this.addChild(bullet);
            }, this);
            this.addChild(managers.Game.ScoreBoard.LivesLabel);
            this.addChild(managers.Game.ScoreBoard.ScoreLabel);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map