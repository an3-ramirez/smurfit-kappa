import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { CreateFoldService } from '../../service/createFold/create-fold.service';

import { directionsEnum } from '../../enums/directions-enum';

enum posEnum {
  vertical,
  horizont
}

@Component({
  selector: 'app-cube2d',
  templateUrl: './cube2d.component.html',
  styleUrls: ['./cube2d.component.scss']
})
export class Cube2dComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private foldService : CreateFoldService;

  public innerWidth: any;
  public innerHeight: any;

  /** inputs */
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public z: number = 0;
  @Input() public foldHeight: number = 0;

  constructor(foldService : CreateFoldService) { 

     this.foldService = foldService;
  }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth * 0.64;
    this.innerHeight = window.innerHeight * 0.82;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.x && this.y && this.z && this.ctx != undefined ) {
      this.drawing(this.x, this.y, this.z, this.foldHeight);
    }
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.foldService.setContext(this.ctx);

    if (this.x && this.y && this.z && this.ctx != undefined) {
      this.drawing(this.x, this.y, this.z, this.foldHeight);
    }
  }
  
  private drawing(x = 0, y = 0, z = 0, _foldHeight = 0) {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    let posX = this.canvasRef.nativeElement.width / 2;
    posX = posX - z ;
    let posY = this.canvasRef.nativeElement.height / 2;
    posY = posY - (x / 2);
    const spOne = 5;
    const spMeasure = 20;
    const widthAla = _foldHeight;

    this.ctx.fillStyle = 'black';
    this.ctx.setLineDash([4]);
    this.ctx.strokeRect(posX, posY, z, x);
    this.ctx.beginPath();
    this.ctx.moveTo(posX + z + y, posY);
    this.ctx.lineTo(posX + z + y, x + posY);
    this.ctx.moveTo(posX + (z * 2) + y, posY);
    this.ctx.lineTo(posX + (z * 2) + y, x + posY);

    this.ctx.moveTo(posX, posY);
    this.ctx.lineTo(posX, posY - y);
    this.ctx.lineTo(posX + z, posY - y);
    this.ctx.lineTo(posX + z, posY);

    this.ctx.moveTo(posX, posY + x);
    this.ctx.lineTo(posX, posY + x + y);
    this.ctx.lineTo(posX + z, posY + x + y);
    this.ctx.lineTo(posX + z, posY + x);
    this.ctx.stroke();

    //line solid
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    this.ctx.moveTo(posX, posY);

    //top alas
    //ala left
    this.foldService.createFold(posX, posY - y, this.foldHeight, y, 1, directionsEnum.right, 0);
    

    //ala top
    this.foldService.createFold(posX, posY - y, z, this.foldHeight, 1, directionsEnum.bottom, 0);
    
    //ala right
    this.ctx.lineTo(posX + z + widthAla, posY - y + spOne);
    this.ctx.lineTo(posX + z + widthAla, posY - spOne);
    this.ctx.lineTo(posX + z, posY);

    //tapa
    this.ctx.moveTo(posX + z, posY);
    this.ctx.lineTo(posX + z*2 + y, posY);
    this.ctx.lineTo(posX + z*2 + y + widthAla, posY + spOne);
    this.ctx.lineTo(posX + z*2 + y + widthAla, posY + x - spOne);
    this.ctx.lineTo(posX + z*2 + y, posY + x);
    this.ctx.lineTo(posX + z, posY + x);

    //bottom alas
    //ala right
    this.ctx.lineTo(posX + z + widthAla, posY + x + spOne);
    this.ctx.lineTo(posX + z + widthAla, posY + x + y - spOne);
    this.ctx.lineTo(posX + z, posY + x + y);

    //ala bottom
    this.ctx.lineTo(posX + z - spOne, posY + x + y + widthAla);
    this.ctx.lineTo(posX + spOne, posY + x + y + widthAla);
    this.ctx.lineTo(posX, posY + x + y);

    //ala left
    this.ctx.lineTo(posX - widthAla, posY + x + y - spOne);
    this.ctx.lineTo(posX - widthAla, posY + x + spOne);
    this.ctx.lineTo(posX, posY + x);

    //fron box
    this.ctx.moveTo(posX, posY + x );
    this.ctx.lineTo(posX - y, posY + x);
    this.ctx.lineTo(posX - y, posY);
    this.ctx.lineTo(posX, posY);

    
    this.drawingMeasureLine({x:posX, y:posY - y - widthAla - spMeasure}, z, posEnum.horizont, `${z.toString()} px`);

    this.ctx.stroke();
  }

  drawingMeasureLine(point: {x: number; y: number;}, width: number, position: posEnum, text: string = '') {
    this.ctx.font = "italic 12px arial";
    //this.ctx.fillStyle = "red";
    if (position == posEnum.horizont) {
      this.ctx.textAlign = "center";
    }
    this.ctx.fillText(text, position == posEnum.horizont ? point.x + width / 2 : point.x + 5, position == posEnum.horizont ? point.y - 5 : point.y + width / 2);

    this.ctx.moveTo(position == posEnum.horizont ? point.x : point.x - 5, point.y + 5);
    this.ctx.lineTo(point.x, point.y - 5);
    this.ctx.moveTo(point.x, point.y);
    this.ctx.lineTo(point.x + width, point.y);
    this.ctx.moveTo(point.x + width, point.y + 5);
    this.ctx.lineTo(point.x + width, point.y - 5);
  }

  
  

}