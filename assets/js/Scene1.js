class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      
      //PERTENECIENTE A LA INTRO
      this.load.image('intro', './assets/intro.jpg');

      //PERTENECIENTES A ESCENAS
      this.load.image('fondo', './assets/universe.jpg');
      

      this.load.atlas('sprites', './assets/json/sprites_arkanoid.png', './assets/json/sprites_arkanoid.json');

      //CARGA TILES
      this.load.tilemapTiledJSON('tilemaps', './assets/json/tilemaps.json'); //agrego el tilemap
      this.load.image('tiles', './assets/json/sprites_arkanoid.png'); //agrego locación en png y le doy una key

      //CARGA CORAZÓN
      this.load.image('corazon', './assets/corazon.png');

      //CARGA SONIDOS
      this.load.audio('choque', './assets/ballhit.mp3');
      this.load.audio('choqueBloque', './assets/choqueBloque.wav');
      this.load.audio('deadBloque', './assets/eliminaBloque.wav');
      this.load.audio('deadBola', './assets/deadB.wav');

   
    }
    

    create() {

      var intro = this.add.image(400, 300, 'intro');
      
      
      intro.setInteractive();
      intro.on('pointerdown',() => this.scene.start('escena2'));
      

}


}
