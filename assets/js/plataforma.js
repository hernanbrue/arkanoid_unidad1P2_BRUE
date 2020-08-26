class Plataforma extends Phaser.GameObject.Sprite
{
  constructor(config)
  {
    super(this.scene, config.x, config.y, "plataforma");
    config.scene.add.existing(this)
  }
}