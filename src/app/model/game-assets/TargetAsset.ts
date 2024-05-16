import { GameAsset, CanvasPosition } from '../GameAsset';
import { IFlightPath } from './IFlightPath';
import { ITargetAsset } from './ITargetAsset';

export class TargetAsset extends GameAsset implements ITargetAsset {
    width: number;
    height: number;
    color: string;
    flightPath: IFlightPath;
    hit: boolean;
    framesSinceHit: number;
    constructor() {
        super();
        this.width = 0; // Asigna un valor inicial a width
        this.height = 0; // Asigna un valor inicial a height
        this.color = ''; // Asigna un valor inicial a color
        this.flightPath = {
            speed: 0,
            updatePos: (pos: CanvasPosition, size: number) => pos // Implementación de ejemplo, puedes ajustarla según tus necesidades
        };  // Asigna un valor inicial a flightPath
        this.hit = false; // Asigna un valor inicial a hit
        this.framesSinceHit = 0;
        this.draw = () => {}; // Asigna una función vacía como valor inicial para draw
        this.checkIfHit = () => false; // Asigna una función que devuelve false como valor inicial para checkIfHit
        this.framesSinceHit = 0;
    }
    draw: (ctx: CanvasRenderingContext2D) => void;
    checkIfHit: (lastClick: CanvasPosition) => boolean;
    nextFrame(ctx: CanvasRenderingContext2D) {
        if (!this.hit) {
            this.flightPath.updatePos(this.pos, this.height);
        } else {
            this.framesSinceHit ++;
        }
        this.draw(ctx);
    }
}