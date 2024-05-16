import { GameAsset } from '../GameAsset';
import { IGameAsset } from '../IGameAsset';

export class GameBackGround extends GameAsset implements IGameAsset {
  color: string = "";
  skyColor: string;
  grassColor: string;

  constructor(public width: number, public height: number) {
    super();
    this.skyColor = 'skyblue';
    this.grassColor = 'green';
  }
  nextFrame(ctx: CanvasRenderingContext2D) {
    // Draw Sky
    ctx.fillStyle = this.skyColor;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    // Draw Grass
    ctx.fillStyle = this.grassColor;
    const grassY = this.height - (this.height * 0.1);
    const grassHight = this.height * 0.1;
    ctx.fillRect(this.pos.x, grassY, this.width, grassHight);
  }
}