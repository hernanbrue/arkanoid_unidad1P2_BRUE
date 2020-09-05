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
bloquesLayer = map.createDynamicLayer('tilemap1', tileset, 0, 0); //creo a partir del archivo tilemap la capa "tilemap1" hecha con el soft Tiled
bloquesLayer.setCollisionBetween(1,3);
bloquesLayer.setTileIndexCallback(1, this.hitBloqueA, this); // colisión con BLOQUE AZUL 
bloquesLayer.setTileIndexCallback(2, this.hitBloqueR, this); // colisión con BLOQUE ROJO
bloquesLayer.setTileIndexCallback(3, this.hitBloqueV, this); // colisión con BLOQUE VERDE

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

hitA = 2;
hitR = 3;

//recuento de vidas
vidasTexto = this.add.text(16, 550, 'Vidas: 3', { fontSize: '32px', color: 'red' });

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


    if(bola.y > 560 && vidas >= 1){
        vidas = vidas -1;
        vidasTexto.setText('Vidas: ' + vidas);
        bola.body.reset(plataforma.x, plataforma.y - 18);
        bola.body.velocity.y = -300;
        bola.body.velocity.x = Phaser.Math.Between(-50, 50);
    }

    if(vidas < 1){
        gameoverTexto = this.add.text(100, 200, 'GAME OVER', { fontSize: '100px', color: 'red', fontWeight: 'bold'});
        bola.body.destroy();
       
    }
    
}

//el bloque azul se elimina luego de 1 colision (es decir, a la segunda)
hitBloqueA(bola, tile){

    hitA = hitA - 1;

    if(hitA == 0)
    {
        bloquesLayer.removeTileAt(tile.x, tile.y);
        hitA = 2;
    }

}

//el bloque rojo se elimina luego de 2 colisiones (es decir, a la tercera)
hitBloqueR(bola, tile){

    hitR = hitR - 1;

    if(hitR == 0)
    {
        bloquesLayer.removeTileAt(tile.x, tile.y);
        hitR = 3;
    }

}

//el bloque verde se elimina a la primer colision
hitBloqueV(bola, tile){

        bloquesLayer.removeTileAt(tile.x, tile.y);

}


}


