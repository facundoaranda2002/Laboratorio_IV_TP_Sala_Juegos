export class CanvasPosition {
    x: number = 0;
    y: number = 0;
  }
  
  export class GameAsset {
    pos: CanvasPosition;
      constructor() {
        this.pos = new CanvasPosition();
        this.pos.x = 0;
        this.pos.y = 0;
      }
    }