import { Injectable } from '@angular/core';

/** Enums */
import { directionsEnum } from 'src/app/enums/directions-enum';

/** Interfaces */
import { IMeasures } from 'src/app/interfaces/IMeasures';

@Injectable({
  providedIn: 'root'
})
export class CreateFoldService {

  private ctx! : CanvasRenderingContext2D;

  constructor() { }

  public setContext(contexto : CanvasRenderingContext2D){
    this.ctx = contexto;
  }

  public createFold(x: number, y: number, width: number, heigth: number, form: number, positionFold: directionsEnum) {

    const inclination = 0.10;
    const dimensionsVars: IMeasures = {x, y, width, heigth, inclination};
    switch (form) {
      case 1:
        this.shapeTypeOne(positionFold, dimensionsVars)
        break;

      case 2:
        this.shapeTypeTwo(positionFold, dimensionsVars);
        break;
      
      case 3:
        this.shapeTypeTree(positionFold, dimensionsVars);
        break;

      default: break;
    }
  }

  private shapeTypeOne(type: directionsEnum, dimensions: IMeasures) {
    

    switch (type) {
      
      case directionsEnum.top:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x + (dimensions.width * dimensions.inclination), dimensions.y - dimensions.heigth);
        this.ctx.lineTo(dimensions.x + (dimensions.width * (1 - dimensions.inclination)), dimensions.y - dimensions.heigth);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y);
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x + (dimensions.width * dimensions.inclination), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x + (dimensions.width * (1 - dimensions.inclination)), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y);
        break;

      case directionsEnum.left:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x - dimensions.width, dimensions.y + (dimensions.heigth * dimensions.inclination));
        this.ctx.lineTo(dimensions.x - dimensions.width, dimensions.y + (dimensions.heigth * (1 - dimensions.inclination)));
        this.ctx.lineTo(dimensions.x, dimensions.y + dimensions.heigth);
        break;

      case directionsEnum.right:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y + (dimensions.heigth * dimensions.inclination));
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y + (dimensions.heigth * (1 - dimensions.inclination)));
        this.ctx.lineTo(dimensions.x, dimensions.y + dimensions.heigth);
        break;

      default: break;
    }
  }

  private shapeTypeTwo(type: directionsEnum, dimensions: IMeasures) {
    switch (type) {
      
      case directionsEnum.top:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x, dimensions.y - (dimensions.heigth * 0.50));
        this.ctx.lineTo(dimensions.x + (dimensions.width * dimensions.inclination), dimensions.y - dimensions.heigth);
        this.ctx.lineTo(dimensions.x + (dimensions.width * (1 - dimensions.inclination)), dimensions.y - dimensions.heigth);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y - (dimensions.heigth * 0.50));
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y);
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x, dimensions.y + (dimensions.heigth * 0.50));
        this.ctx.lineTo(dimensions.x + (dimensions.width * dimensions.inclination), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x + (dimensions.width * (1 - dimensions.inclination)), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y + (dimensions.heigth * 0.50));
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y);
        break;

      case directionsEnum.left:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x - (dimensions.width /2), dimensions.y );
        this.ctx.lineTo(dimensions.x - dimensions.width , dimensions.y + (dimensions.heigth * dimensions.inclination));
        this.ctx.lineTo(dimensions.x - dimensions.width , dimensions.y + (dimensions.heigth * (1 - dimensions.inclination)));
        this.ctx.lineTo(dimensions.x - (dimensions.width/2), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x , dimensions.y + dimensions.heigth);
        break;

      case directionsEnum.right:
        this.ctx.moveTo(dimensions.x, dimensions.y);
        this.ctx.lineTo(dimensions.x + (dimensions.width /2), dimensions.y );
        this.ctx.lineTo(dimensions.x + dimensions.width , dimensions.y + (dimensions.heigth * dimensions.inclination));
        this.ctx.lineTo(dimensions.x + dimensions.width , dimensions.y + (dimensions.heigth * (1 - dimensions.inclination)));
        this.ctx.lineTo(dimensions.x + (dimensions.width/2), dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x , dimensions.y + dimensions.heigth);
        break;

      default: break;
    }
  }

  private shapeTypeTree(type: directionsEnum, dimensions: IMeasures) {
    switch (type) {
      case directionsEnum.top:
        this.ctx.moveTo(dimensions.x + dimensions.width, dimensions.y);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y - (dimensions.heigth / 2));
        this.ctx.ellipse(dimensions.x + (dimensions.width / 2), dimensions.y - (dimensions.heigth / 2), dimensions.width / 2, dimensions.heigth / 2, 0, 0, Math.PI, true);
        this.ctx.lineTo(dimensions.x, dimensions.y);
        break;

      case directionsEnum.bottom:
        this.ctx.moveTo(dimensions.x + dimensions.width, dimensions.y);
        this.ctx.lineTo(dimensions.x + dimensions.width, dimensions.y + (dimensions.heigth / 2));
        this.ctx.ellipse(dimensions.x + (dimensions.width / 2), dimensions.y + (dimensions.heigth / 2), dimensions.width / 2, dimensions.heigth / 2, 0, 0, Math.PI, false);
        this.ctx.lineTo(dimensions.x, dimensions.y)
        break;


      case directionsEnum.left:
        this.ctx.moveTo(dimensions.x , dimensions.y + dimensions.heigth);
        this.ctx.lineTo(dimensions.x - (dimensions.width/2), dimensions.y + dimensions.heigth);
        this.ctx.ellipse(dimensions.x - (dimensions.width / 2), dimensions.y + (dimensions.heigth / 2), dimensions.heigth / 2, dimensions.width / 2, Math.PI / 2, 0, Math.PI, false);
        this.ctx.lineTo(dimensions.x , dimensions.y);
        break;

      case directionsEnum.right:
        this.ctx.moveTo(dimensions.x , dimensions.y);
        this.ctx.lineTo(dimensions.x + (dimensions.width/2), dimensions.y);
        this.ctx.ellipse(dimensions.x + (dimensions.width / 2), dimensions.y + (dimensions.heigth / 2), dimensions.heigth / 2, dimensions.width / 2, Math.PI * 1.5, 0, Math.PI, false);
        this.ctx.lineTo(dimensions.x , dimensions.y + dimensions.heigth);
        break;

      default: break;
    }
  }
}
