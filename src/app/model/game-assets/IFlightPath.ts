import { CanvasPosition } from '../GameAsset';
export interface IFlightPath {
    speed: number;
    updatePos: (pos: CanvasPosition, size: number) => CanvasPosition;
}