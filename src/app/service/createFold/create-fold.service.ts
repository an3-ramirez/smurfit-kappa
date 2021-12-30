import { Injectable } from '@angular/core';

/** Enums */
import { directionsEnum } from 'src/app/enums/directions-enum';

/** Interfaces */
import { IMeasures } from 'src/app/interfaces/imeasures';

@Injectable({
  providedIn: 'root'
})
export class CreateFoldService {

  private ctx! : CanvasRenderingContext2D;

  constructor() { }

  public setContext(contexto : CanvasRenderingContext2D){
    this.ctx = contexto;
  }

  public createFold(x: number, y: number, width: number, heigth: number, form: number, eraseSide: directionsEnum, lineDash: number) {

    const compacVars: IMeasures = {x, y, width, heigth};
    switch (form) {
      case 1:
        this.shapeTypeOne(eraseSide, compacVars)
        break;

      case 2:
        this.shapeTypeTwo(eraseSide, compacVars);
        break;
      
      case 3:
        this.shapeTypeTree(eraseSide, compacVars);
        break;

      default: break;
    }
  }

  private shapeTypeOne(type: directionsEnum, cpVar: IMeasures) {
    switch (type) {
      case directionsEnum.top:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.20), cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.80), cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y);
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.10), cpVar.y - cpVar.heigth);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.90), cpVar.y - cpVar.heigth);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y);
        break;

      case directionsEnum.right:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x - cpVar.width, cpVar.y + (cpVar.heigth * 0.10));
        this.ctx.lineTo(cpVar.x - cpVar.width, cpVar.y + (cpVar.heigth * 0.90));
        this.ctx.lineTo(cpVar.x, cpVar.y + cpVar.heigth);
        break;

      default: break;
    }
  }

  private shapeTypeTwo(type: directionsEnum, cpVar: IMeasures) {
    switch (type) {
      case directionsEnum.top:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x, cpVar.y + (cpVar.heigth * 0.50));
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.20), cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.80), cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y + (cpVar.heigth * 0.50));
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y);
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x, cpVar.y - (cpVar.heigth * 0.50));
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.20), cpVar.y - cpVar.heigth);
        this.ctx.lineTo(cpVar.x + (cpVar.width * 0.80), cpVar.y - cpVar.heigth);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y - (cpVar.heigth * 0.50));
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y);
        break;

      case directionsEnum.right:
        this.ctx.moveTo(cpVar.x, cpVar.y);
        this.ctx.lineTo(cpVar.x - (cpVar.width /2), cpVar.y );
        this.ctx.lineTo(cpVar.x - cpVar.width , cpVar.y + (cpVar.heigth * 0.20));
        this.ctx.lineTo(cpVar.x - cpVar.width , cpVar.y + (cpVar.heigth * 0.80));
        this.ctx.lineTo(cpVar.x - (cpVar.width/2), cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x , cpVar.y + cpVar.heigth);
        break;

      default: break;
    }
  }

  private shapeTypeTree(type: directionsEnum, cpVar: IMeasures) {
    switch (type) {
      case directionsEnum.top:
        this.ctx.moveTo(cpVar.x + cpVar.width, cpVar.y);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y + (cpVar.heigth / 2));
        this.ctx.ellipse(cpVar.x + (cpVar.width / 2), cpVar.y + (cpVar.heigth / 2), cpVar.width / 2, cpVar.heigth / 2, 0, 0, Math.PI, false);
        this.ctx.lineTo(cpVar.x, cpVar.y)
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(cpVar.x + cpVar.width, cpVar.y);
        this.ctx.lineTo(cpVar.x + cpVar.width, cpVar.y - (cpVar.heigth / 2));
        this.ctx.ellipse(cpVar.x + (cpVar.width / 2), cpVar.y - (cpVar.heigth / 2), cpVar.width / 2, cpVar.heigth / 2, 0, 0, Math.PI, true);
        this.ctx.lineTo(cpVar.x, cpVar.y);
        break;

        case directionsEnum.right:
        this.ctx.moveTo(cpVar.x , cpVar.y + cpVar.heigth);
        this.ctx.lineTo(cpVar.x - (cpVar.width/2), cpVar.y + cpVar.heigth);
        this.ctx.ellipse(cpVar.x - (cpVar.width / 2), cpVar.y + (cpVar.heigth / 2), cpVar.heigth / 2, cpVar.width / 2, Math.PI / 2, 0, Math.PI, false);
        this.ctx.lineTo(cpVar.x , cpVar.y);
        break;

      default: break;
    }
  }
}
