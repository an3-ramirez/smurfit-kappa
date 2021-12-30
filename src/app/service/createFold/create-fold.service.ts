import { Injectable } from '@angular/core';

import { directionsEnum } from 'src/app/enum/directionsEnum';

@Injectable({
  providedIn: 'root'
})
export class CreateFoldService {


  private ctx! : CanvasRenderingContext2D;

  constructor() { 

    

  }

  public setContext(contexto : CanvasRenderingContext2D){

    this.ctx = contexto;
  }

  public createFold(x: number, y: number, width: number, heigth: number, form: number, eraseSide: directionsEnum, lineDash: number) {

    switch (form) {

      case 1:
        switch (eraseSide) {
          case directionsEnum.top:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y);

            break;

          case directionsEnum.bottom:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.10), y - heigth);
            this.ctx.lineTo(x + (width * 0.90), y - heigth);
            this.ctx.lineTo(x + width, y);

            break;
          case directionsEnum.right:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - width, y + (heigth * 0.10));
            this.ctx.lineTo(x - width, y + (heigth * 0.90));
            this.ctx.lineTo(x, y + heigth);

            break;
          default: break;
        }
        break;
      case 2:
        switch (eraseSide) {
          case directionsEnum.top:

            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y + (heigth * 0.50));
            this.ctx.lineTo(x + width, y);
            this.ctx.lineTo(x + width, y);

            break;

          case directionsEnum.bottom:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y - heigth);
            this.ctx.lineTo(x + (width * 0.80), y - heigth);
            this.ctx.lineTo(x + width, y - (heigth * 0.50));
            this.ctx.lineTo(x + width, y);

            break;

            
          case directionsEnum.right:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - (width /2), y );
            this.ctx.lineTo(x - width , y + (heigth * 0.20));
            this.ctx.lineTo(x - width , y + (heigth * 0.80));
            this.ctx.lineTo(x - (width/2), y + heigth);
            this.ctx.lineTo(x , y + heigth);

            break;

          default: break;
        }
        break;
      
      case 3:
        switch (eraseSide) {
          case directionsEnum.top:
          
            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y + (heigth / 2));
            this.ctx.ellipse(x + (width / 2), y + (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, false);
            this.ctx.lineTo(x, y)

            break;

          case directionsEnum.bottom:

            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y - (heigth / 2));
            this.ctx.ellipse(x + (width / 2), y - (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, true);
            this.ctx.lineTo(x, y);

            break;

            case directionsEnum.right:

            this.ctx.moveTo(x , y + heigth);
            this.ctx.lineTo(x - (width/2), y + heigth);
            this.ctx.ellipse(x - (width / 2), y + (heigth / 2), heigth / 2, width / 2, Math.PI / 2, 0, Math.PI, false);
            this.ctx.lineTo(x , y);

            break;

          default: break;
        }
        break;

      default: break;

    }
  }
}
