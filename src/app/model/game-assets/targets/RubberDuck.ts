import { TargetAsset } from '../TargetAsset';
import { CanvasPosition } from '../../GameAsset';
import { IGameAsset } from '../../IGameAsset';
import { IFlightPath } from '../IFlightPath';

export class RubberDuckFlightPath implements IFlightPath {
    direction: number[];
    xBoundary: any;
    yBoundary: number;
    speed: any;
    constructor(xBoundary: number, yBoundary: number) {
        this.speed = 0;
        this.direction = [0, 0];
        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary;
    }
    updatePos(pos: CanvasPosition, size: number) {
        return pos;
    }
}

export class RubberDuck extends TargetAsset implements IGameAsset {
    radius: number = 0;
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 15;
        this.height = 8;
        this.color = 'rgba(255, 255, 0, 1)';
        this.flightPath = new RubberDuckFlightPath(xBoundary, yBoundary);
        this.draw = this.drawFunc;
        this.checkIfHit = this.checkIfHitFunc;
    }

    private drawFunc(ctx: CanvasRenderingContext2D) {
            // Draw your target object here
            const headRadius = this.height * 0.8;
            ctx.beginPath();
            ctx.ellipse(this.pos.x, this.pos.y, this.width, this.height, 0, 0, 2 * Math.PI);
            ctx.arc(this.pos.x + headRadius, this.pos.y - this.height - 3, headRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
    }

    private checkIfHitFunc(lastClick: CanvasPosition) {
        // Define your hit criteria here
        const lc = lastClick;
        const lockedOnX = lc.x > this.pos.x - this.width / 2 && lc.x < this.pos.x + this.width / 2;
        const lockedOnY = lc.y > this.pos.y - this.height && lc.y < this.pos.y + this.height / 2;
        return lockedOnX && lockedOnY;
    }
}