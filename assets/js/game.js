var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, Scene3]
};

var game = new Phaser.Game(config); //toma la variable configuración en lugar de hacerlo directamente aquí.

//VARIABLES

var bloques; // creo la variable que manejará a los objetos a colisionar
var bola;
var teclas;
var plataforma;
var bloquesLayer;
var hitA
var hitR; 
var vidas = 3;
var score = 0;
var vidasTexto;
var vida1;
var vida2;
var vida3;
var scoreTexto;
var gameoverTexto;

      