import { Mallard } from './game-assets/targets/Mallard';
import { RubberDuck } from './game-assets/targets/RubberDuck';
import { WoodenDuck } from './game-assets/targets/WoodenDuck';
import { ITargetAsset } from './game-assets/ITargetAsset';
import { TargetAsset } from './game-assets/TargetAsset';

export class GameLevel {
    current: number = 1;
    constructor(private xBoundary: number, private yBoundary: number) {
        this.reset();
    }

    nextLevel() {
        this.current += 1;
    }

    reset() {
        this.current = 1;
    }

    newTargets() {
        const list: ITargetAsset[] = [];
        let t: TargetAsset;
        let startingX = -80;
        let startingY = this.yBoundary * this.randomInt(60) / 100;
        for (let i = 0; i < this.current; i++) {

            // Add Mallards
            t = new Mallard(this.xBoundary, this.yBoundary);
            t.pos.x = startingX;
            t.pos.y = startingY;
            t.flightPath.speed *= this.current * (this.randomInt(20) + 40) / 100;
            list.push(t);
            startingX -= this.xBoundary * (this.randomInt(100) + 100) / 200;
            startingY = this.yBoundary * this.randomInt(60) / 100;

            // Add Rubber Ducks
            t = new WoodenDuck(this.xBoundary, this.yBoundary);
            t.pos.x = this.randomOfRange(this.xBoundary - t.width);
            t.pos.y = this.yBoundary * 0.91;
            list.push(t);

            // Add Rubber Ducks
            t = new RubberDuck(this.xBoundary, this.yBoundary);
            t.pos.x = this.randomOfRange(this.xBoundary - t.width);
            t.pos.y = this.yBoundary * 0.97;
            list.push(t);
        }
        return list;
    }

    randomInt(max: number) {
        const ans = Math.floor(Math.random() * max);
        return ans;
    }

    randomOfRange(range: number) {
        const ans = Math.floor(Math.random() * range);
        return ans;
    }
}