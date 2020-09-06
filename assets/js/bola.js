class Bola extends Phaser.GameObjects.Sprite
{
  constructor(config)
  {
    super(config.scene, config.x, config.y, 'sprites', 'bola.jpg');
    config.scene.add.existing(this);

    config.scene.physics.world.enableBody(this);
    this.body.setVelocityY(300);
    this.body.setVelocityX(70);
    this.body.setBounce(1);
    this.body.setFriction(0, 0);
    this.body.setCollideWorldBounds(true);
    
  }


}