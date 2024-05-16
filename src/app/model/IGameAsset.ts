import { CanvasPosition } from './GameAsset';
export interface IGameAsset {
  pos: CanvasPosition;
  width: number;
  height: number;
  color: string;
  nextFrame: (ctx: CanvasRenderingContext2D) => void;
}