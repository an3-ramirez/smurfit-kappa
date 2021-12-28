import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

enum directionEnum {
  top,
  bottom,
  right,
  left
}


@Component({
  selector: 'app-box1',
  templateUrl: './box1.component.html',
  styleUrls: ['./box1.component.css']
})
export class Box1Component implements OnInit, AfterViewInit {


  @ViewChild('canvasRef')
  canvasRef!: ElementRef;

  private ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.render(150, 150, 200, 80, 130, 20, this.ctx);
  }



  private render(x: number, y: number, width: number, heigth: number, depht: number, fold: number, contexto: CanvasRenderingContext2D) {

    contexto = this.canvasRef.nativeElement.getContext('2d');

    contexto.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    var initialX: number = x;
    var initialY: number = y;


    for (let index = 0; index < 4; index++) {

      if (index != 0) {
        initialX = initialX + depht;

        if (index == 1 || index == 3) {
          this.createFold(initialX, initialY, depht, fold, 1, "bottom", contexto, 0);
          this.createFold(initialX, initialY + width, depht, fold, 1, "top", contexto, 0);
          this.createMeasureLine(initialX, initialY - fold - 10, directionEnum.right, depht, `${depht.toString()} px`, contexto, 0);
          if (index == 3) {
            this.createMeasureLine(initialX + depht + 10, initialY, directionEnum.top, width, `${width.toString()} px`, contexto, 0);
          }
        }

        if (index == 2) {
          this.createRect(3, initialX, initialY + width, depht, heigth, contexto, "top", 0);
          this.createFold(initialX, initialY + (width + heigth), depht, fold + 20, 2, "top", contexto, 0);
        }
        this.createRect(4, initialX, initialY, depht, width, contexto, "none", 0);



      } else {

        this.createRect(4, initialX, initialY, depht, width, contexto, "none", 0);
        this.createFold(initialX, initialY, fold, width, 1, "right", contexto, 4);
        this.createRect(3, initialX, initialY - heigth, depht, heigth, contexto, "bottom", 0);
        this.createMeasureLine(initialX - 10, initialY - heigth, directionEnum.bottom, heigth, `${heigth.toString()} px`, contexto, 0);
        this.createFold(initialX, initialY - heigth, depht, fold + 20, 2, "bottom", contexto, 0);
        this.createMeasureLine(initialX - fold - 10, initialY, directionEnum.bottom, width, `${width.toString()} px`, contexto, 4);
      }



    }


  }


  private createRect(sides: number, x: number, y: number, width: number, heigth: number,
    contexto: CanvasRenderingContext2D, eraseSide: string, lineDash: number) {

    switch (sides) {
      case 3:

        switch (eraseSide) {
          case "top":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x, y + heigth);
            contexto.lineTo(x + width, y + heigth);
            contexto.lineTo(x + width, y);
            contexto.closePath;
            contexto.stroke();
            break;

          case "bottom":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y + heigth);
            contexto.lineTo(x, y);
            contexto.lineTo(x + width, y);
            contexto.lineTo(x + width, y + heigth);
            contexto.closePath;
            contexto.stroke();
            break;
          case "right":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x - width, y);
            contexto.lineTo(x - width, y + heigth);
            contexto.lineTo(x, y + heigth);
            contexto.closePath;
            contexto.stroke();
            break;
          case "left":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x + width, y);
            contexto.lineTo(x + width, y + heigth);
            contexto.lineTo(x, y + heigth);
            contexto.closePath;
            contexto.stroke();
            break;
        }

        break;
      case 4:

        this.createSquare(x, y, width, heigth, contexto, lineDash);
        break;

      default:

    }
  }


  private createSquare(x: number, y: number, width: number, heigth: number, contexto: CanvasRenderingContext2D,
    lineDash: number): any {

    contexto.beginPath
    contexto.moveTo(x, y);
    contexto.setLineDash([lineDash]);
    contexto.strokeRect(x, y, width, heigth);
    contexto.closePath;

  }

  private createFold(x: number, y: number, width: number, heigth: number, form: number, eraseSide: String,
    contexto: CanvasRenderingContext2D, lineDash: number) {

    switch (form) {

      case 1:
        switch (eraseSide) {
          case "top":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x + (width * 0.20), y + heigth);
            contexto.lineTo(x + (width * 0.80), y + heigth);
            contexto.lineTo(x + width, y);
            contexto.closePath;
            contexto.stroke();
            break;

          case "bottom":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x + (width * 0.20), y - heigth);
            contexto.lineTo(x + (width * 0.80), y - heigth);
            contexto.lineTo(x + width, y);
            contexto.closePath;
            contexto.stroke();
            break;
          case "right":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x - width, y + (heigth * 0.10));
            contexto.lineTo(x - width, y + (heigth * 0.90));
            contexto.lineTo(x, y + heigth);
            contexto.closePath;
            contexto.stroke();
            break;
          default: break;
        }
        break;
      case 2:
        switch (eraseSide) {
          case "top":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x, y + (heigth * 0.50));
            contexto.lineTo(x + (width * 0.20), y + heigth);
            contexto.lineTo(x + (width * 0.80), y + heigth);
            contexto.lineTo(x + width, y + (heigth * 0.50));
            contexto.lineTo(x + width, y);
            contexto.lineTo(x + width, y);
            contexto.closePath;
            contexto.stroke();
            break;

          case "bottom":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.lineTo(x, y - (heigth * 0.50));
            contexto.lineTo(x + (width * 0.20), y - heigth);
            contexto.lineTo(x + (width * 0.80), y - heigth);
            contexto.lineTo(x + width, y - (heigth * 0.50));
            contexto.lineTo(x + width, y);
            contexto.closePath;
            contexto.stroke();
            break;

          default: break;
        }
        break;
      case 3:
        switch (eraseSide) {
          case "top":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.arc(x + (width / 2), y, width / 2, 0, Math.PI, false);
            contexto.closePath;
            contexto.stroke();
            break;

          case "bottom":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x, y);
            contexto.arc(x + (width / 2), y, width / 2, 0, Math.PI, true);
            contexto.closePath;
            contexto.stroke();
            break;

          default: break;
        }
        break;

      case 4:
        switch (eraseSide) {
          case "top":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x + width, y);
            contexto.lineTo(x + width, y + (heigth / 2))
            contexto.ellipse(x + (width / 2), y + (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, false);
            contexto.lineTo(x, y)
            contexto.closePath;
            contexto.stroke();
            break;

          case "bottom":
            contexto.beginPath
            contexto.setLineDash([lineDash]);
            contexto.moveTo(x + width, y);
            contexto.lineTo(x + width, y - (heigth / 2))
            contexto.ellipse(x + (width / 2), y - (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, true);
            contexto.lineTo(x, y)
            contexto.closePath;
            contexto.stroke();
            break;

          default: break;
        }
        break;

      default: break;

    }
  }

  private createMeasureLine(x: number, y: number, directionline: directionEnum, width: number, text: string,
    contexto: CanvasRenderingContext2D, lineDash: number) {

    switch (directionline) {
      case directionEnum.top:

        contexto.save();
        contexto.translate(x + 5, y + (width / 2));
        contexto.rotate(Math.PI / 2);
        contexto.font = "italic 12px arial";
        contexto.textAlign = "center";
        contexto.fillText(text, 0, 0);
        contexto.restore();

        contexto.beginPath;
        contexto.setLineDash([lineDash]);
        contexto.moveTo(x - 5, y);
        contexto.lineTo(x + 5, y);
        contexto.moveTo(x, y);
        contexto.lineTo(x, y + width);
        contexto.moveTo(x - 5, y + width);
        contexto.lineTo(x + 5, y + width);
        contexto.closePath;
        contexto.stroke();

        break;

      case directionEnum.bottom:

        contexto.save();
        contexto.translate(x - 5, y + (width / 2));
        contexto.rotate(Math.PI * 1.5);
        contexto.font = "italic 12px arial";
        contexto.textAlign = "center";
        contexto.fillText(text, 0, 0);
        contexto.restore();

        contexto.beginPath;
        contexto.setLineDash([lineDash]);
        contexto.moveTo(x - 5, y);
        contexto.lineTo(x + 5, y);
        contexto.moveTo(x, y);
        contexto.lineTo(x, y + width);
        contexto.moveTo(x - 5, y + width);
        contexto.lineTo(x + 5, y + width);
        contexto.closePath;
        contexto.stroke();
        break;

      case directionEnum.right:
        contexto.save();
        contexto.font = "italic 12px arial";
        contexto.textAlign = "center";
        contexto.fillText(text, x + (width / 2), y - 5);
        contexto.restore();


        contexto.beginPath;
        contexto.setLineDash([lineDash]);
        contexto.moveTo(x + (width * 0.05), y - 5);
        contexto.lineTo(x + (width * 0.05), y + 5);
        contexto.moveTo(x + (width * 0.05), y);
        contexto.lineTo(x + (width * 0.95), y);

        contexto.moveTo(x + (width * 0.95), y - 5);
        contexto.lineTo(x + (width * 0.95), y + 5);
        contexto.closePath;
        contexto.stroke();
        break;
      case directionEnum.left:
        break;
      default: break;
    }






  }

}
