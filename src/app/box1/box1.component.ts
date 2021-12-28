import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

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
export class Box1Component implements OnInit, AfterViewInit, OnChanges {


  @ViewChild('canvasRef')
  private canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  /** Inputs */
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public z: number = 0;
  @Input() public foldHeight: number = 0;
  @Input() public shapeType: number = 1;


  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('values');
    if (this.x != 0 && this.y != 0 && this.z != 0 && this.ctx != undefined ) {
      this.render(this.x, this.y, this.z, this.foldHeight);
    }
  }
  
  ngAfterViewInit() {
    console.log('afterView');
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //this.render(180, 90, 140, 20);
  }

  private render(x: number, y: number, depht: number, fold: number) {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    //var initialX: number = fold + 30;
    let initialX: number = 120;
    //var initialY: number = fold + y + 40;
    let initialY: number = 150;
    
    for (let index = 0; index < 4; index++) {

      if (index != 0) {
        initialX = initialX + depht;

        if (index == 1 || index == 3) {
          //this.createFold(initialX, initialY, depht, fold, this.shapeType, "bottom", 0);
          //this.createFold(initialX, initialY + x, depht, fold, this.shapeType, "top", 0);
          //this.createMeasureLine(initialX, initialY - fold - 10, directionEnum.right, depht, `${depht.toString()} px`, 0);
          if (index == 3) {
            //this.createMeasureLine(initialX + depht + 10, initialY, directionEnum.top, x, `${x.toString()} px`, 0);
          }
        }

        if (index == 2) {
          //this.createRect(3, initialX, initialY + x, depht, y, "top", 0);
          //this.createFold(initialX, initialY + (x + y), depht, fold + 20, 2, "top", 0);
        }
        //this.createRect(4, initialX, initialY, depht, x, "none", 0);

      } else {
        //this.createRect(4, initialX, initialY, depht, x, "none", 0);
        //this.createFold(initialX, initialY, fold, x, 1, "right", 4);
        this.createRect(3, initialX, initialY - y, depht, y, "bottom", 0, this.ctx);
        //this.createMeasureLine(initialX - 10, initialY - y, directionEnum.bottom, y, `${y.toString()} px`, 0);
        //this.createFold(initialX, initialY - y, depht, fold + 20, 2, "bottom", 0);
        //this.createMeasureLine(initialX - fold - 10, initialY, directionEnum.bottom, x, `${x.toString()} px`, 4);
      }
    }
    
  }

  private createRect(sides: number, x: number, y: number, width: number, heigth: number, eraseSide: string, lineDash: number, context: CanvasRenderingContext2D) {
    
    console.log('rect ', sides);
    switch (sides) {
      case 3:

        switch (eraseSide) {
          case "top":
            this.ctx.beginPath
            //this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + heigth);
            this.ctx.lineTo(x + width, y + heigth);
            this.ctx.lineTo(x + width, y);
            this.ctx.stroke();
            break;

          case "bottom":
            this.ctx.beginPath
            //this.ctx.setLineDash([lineDash]);
            context.moveTo(x, y + heigth);
            context.lineTo(x, y);
            context.lineTo(x + width, y);
            context.lineTo(x + width, y + heigth);
            context.stroke();
            context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
            break;
          case "right":
            this.ctx.beginPath
            //this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - width, y);
            this.ctx.lineTo(x - width, y + heigth);
            this.ctx.lineTo(x, y + heigth);
            this.ctx.stroke();
            break;
          case "left":
            this.ctx.beginPath
            //this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + width, y);
            this.ctx.lineTo(x + width, y + heigth);
            this.ctx.lineTo(x, y + heigth);
            this.ctx.stroke();
            break;
        }

        break;
      case 4:

        this.createSquare(x, y, width, heigth, lineDash);
        break;

      default:
        console.log('default');
        break;

    }
  }


  private createSquare(x: number, y: number, width: number, heigth: number, lineDash: number): any {

    this.ctx.beginPath
    this.ctx.moveTo(x, y);
    this.ctx.setLineDash([lineDash]);
    this.ctx.strokeRect(x, y, width, heigth);
    this.ctx.stroke();

  }

  private createFold(x: number, y: number, width: number, heigth: number, form: number, eraseSide: String, lineDash: number) {

    switch (form) {

      case 1:
        switch (eraseSide) {
          case "top":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y);
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          case "bottom":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.20), y - heigth);
            this.ctx.lineTo(x + (width * 0.80), y - heigth);
            this.ctx.lineTo(x + width, y);
            this.ctx.closePath;
            this.ctx.stroke();
            break;
          case "right":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - width, y + (heigth * 0.10));
            this.ctx.lineTo(x - width, y + (heigth * 0.90));
            this.ctx.lineTo(x, y + heigth);
            this.ctx.closePath;
            this.ctx.stroke();
            break;
          default: break;
        }
        break;
      case 2:
        switch (eraseSide) {
          case "top":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y + (heigth * 0.50));
            this.ctx.lineTo(x + width, y);
            this.ctx.lineTo(x + width, y);
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          case "bottom":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y - heigth);
            this.ctx.lineTo(x + (width * 0.80), y - heigth);
            this.ctx.lineTo(x + width, y - (heigth * 0.50));
            this.ctx.lineTo(x + width, y);
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          default: break;
        }
        break;
      case 3:
        switch (eraseSide) {
          case "top":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.arc(x + (width / 2), y, width / 2, 0, Math.PI, false);
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          case "bottom":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x, y);
            this.ctx.arc(x + (width / 2), y, width / 2, 0, Math.PI, true);
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          default: break;
        }
        break;

      case 4:
        switch (eraseSide) {
          case "top":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y + (heigth / 2))
            this.ctx.ellipse(x + (width / 2), y + (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, false);
            this.ctx.lineTo(x, y)
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          case "bottom":
            this.ctx.beginPath
            this.ctx.setLineDash([lineDash]);
            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y - (heigth / 2))
            this.ctx.ellipse(x + (width / 2), y - (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, true);
            this.ctx.lineTo(x, y)
            this.ctx.closePath;
            this.ctx.stroke();
            break;

          default: break;
        }
        break;

      default: break;

    }
  }

  private createMeasureLine(x: number, y: number, directionline: directionEnum, width: number, text: string, lineDash: number) {

    switch (directionline) {
      case directionEnum.top:

        this.ctx.save();
        this.ctx.translate(x + 5, y + (width / 2));
        this.ctx.rotate(Math.PI / 2);
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();

        this.ctx.beginPath;
        this.ctx.setLineDash([lineDash]);
        this.ctx.moveTo(x - 5, y);
        this.ctx.lineTo(x + 5, y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.moveTo(x - 5, y + width);
        this.ctx.lineTo(x + 5, y + width);
        this.ctx.closePath;
        this.ctx.stroke();

        break;

      case directionEnum.bottom:

        this.ctx.save();
        this.ctx.translate(x - 5, y + (width / 2));
        this.ctx.rotate(Math.PI * 1.5);
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();

        this.ctx.beginPath;
        this.ctx.setLineDash([lineDash]);
        this.ctx.moveTo(x - 5, y);
        this.ctx.lineTo(x + 5, y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.moveTo(x - 5, y + width);
        this.ctx.lineTo(x + 5, y + width);
        this.ctx.closePath;
        this.ctx.stroke();
        break;

      case directionEnum.right:
        this.ctx.save();
        this.ctx.font = "italic 12px arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, x + (width / 2), y - 5);
        this.ctx.restore();


        this.ctx.beginPath;
        this.ctx.setLineDash([lineDash]);
        this.ctx.moveTo(x + (width * 0.05), y - 5);
        this.ctx.lineTo(x + (width * 0.05), y + 5);
        this.ctx.moveTo(x + (width * 0.05), y);
        this.ctx.lineTo(x + (width * 0.95), y);

        this.ctx.moveTo(x + (width * 0.95), y - 5);
        this.ctx.lineTo(x + (width * 0.95), y + 5);
        this.ctx.closePath;
        this.ctx.stroke();
        break;
      case directionEnum.left:
        break;
      default: break;
    }
  }

}
