import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { directionsEnum } from '../enum/directionsEnum';

import { CreateFoldService } from '../service/createFold/create-fold.service';

import { CreateMeasureLineServiceService } from '../service/createMeasureLine/create-measure-line.service';

import { CreateRectServiceService } from '../service/createRect/create-rect.service';


@Component({
  selector: 'app-box1',
  templateUrl: './box1.component.html',
  styleUrls: ['./box1.component.css']
})
export class Box1Component implements OnInit, AfterViewInit, OnChanges {


  @ViewChild('canvasRef')
  private canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private foldService : CreateFoldService;
  private measureLineService : CreateMeasureLineServiceService;
  private rectService : CreateRectServiceService;

  /** Inputs */
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public z: number = 0;
  @Input() public foldHeight: number = 0;
  @Input() public shapeFold: number = 0;


  constructor(foldService : CreateFoldService, measureLineService : CreateMeasureLineServiceService, 
    rectService :  CreateRectServiceService) { 
    this.foldService = foldService;
    this.measureLineService = measureLineService;
    this.rectService = rectService; 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.x != 0 && this.y != 0 && this.z != 0 &&  this.shapeFold != 0 && this.ctx != undefined) {
      this.render(this.x, this.y, this.z, this.foldHeight, this.shapeFold,  this.ctx);
    }
  }

  ngAfterViewInit() {

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.rectService.setContexto(this.ctx);
    this.foldService.setContext(this.ctx);
    this.measureLineService.setContexto(this.ctx);

  }

  private render(x: number, y: number, depht: number, fold: number, shapeFold : number, ctx: CanvasRenderingContext2D) {
 
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
          this.foldService.createFold(initialX, initialY, depht, fold, shapeFold, directionsEnum.bottom, 0);
          this.foldService.createFold(initialX, initialY + x, depht, fold, shapeFold, directionsEnum.top, 0);
          this.measureLineService.createMeasureLine(initialX, initialY - fold - 10, directionsEnum.right, depht, `${depht.toString()} px`, 0);
          if (index == 3) {
            this.measureLineService.createMeasureLine(initialX + depht + 10, initialY, directionsEnum.top, x, `${x.toString()} px`, 0);
          }
        }

        if (index == 2) {
          this.rectService.createRect(3, initialX, initialY + x, depht, y, directionsEnum.top, 0);
          this.foldService.createFold(initialX, initialY + (x + y), depht, fold + 20, 2, directionsEnum.top, 0);
        }
        this.rectService.createRect(4, initialX, initialY, depht, x, directionsEnum.none, 0);

      } else {
        this.rectService.createRect(4, initialX, initialY, depht, x, directionsEnum.none, 0);
        this.foldService.createFold(initialX, initialY, fold, x, shapeFold, directionsEnum.right, 4);
        this.rectService.createRect(3, initialX, initialY, depht, y, directionsEnum.bottom, 0);
        this.measureLineService.createMeasureLine(initialX - 10, initialY - y, directionsEnum.bottom, y, `${y.toString()} px`, 0);
        this.foldService.createFold(initialX, initialY - y, depht, fold + 20, 2, directionsEnum.bottom, 0);
        this.measureLineService.createMeasureLine(initialX - fold - 10, initialY, directionsEnum.bottom, x, `${x.toString()} px`, 4);
      }
    }

    contexto.stroke();

  }

  

  


}
