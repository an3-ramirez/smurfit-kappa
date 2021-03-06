import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

/** Enums */
import { directionsEnum } from 'src/app/enums/directions-enum';

/** Services */
import { CreateFoldService } from 'src/app/service/createFold/create-fold.service';
import { CreateMeasureLineService } from 'src/app/service/createMeasureLine/create-measure-line.service';
import { CreateRectService } from 'src/app/service/createRect/create-rect.service';



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
  private measureLineService : CreateMeasureLineService;
  private rectService : CreateRectService;

  public innerWidth: any;
  public innerHeight: any;

  /** Inputs */
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public z: number = 0;
  @Input() public foldHeight: number = 0;
  @Input() public shapeFold: number = 0;


  constructor(foldService : CreateFoldService, measureLineService : CreateMeasureLineService, 
    rectService :  CreateRectService) { 
    this.foldService = foldService;
    this.measureLineService = measureLineService;
    this.rectService = rectService; 
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth * 0.63;
    this.innerHeight = window.innerHeight * 0.80;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.x && this.y && this.z &&  this.shapeFold && this.ctx != undefined) {
      this.render(this.x, this.y, this.z, this.foldHeight, this.shapeFold);
    }
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.rectService.setContexto(this.ctx);
    this.foldService.setContext(this.ctx);
    this.measureLineService.setContexto(this.ctx);
    if (this.x && this.y && this.z && this.shapeFold && this.ctx != undefined) {
      this.render(this.x, this.y, this.z, this.foldHeight, this.shapeFold);
    }
  }

  private render(x: number, y: number, depht: number, fold: number, shapeFold : number) {

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    let initialX: number = this.canvasRef.nativeElement.width / 2;
    let initialY: number = this.canvasRef.nativeElement.height / 2;

    initialX = initialX - (depht * 2);
    initialY = initialY - (x / 2);

    this.ctx.beginPath();

    for (let index = 0; index < 4; index++) {

      if (index != 0) {
        initialX = initialX + depht;

        if (index == 1 || index == 3) {
          this.foldService.createFold(initialX, initialY, depht, fold, shapeFold, directionsEnum.top);
          this.foldService.createFold(initialX, initialY + x, depht, fold, shapeFold, directionsEnum.bottom);
          this.measureLineService.createMeasureLine(initialX, initialY - fold - 10, directionsEnum.left, depht, `${depht.toString()} px`);
          if (index == 3) {
            this.measureLineService.createMeasureLine(initialX + depht + 10, initialY, directionsEnum.top, x, `${x.toString()} px`);
          }
        }

        if (index == 2) {
          this.rectService.createRect(3, initialX, initialY + x, depht, y, directionsEnum.top);
          this.foldService.createFold(initialX, initialY + (x + y), depht, fold + 20, 2, directionsEnum.bottom);
        }
        this.rectService.createRect(4, initialX, initialY, depht, x, directionsEnum.none);

      } else {
        this.rectService.createRect(4, initialX, initialY, depht, x, directionsEnum.none);
        this.foldService.createFold(initialX, initialY, fold, x, shapeFold, directionsEnum.left);
        this.rectService.createRect(3, initialX, initialY, depht, y, directionsEnum.bottom);
        this.measureLineService.createMeasureLine(initialX - 10, initialY - y, directionsEnum.bottom, y, `${y.toString()} px`);
        this.foldService.createFold(initialX, initialY - y, depht, fold + 20, 2, directionsEnum.top);
        this.measureLineService.createMeasureLine(initialX - fold - 10, initialY, directionsEnum.bottom, x, `${x.toString()} px`);
      }
    }

    this.ctx.stroke();

  }

}
