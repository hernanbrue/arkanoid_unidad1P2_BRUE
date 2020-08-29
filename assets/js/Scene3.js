class Scene3 extends Phaser.Scene {
    constructor() {
      super('escena3');
    }
   
    create ()
    {
        
//agrego el fondo
console.log('agrego fondo - escena3')
var fondo = this.add.image(400, 300, 'fondo');

//agrego los bloques mediante tilemap

var map = this.make.tilemap({ key: 'tilemaps' }); //cargo el tilemap en formato json
var tileset = map.addTilesetImage('bloquecitos', 'tiles'); //cargo el tileset (del soft Tiles) y le digo su key del archivo png
var bloquesLayer = map.createStaticLayer('tilemap2', tileset, 0, 0); //creo a partir del archivo tilemap la capa "tilemap1" hecha con el soft Tiled
map.setCollisionByExclusion([0, -1]);// colisiona con todos los índices menos los espacios vacíos
bloquesLayer.setCollisionByProperty({collide: true}) // activo la propiedad tipo bool que le di a los bloques en el soft Tiled

fondo.setInteractive();
fondo.on('pointerdown',() => this.scene.start('escena2'));

// entradas
teclas = this.input.keyboard.createCursorKeys();


//agrego plataforma y le doy físicas (verlo en clase extendida en ./assets/js/plataforma.js)

plataforma = new Plataforma({scene: this, x:400, y:550});


//agrego la bola y le doy físicas y variables del movimiento inicial (verlo en clase extendida en ./assets/js/bola.js)
let bola = new Bola({scene: this, x:400, y:525});


//quien interacciona con quien
this.physics.add.collider(bola, plataforma);
this.physics.add.collider(bola, bloquesLayer);



}

update(){

 
    
    //movimiento de la plataforma

    if (teclas.left.isDown)
    {
        plataforma.moverIzq();
    }
    else if (teclas.right.isDown)
    {
        plataforma.moverDer(); 
    }
    else
    {
        plataforma.noMover(); 
    }

    
}


}
