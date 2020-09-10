class Textos extends Phaser.GameObjects.Text
{
  constructor(config)
  {
    super(config.scene, config.x, config.y, 'Score: 0', { fontSize: '32px', color: 'red' });
    config.scene.add.existing(this);

  }

  hitVerde()
  {
    score += 10;
    this.setText('Score: ' + score)
  }
  
  hitAzul()
  {
    score += 20;
    this.setText('Score: ' + score);
  }

  hitRojo()
  {
    score += 30;
    this.setText('Score: ' + score)
  }

  
}