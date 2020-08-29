class Plataforma extends Phaser.GameObjects.Sprite
{
  constructor(config)
  {
    super(config.scene, config.x, config.y, 'sprites', 'plataforma.jpg');
    config.scene.add.existing(this);

    config.scene.physics.world.enableBody(this);
    this.body.setBounce(1);
    this.body.setCollideWorldBounds(true);
    this.body.immovable = true;
  }

  moverIzq()
  {
    this.body.setVelocityX(-250);
  }

  moverDer()
  {
    this.body.setVelocityX(250);
  }

  noMover()
  {
    this.body.setVelocityX(0);
  }
}