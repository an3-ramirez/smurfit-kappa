import { Injectable } from '@angular/core';

import { directionsEnum } from 'src/app/enums/directions-enum';

@Injectable({
  providedIn: 'root'
})
export class CreateMeasureLineServiceService {

  private ctx!: CanvasRenderingContext2D;

  constructor() { }

  public setContexto(contexto : CanvasRenderingContext2D){

    this.ctx = contexto;

  } 
  
  public createMeasureLine(x: number, y: number, directionline: directionsEnum, width: number, text: string, lineDash: number) {

    switch (directionline) {
      case directionsEnum.top:

        this.ctx.save();
        this.ctx.translate(x + 5, y + (width / 2));
        this.ctx.rotate(Math.PI / 2);
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();


        this.ctx.moveTo(x - 5, y);
        this.ctx.lineTo(x + 5, y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.moveTo(x - 5, y + width);
        this.ctx.lineTo(x + 5, y + width);

        break;

      case directionsEnum.bottom:

        this.ctx.save();
        this.ctx.translate(x - 5, y + (width / 2));
        this.ctx.rotate(Math.PI * 1.5);
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();


        this.ctx.moveTo(x - 5, y);
        this.ctx.lineTo(x + 5, y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.moveTo(x - 5, y + width);
        this.ctx.lineTo(x + 5, y + width);

        break;

      case directionsEnum.right:
        this.ctx.save();
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, x + (width / 2), y - 5);
        this.ctx.restore();

        this.ctx.moveTo(x + (width * 0.05), y - 5);
        this.ctx.lineTo(x + (width * 0.05), y + 5);
        this.ctx.moveTo(x + (width * 0.05), y);
        this.ctx.lineTo(x + (width * 0.95), y);
        this.ctx.moveTo(x + (width * 0.95), y - 5);
        this.ctx.lineTo(x + (width * 0.95), y + 5);

        break;
      

      default: break;
    }
  }
}
