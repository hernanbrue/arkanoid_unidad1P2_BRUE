class Scene2 extends Phaser.Scene {
    constructor() {
      super('escena2');
    }
   
    create ()
    {
        
//agrego el fondo
//console.log('agrego fondo - escena2')
var fondo = this.add.image(400, 300, 'fondo');

//agrego los bloques mediante tilemap

var map = this.make.tilemap({ key: 'tilemaps' }); //cargo el tilemap en formato json
var tileset = map.addTilesetImage('bloquecitos', 'tiles'); //cargo el tileset (del soft Tiles) y le digo su key del archivo png
var bloquesLayer = map.createDynamicLayer('tilemap1', tileset, 0, 0); //creo a partir del archivo tilemap la capa "tilemap1" hecha con el soft Tiled
bloquesLayer.setCollisionBetween(1,3);
bloquesLayer.setTileIndexCallback(1, this.hitBloque, this); // colisión con BLOQUE AZUL
bloquesLayer.setTileIndexCallback(2, this.hitBloque, this); // colisión con BLOQUE ROJO
bloquesLayer.setTileIndexCallback(3, this.hitBloque, this); // colisión con BLOQUE VERDE

fondo.setInteractive();
fondo.on('pointerdown',() => this.scene.start('escena3'));

// entradas
teclas = this.input.keyboard.createCursorKeys();


//agrego plataforma y le doy físicas (verlo en clase extendida en ./assets/js/plataforma.js)
plataforma = new Plataforma({scene: this, x:400, y:550});


//agrego la bola y le doy físicas y variables del movimiento inicial (verlo en clase extendida en ./assets/js/bola.js)
bola = new Bola({scene: this, x:400, y:525});


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

hitBloque(bola, tile){
    
    this.bloquesLayer.removeTileAt(tile.x, tile.y);

}


}


