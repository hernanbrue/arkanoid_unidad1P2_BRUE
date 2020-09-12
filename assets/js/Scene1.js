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

      //CARGA BOTONES DE NIVELES (no usé tiles porque me los compilaba en una imágen roja en lugar de lo que eran, 2 botones blancos)
      this.load.image('nivel1', './assets/nivel1.jpg');
      this.load.image('nivel2', './assets/nivel2.jpg');


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

      //agrego los botones en pantalla
      var nivel1 = this.add.image(200, 400, 'nivel1');
      var nivel2 = this.add.image(200, 500, 'nivel2');

      nivel1.setInteractive();
      nivel1.on('pointerdown',() => this.scene.start('escena2'));
      nivel2.setInteractive();
      nivel2.on('pointerdown',() => this.scene.start('escena3'));
      
      
      /*intro.setInteractive();
      intro.on('pointerdown',() => this.scene.start('escena2'));*/
      

}


}
