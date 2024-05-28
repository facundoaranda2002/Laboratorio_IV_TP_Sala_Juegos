import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CanvasPosition } from '../../../model/GameAsset';
import { IGameAsset } from '../../..//model/IGameAsset';
import { GameBackGround } from '../../../model/game-assets/BackGroundAsset';
import { GameLevel } from '../../../model/GameLevel';
import { ITargetAsset } from '../../../model/game-assets/ITargetAsset';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2'; 

const FRAMES_TO_LIVE_AFTER_HIT = 6;
const GAME_DURATION_MS = 60000;
const WINNING_LEVEL = 3; // Nivel en el que el jugador gana

@Component({
  selector: 'app-duckhunt',
  standalone: true,
  imports: [NgIf],
  templateUrl: './duckhunt.component.html',
  styleUrls: ['./duckhunt.component.css']
})
export class DuckhuntComponent implements OnInit, OnDestroy{
  @ViewChild('canvasScene', { static: true }) canvasRef?: ElementRef;

  drawFuncLoaded: boolean = false;
  running: boolean;
  backGround: IGameAsset  = new GameBackGround(0, 0);
  targets: ITargetAsset[] = [];
  canvas: any;
  gameLevel: GameLevel = new GameLevel(0, 0);
  lastClick?: CanvasPosition;
  puntaje : number = 1;
  gameTimer?: number;
  timeRemaining: number = GAME_DURATION_MS;
  completedLevels: number = 0;
  perdio: boolean = false;
  timeUpdater?: number;

  public GAME_DURATION_MS = GAME_DURATION_MS;

  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
    this.running = false;
  }

  ngOnInit(): void {
    this.canvas = this.canvasRef?.nativeElement;
    this.backGround = new GameBackGround(this.canvas.width, this.canvas.height);
    this.gameLevel = new GameLevel(this.backGround.width, this.backGround.height);
    this.targets = this.gameLevel.newTargets();
  }

  ngOnDestroy(): void {
    this.running = false;
    if (this.gameTimer) {
      clearTimeout(this.gameTimer);
    }
    if (this.timeUpdater) {
      clearTimeout(this.timeUpdater);
    }
  }

  startPause() {
    if (this.perdio) return;

    this.running = !this.running;
    this.changeDetectorRef.detectChanges();
    this.completedLevels = 0;

    if (this.running) {
      this.timeRemaining = GAME_DURATION_MS;
      this.ngZone.runOutsideAngular(() => this.draw());
      this.updateTime();
    } else {
      if (this.gameTimer) {
        clearTimeout(this.gameTimer);
      }
      if (this.timeUpdater) {
        clearTimeout(this.timeUpdater);
      }
    }
  }

  reset() {
    this.perdio = false;
    this.running = false;
    if (this.gameTimer) {
      clearTimeout(this.gameTimer);
    }
    if (this.timeUpdater) {
      clearTimeout(this.timeUpdater);
    }
    this.timeRemaining = GAME_DURATION_MS; // Resetear el tiempo restante
    this.clearCanvas();
    this.gameLevel.reset();
    this.targets = this.gameLevel.newTargets();
    this.completedLevels = 0; // Resetear los niveles completados
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.startPause();
    }, 300);
    this.puntaje = 1;
  }

  onMouseClick(e: { pageX: number; pageY: number; }) {
    this.lastClick = new CanvasPosition();
    this.lastClick.x = e.pageX - this.canvas.offsetLeft;
    this.lastClick.y = e.pageY - this.canvas.offsetTop;
  }

  draw() {
    // Check that we're still running.
    if (!this.running) {
      return;
    }

    // Paint Scene
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    this.backGround.nextFrame(ctx);

    // Paint Targets
    let i = 0;
    if (!this.targets.length) {
      console.log('Level ' + this.gameLevel.current + ' Complete!');
      this.nextLevel();
      return;
    }

    while (i < this.targets.length) {
      const t = (this.targets[i] as ITargetAsset);
      if (t.hit) {
        if (t.framesSinceHit > FRAMES_TO_LIVE_AFTER_HIT) {
          this.targets.splice(i, 1);
          this.changeDetectorRef.detectChanges();
        }
      } else {
        if (this.lastClick) {
          if (t.checkIfHit(this.lastClick)) {
            // DUCK HIT!!!
            t.hit = true;
            t.color = 'red';
          }
        }
      }
      t.nextFrame(ctx);
      i++;
    }

    this.lastClick = undefined;

    // Schedule next
    requestAnimationFrame(() => this.draw());
  }

  private nextLevel() {
    this.puntaje++;
    this.clearCanvas();
    this.gameLevel.nextLevel();
    this.targets = this.gameLevel.newTargets();
    this.completedLevels++;
    this.changeDetectorRef.detectChanges();
    if (this.completedLevels === WINNING_LEVEL) {
      this.running = false;
      Swal.fire({
        title: '¡Felicidades!',
        text: '¡Has ganado el juego!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.reload();
      });
    } else {
      setTimeout(() => {
        this.ngZone.runOutsideAngular(() => this.draw());
      }, 300);
    }
  }

  private clearCanvas() {
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateTime() {
    if (this.running) {
      this.timeUpdater = window.setTimeout(() => {
        this.timeRemaining -= 1000;
        if (this.timeRemaining > 0) {
          this.updateTime();
        } else {
          this.perdio = true;
          this.running = false;
          this.changeDetectorRef.detectChanges();
          Swal.fire({
            title: '¡Tiempo agotado!',
            text: 'Llegaste al nivel ' + this.puntaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.reload();
          });
        }
      }, 1000);
    }
  }
}
