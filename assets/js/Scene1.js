class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      
      //PERTENECIENTE A LA INTRO
      this.load.image('intro', './assets/intro.jpg');

      //PERTENECIENTES A ESCENA 2
      this.load.image('fondo', './assets/universe.jpg');

      this.load.atlas('sprites', './assets/json/sprites_arkanoid.png', './assets/json/sprites_arkanoid.json');

      //CARGA TILES
      this.load.tilemapTiledJSON('tilemaps', './assets/json/tilemaps.json'); //agrego el tilemap
      this.load.image('tiles', './assets/json/sprites_arkanoid.png'); //agrego locación en png y le doy una key
            

         
    }

    create() {

      var intro = this.add.image(400, 300, 'intro');   
      
      
      intro.setInteractive();
      intro.on('pointerdown',() => this.scene.start('escena2'));
      
}


}
