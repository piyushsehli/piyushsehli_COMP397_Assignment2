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
var objects;
(function (objects) {
    var Ufo = /** @class */ (function (_super) {
        __extends(Ufo, _super);
        /**
         * Creates an instance of Ufo.
         * @memberof Ufo
         */
        function Ufo() {
            var _this = _super.call(this, "ufo") || this;
            _this.Start();
            return _this;
        }
        // private methods
        Ufo.prototype._checkBounds = function () {
            // check bottom boundary
            if (this.y > config.Screen.HEIGHT + this.halfHeight) {
                this.Reset();
            }
        };
        // public methods
        Ufo.prototype.Start = function () {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this._verticalSpeed = 5;
            this.Reset();
        };
        Ufo.prototype.Update = function () {
            this.y += this._verticalSpeed;
            this._checkBounds();
        };
        Ufo.prototype.Reset = function () {
            this.y = -this.height;
            this.x = Math.floor((Math.random() * (config.Screen.WIDTH - this.width)) + this.halfWidth);
        };
        return Ufo;
    }(objects.GameObject));
    objects.Ufo = Ufo;
})(objects || (objects = {}));
//# sourceMappingURL=ufo.js.map