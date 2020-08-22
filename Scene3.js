class Scene3 extends Phaser.Scene {
    constructor() {
      super('escena3');
    }
   
    create ()
    {
        
//agrego el fondo
console.log('agrego fondo - escena3')
var fondo = this.add.image(400, 300, 'fondo');

//agrego los bloques

var map = this.make.tilemap({ key: 'tilemap1' });
var tileset = map.addTilesetImage('bloquecitos', 'tiles');
var layer = map.createStaticLayer('tilemap2', tileset, 0, 0);

fondo.setInteractive();
fondo.on('pointerdown',() => this.scene.start('escena3'));

// entradas
teclas = this.input.keyboard.createCursorKeys();


//agrego plataforma y le doy físicas
plataforma = this.physics.add.sprite(400, 550, 'sprites', 'plataforma.jpg');
plataforma.setBounce(1);
plataforma.setCollideWorldBounds(true);
plataforma.body.immovable = true;

//agrego la bola y le doy físicas y variables del movimiento inicial
bola = this.physics.add.sprite(400, 400, 'sprites', 'bola.jpg');
velocidadX = 50;
velocidadY = -300;
bola.body.velocity.y = velocidadY;
bola.body.velocity.x = velocidadX;
bola.setBounce(1);
bola.setCollideWorldBounds(true);

//quien interacciona con quien
this.physics.add.collider(bola, plataforma);
this.physics.add.collider(bola, bloques);


}

update(){

    //movimiento de la plataforma

    if (teclas.left.isDown){
        plataforma.setVelocityX(-250);
    }
    else if (teclas.right.isDown){
        plataforma.setVelocityX(250);
    }
    else{
        plataforma.setVelocityX(0);
    }

    
}



}