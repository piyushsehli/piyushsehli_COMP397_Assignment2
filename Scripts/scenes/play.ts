module scenes {
    export class Play extends objects.Scene {
        // member variables
        private _plane:objects.Plane;
        private _background:objects.Background;
        private _ufo:objects.Ufo;
        private _bulletClicked: objects.Bullet[];
        private _meteors:objects.Meteor[];
        private _enemy:objects.Enemy[];
        private _meteorNum:number;
        private _enemyNum:number;
        private _enemyCollision:  number;
        public engineSound:createjs.AbstractSoundInstance;

        // constructors
        constructor() {
            super();

            this.Start();
        }

        // private methods
        private _buildMeteors():void {
            for (let count = 0; count < this._meteorNum; count++) {
                this._meteors.push(new objects.Meteor());
            }
        }

        private _buildEnemy():void {
            for (let count = 0; count < this._enemyNum; count++) {
                this._enemy.push(new objects.Enemy());
            }
        }

        private _removeCurrentBullet(bullet): void {
            let temp = bullet;
            this._bulletClicked = this._bulletClicked.filter(obj => obj !== bullet);  
            this.removeChild(temp);
        }

        // public methods
        public Start():void {
            this.engineSound = createjs.Sound.play("engine");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;


            this._plane = new objects.Plane();
            this._background = new objects.Background();
            this._ufo = new objects.Ufo();

            // creates an empty array of type meteor
            this._meteors = new Array<objects.Meteor>();
            this._meteorNum = 2;

            this._buildMeteors();
            
            // creates an empty array of type enemy
            this._enemy = new Array<objects.Enemy>();
            this._enemyNum = 2;

            this._buildEnemy();

            // bullet
            this._bulletClicked = new Array<objects.Bullet>();
            
            this.Main();
        }

        public Update():void {
            this._plane.Update();
            this._background.Update();
            this._ufo.Update();

            this._bulletClicked.forEach(bullet => {
                if (bullet.Update()) {
                  // it will check the boundary of bullet and will updated if bullete reach to boundary
                  this._removeCurrentBullet(bullet);
                } else {
                  // check cololision between enemy and bullet
                  this._enemy.forEach(enemy => {
                    this._enemyCollision = managers.Collision.check(enemy, bullet);
        
                    if (this._enemyCollision) {
                      // reset and remove enemy
                      enemy.Reset();
                      this.removeChildAt(enemy.y);
        
                      //   reset and remove bullet
                      this._removeCurrentBullet(bullet);
                    }
                  });
                }
              });
        

            managers.Collision.check(this._plane, this._ufo);

            this._meteors.forEach(meteor => {
                meteor.Update();
                managers.Collision.check(this._plane, meteor);
            });

            this._enemy.forEach(enemy => {
                enemy.Update();
                managers.Collision.check(this._plane, enemy);
            });
            
        }

        public Reset():void {

        }

        public Destroy():void {
            this.engineSound.stop();
            this.removeAllChildren();
        }

        public Main():void {
            console.log(`Starting - PLAY SCENE`);

            // adding the background to the scene
            this.addChild(this._background);

            // adding the ufo to the scene
            this.addChild(this._ufo);

            // adding the plane to the scene
            this.addChild(this._plane);

            // adding the cloud to the scene
            for (const meteor of this._meteors) {
                this.addChild(meteor);
            }

            for (const enemy of this._enemy) {
                this.addChild(enemy);
            }

            // handaling click event for bullets
      this._background.on(
        "click",
        function() {
          // cerate a new object every time and add into list
          let bullet: objects.Bullet;
          bullet = new objects.Bullet();
          bullet.y = this._plane.y;
          bullet.x = this._plane.x;
          this._bulletClicked.push(bullet);
          this.addChild(bullet);
        },
        this
      );
            this.addChild(managers.Game.ScoreBoard.LivesLabel);
            this.addChild(managers.Game.ScoreBoard.ScoreLabel);
        }
    }
}