namespace objects {
    export class Bullet extends objects.GameObject {
      // member variables
      private _verticalSpeed: number;
  
      /**
       * Creates an instance of Bullet.
       * @memberof Bullet
       */
      constructor() {
        super("bullet");
  
        this.Start();
      }
  
      // private methods
      private _checkBounds(): boolean {
        if (this.y >= config.Screen.HEIGHT) {
          console.info("bullet" + this.y);
          this.Reset();
          return true;
        }
        return false;
      }
  
      // public methods
      public Start(): void {
        this.regX = this.halfWidth;
        this.regY = this.halfHeight;
  
        this.Reset();
      }
  
      public Update(): boolean {
        this.y -= this._verticalSpeed;
  
        return this._checkBounds();
      }
  
      public Reset(): void {
        this._verticalSpeed = 6;
        this.x = 0;
        this.y = 0;
  
        console.info("Reset x and y", this.x, this.y);
      }
    }
  }
  