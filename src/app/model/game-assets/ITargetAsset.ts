import { CanvasPosition } from '../GameAsset';
import { IFlightPath } from './IFlightPath';

export interface ITargetAsset {
    width: number;
    height: number;
    color: string;
    flightPath: IFlightPath;
    hit: boolean;
    framesSinceHit: number;
    checkIfHit: (lastClick: CanvasPosition) => boolean;
    nextFrame: (ctx: CanvasRenderingContext2D) => void;
}