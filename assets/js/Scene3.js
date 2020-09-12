class Scene3 extends Phaser.Scene {
    constructor() {
      super('escena3');
    }
   
    create ()
    {
        
//agrego el fondo
var fondo = this.add.image(400, 300, 'fondo');
fondo.setScale(1.3);

//agrego las vidas
vida1 = this.add.image(750, 555, 'corazon');
vida1.setScale(0.15);
vida2 = this.add.image(700, 555, 'corazon');
vida2.setScale(0.15);
vida3 = this.add.image(650, 555, 'corazon');
vida3.setScale(0.15);

//agrego los bloques mediante tilemap
var map = this.make.tilemap({ key: 'tilemaps' }); //cargo el tilemap en formato json
var tileset = map.addTilesetImage('bloquecitos', 'tiles'); //cargo el tileset (del soft Tiles) y le digo su key del archivo png
bloquesLayer = map.createDynamicLayer('tilemap2', tileset, 0, 0); //creo a partir del archivo tilemap la capa "tilemap1" hecha con el soft Tiled
bloquesLayer.setCollisionBetween(1,3);
bloquesLayer.setTileIndexCallback(1, this.hitBloqueA, this); // colisión con BLOQUE AZUL 
bloquesLayer.setTileIndexCallback(2, this.hitBloqueR, this); // colisión con BLOQUE ROJO
bloquesLayer.setTileIndexCallback(3, this.hitBloqueV, this); // colisión con BLOQUE VERDE

//sistema para pasar entre niveles con el click en el fondo
fondo.setInteractive();
fondo.on('pointerdown',() => this.scene.start('escena2'));

//entradas
teclas = this.input.keyboard.createCursorKeys();

//agrego plataforma y le doy físicas (verlo en clase extendida en ./assets/js/plataforma.js)
plataforma = new Plataforma({scene: this, x:400, y:550});

//agrego la bola y le doy físicas y variables del movimiento inicial (verlo en clase extendida en ./assets/js/bola.js)
bola = new Bola({scene: this, x:400, y:525});

//quien interacciona con quien
this.physics.add.collider(bola, plataforma, bolachocaPlataforma, hitSound);
this.physics.add.collider(bola, bloquesLayer);

//determino acá la cantidad de golpes de cada bloque (el verde es uno solo) para tenerlo más accesible
hitA = 2;
hitR = 3;

vidas = 3;
bolaVel = 300;

//recuento de vidas (utilizar si se quiere ver las vidas como texto)
//vidasTexto = this.add.text(630, 500, 'Vidas: 3', { fontSize: '32px', color: 'red' });

//contador puntaje
score = 0;
//scoreTexto = this.add.text(16, 550, 'Score: 0', { fontSize: '32px', color: 'red' });
texto = new Textos({scene: this, x:16, y:550});

//sonidos
hit = this.sound.add('choque');
hitBloque = this.sound.add('choqueBloque');
deadBloque = this.sound.add('deadBloque');
deadSound = this.sound.add('deadBola');


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
        deadSound.play();
        bola.resetBolaPos();
        bola.resetBolaMov();

    }

    else if(vidas < 1){
        gameoverTexto = this.add.text(100, 200, 'GAME OVER', { fontSize: '100px', color: 'white', fontWeight: 'bold'});
        bola.body.destroy();
       
    }

    //control de la eliminación de los corazones
    controlVidas();
    
}

//el bloque azul se elimina luego de 1 colision (es decir, a la segunda)
hitBloqueA(bola, tile){

    hitA = hitA - 1;
    hitBloque.play();

    if(hitA == 0)
    {
        bloquesLayer.removeTileAt(tile.x, tile.y);
        texto.hitAzul();
        hitBloque.stop();
        deadBloque.play();
        hitA = 2;

    }

}

//el bloque rojo se elimina luego de 2 colisiones (es decir, a la tercera)
hitBloqueR(bola, tile){

    hitR = hitR - 1;
    hitBloque.play();

    if(hitR == 0)
    {
        bloquesLayer.removeTileAt(tile.x, tile.y);
        texto.hitRojo();
        hitBloque.stop();
        deadBloque.play();
        hitR = 3;
    }

}

//el bloque verde se elimina a la primer colision
hitBloqueV(bola, tile){

        bloquesLayer.removeTileAt(tile.x, tile.y);
        texto.hitVerde();
        deadBloque.play();
        bola.body.velocity.y -= 20; //golpear a un bloque verde incrementa su velocidad en 20 unidades
        dirHorizontalBola(); //si golpea un bloque verde sale para el otro lado

}

}

//control de la eliminación de los corazones
function controlVidas(){
    if(vidas == 2){
        vida1.destroy();
    }

    if(vidas == 1){
        vida2.destroy();
    }

    if(vidas == 0){
        vida3.destroy();
    }
}

function dirHorizontalBola(){
    bola.body.velocity.x = -bola.body.velocity.x;
}

function bolachocaPlataforma(bola, plataforma) {

    var diferencia = 0;

    if (bola.x < plataforma.x)
    {
        //bola está en el lado izquierdo de la plataforma
        diferencia = plataforma.x - bola.x;
        bola.body.velocity.x = (-2 * diferencia);
    }
    else if (bola.x > plataforma.x)
    {
        //bola está en el lado derecho de la plataforma
        diferencia = bola.x - plataforma.x;
        bola.body.velocity.x = (2 * diferencia);
    }
    else
    {
        //bola en el centro --> agrega un valor random que evita que salga derecho para arriba
        bola.body.velocity.x = 2 + Math.random(-30, 30);
        
    }

}

function hitSound(){
    hit.play();
}





