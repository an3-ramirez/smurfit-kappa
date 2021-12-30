import { Injectable } from '@angular/core';

import { directionsEnum } from 'src/app/enum/directionsEnum';

@Injectable({
  providedIn: 'root'
})
export class CreateRectServiceService {

  private ctx! : CanvasRenderingContext2D;

  constructor() { }


  public setContexto(contexto : CanvasRenderingContext2D){
    this.ctx = contexto;
  }

  public createRect(sides: number, x: number, y: number, width: number, heigth: number, eraseSide: directionsEnum, lineDash: number) {

    switch (sides) {
      case 3:

        switch (eraseSide) {
          case directionsEnum.top:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + heigth);
            this.ctx.lineTo(x + width, y + heigth);
            this.ctx.lineTo(x + width, y);

            break;

          case directionsEnum.bottom:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - heigth);
            this.ctx.lineTo(x + width, y - heigth);
            this.ctx.lineTo(x + width, y);

            break;
          case directionsEnum.right:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - width, y);
            this.ctx.lineTo(x - width, y + heigth);
            this.ctx.lineTo(x, y + heigth);

            break;
          case directionsEnum.left:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + width, y);
            this.ctx.lineTo(x + width, y + heigth);
            this.ctx.lineTo(x, y + heigth);

            break;
        }

        break;
      case 4:

        this.createSquare(x, y, width, heigth, lineDash, this.ctx);
        break;

      default:

        break;

    }
  }


  private createSquare(x: number, y: number, width: number, heigth: number, lineDash: number,
    contexto: CanvasRenderingContext2D) {

    contexto.moveTo(x, y);
    contexto.setLineDash([lineDash]);
    contexto.strokeRect(x, y, width, heigth);

  }
}
