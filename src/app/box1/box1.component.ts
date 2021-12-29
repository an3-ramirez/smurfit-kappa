import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

enum directionEnum {
  top,
  bottom,
  right,
  left,
  none
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
  @Input() public shapeFold: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.x != 0 && this.y != 0 && this.z != 0 &&  this.shapeFold != 0 && this.ctx != undefined) {
      this.render(this.x, this.y, this.z, this.foldHeight, this.shapeFold,  this.ctx);
    }
  }

  ngAfterViewInit() {

    this.ctx = this.canvasRef.nativeElement.getContext('2d');

  }

  private render(x: number, y: number, depht: number, fold: number, shapeFold : number, ctx: CanvasRenderingContext2D) {
  console.log('variable', typeof shapeFold);
    var contexto: CanvasRenderingContext2D = ctx;

    contexto.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    var initialX: number = this.canvasRef.nativeElement.width / 2;

    initialX = initialX - (depht * 2);

    var initialY: number = this.canvasRef.nativeElement.height / 2;

    initialY = initialY - (x / 2);

    contexto.beginPath();

    for (let index = 0; index < 4; index++) {

      if (index != 0) {
        initialX = initialX + depht;

        if (index == 1 || index == 3) {
          this.createFold(initialX, initialY, depht, fold, shapeFold, directionEnum.bottom, 0);
          this.createFold(initialX, initialY + x, depht, fold, shapeFold, directionEnum.top, 0);
          this.createMeasureLine(initialX, initialY - fold - 10, directionEnum.right, depht, `${depht.toString()} px`, 0);
          if (index == 3) {
            this.createMeasureLine(initialX + depht + 10, initialY, directionEnum.top, x, `${x.toString()} px`, 0);
          }
        }

        if (index == 2) {
          this.createRect(3, initialX, initialY + x, depht, y, directionEnum.top, 0, this.ctx);
          this.createFold(initialX, initialY + (x + y), depht, fold + 20, 2, directionEnum.top, 0);
        }
        this.createRect(4, initialX, initialY, depht, x, directionEnum.none, 0, this.ctx);

      } else {
        this.createRect(4, initialX, initialY, depht, x, directionEnum.none, 0, contexto);
        this.createFold(initialX, initialY, fold, x, shapeFold, directionEnum.right, 4);
        this.createRect(3, initialX, initialY, depht, y, directionEnum.bottom, 0, contexto);
        this.createMeasureLine(initialX - 10, initialY - y, directionEnum.bottom, y, `${y.toString()} px`, 0);
        this.createFold(initialX, initialY - y, depht, fold + 20, 2, directionEnum.bottom, 0);
        this.createMeasureLine(initialX - fold - 10, initialY, directionEnum.bottom, x, `${x.toString()} px`, 4);
      }
    }

    contexto.stroke();

  }

  createRect(sides: number, x: number, y: number, width: number, heigth: number, eraseSide: directionEnum, lineDash: number,
    contexto: CanvasRenderingContext2D) {

    switch (sides) {
      case 3:

        switch (eraseSide) {
          case directionEnum.top:


            contexto.moveTo(x, y);
            contexto.lineTo(x, y + heigth);
            contexto.lineTo(x + width, y + heigth);
            contexto.lineTo(x + width, y);

            break;

          case directionEnum.bottom:


            contexto.moveTo(x, y);
            contexto.lineTo(x, y - heigth);
            contexto.lineTo(x + width, y - heigth);
            contexto.lineTo(x + width, y);

            break;
          case directionEnum.right:


            contexto.moveTo(x, y);
            contexto.lineTo(x - width, y);
            contexto.lineTo(x - width, y + heigth);
            contexto.lineTo(x, y + heigth);

            break;
          case directionEnum.left:


            contexto.moveTo(x, y);
            contexto.lineTo(x + width, y);
            contexto.lineTo(x + width, y + heigth);
            contexto.lineTo(x, y + heigth);

            break;
        }

        break;
      case 4:

        this.createSquare(x, y, width, heigth, lineDash, contexto);
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

  private createFold(x: number, y: number, width: number, heigth: number, form: number, eraseSide: directionEnum, lineDash: number) {

    switch (form) {

      case 1:
        switch (eraseSide) {
          case directionEnum.top:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y);

            break;

          case directionEnum.bottom:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (width * 0.20), y - heigth);
            this.ctx.lineTo(x + (width * 0.80), y - heigth);
            this.ctx.lineTo(x + width, y);

            break;
          case directionEnum.right:


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
          case directionEnum.top:

            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y + heigth);
            this.ctx.lineTo(x + (width * 0.80), y + heigth);
            this.ctx.lineTo(x + width, y + (heigth * 0.50));
            this.ctx.lineTo(x + width, y);
            this.ctx.lineTo(x + width, y);

            break;

          case directionEnum.bottom:


            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - (heigth * 0.50));
            this.ctx.lineTo(x + (width * 0.20), y - heigth);
            this.ctx.lineTo(x + (width * 0.80), y - heigth);
            this.ctx.lineTo(x + width, y - (heigth * 0.50));
            this.ctx.lineTo(x + width, y);

            break;

            
          case directionEnum.right:


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
          case directionEnum.top:
          
            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y + (heigth / 2));
            this.ctx.ellipse(x + (width / 2), y + (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, false);
            this.ctx.lineTo(x, y)

            break;

          case directionEnum.bottom:

            this.ctx.moveTo(x + width, y);
            this.ctx.lineTo(x + width, y - (heigth / 2));
            this.ctx.ellipse(x + (width / 2), y - (heigth / 2), width / 2, heigth / 2, 0, 0, Math.PI, true);
            this.ctx.lineTo(x, y);

            break;

            case directionEnum.right:

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


        this.ctx.moveTo(x - 5, y);
        this.ctx.lineTo(x + 5, y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.moveTo(x - 5, y + width);
        this.ctx.lineTo(x + 5, y + width);

        break;

      case directionEnum.bottom:

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

      case directionEnum.right:
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
      case directionEnum.left:
        break;
      default: break;
    }
  }

}
