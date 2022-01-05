import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';

/** Services */
import { CreateMeasureLineService } from 'src/app/service/createMeasureLine/create-measure-line.service';
import { CreateFoldService } from 'src/app/service/createFold/create-fold.service';
import { directionsEnum } from 'src/app/enums/directions-enum';

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
  private foldService: CreateFoldService;
  private measureLineService: CreateMeasureLineService;
  private TypeFoldA : number;
  private TypeFoldB : number;

  public innerWidth: any;
  public innerHeight: any;

  /** inputs */
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public z: number = 0;
  @Input() public foldHeight: number = 0;
  @Input() public shapeFold: number = 0;
  @Input() public foldGroup! : String;
  

  constructor(foldService : CreateFoldService, _measureLineService: CreateMeasureLineService) { 
    this.measureLineService = _measureLineService;
    this.foldService = foldService;
    this.TypeFoldA = 1;
    this.TypeFoldB = 2;
  }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth * 0.64;
    this.innerHeight = window.innerHeight * 0.80;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.x && this.y && this.z && this.ctx != undefined ) {
      this.drawing(this.x, this.y, this.z, this.foldHeight, false, this.foldGroup);
    }
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.foldService.setContext(this.ctx);
    this.measureLineService.setContexto(this.ctx);

    if (this.x && this.y && this.z && this.ctx != undefined) {
      this.drawing(this.x, this.y, this.z, this.foldHeight, true, this.foldGroup);
    }
  }
  
  private drawing(x = 0, y = 0, z = 0, _foldHeight = 0, initiallize : boolean, foldGroup : String) {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.setFoldGroup(foldGroup, initiallize, this.shapeFold);

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
    this.foldService.createFold(posX, posY - y, this.foldHeight, y, this.TypeFoldA, directionsEnum.left);
    
    //ala top
    this.foldService.createFold(posX, posY - y, z, this.foldHeight, this.TypeFoldA, directionsEnum.top);
    
    //ala right
    this.foldService.createFold(posX + z, posY - y, this.foldHeight, y, this.TypeFoldA, directionsEnum.right);

    //tapa

    this.ctx.moveTo(posX + z, posY);
    this.ctx.lineTo(posX + z*2 + y, posY);

    this.foldService.createFold(posX + z*2 + y, posY, this.foldHeight * 2, x, this.TypeFoldB, directionsEnum.right);

    this.ctx.moveTo(posX + z*2 + y, posY + x);
    this.ctx.lineTo(posX + z, posY + x);

    //bottom alas
    //ala right
    this.foldService.createFold(posX + z, posY + x, this.foldHeight, y, this.TypeFoldA, directionsEnum.right);

    //ala bottom
    this.foldService.createFold(posX, posY + x + y, z, this.foldHeight, this.TypeFoldA, directionsEnum.bottom);

    //ala left
    this.foldService.createFold(posX, posY + x, this.foldHeight, y, this.TypeFoldA, directionsEnum.left);

    //fron box
    this.ctx.moveTo(posX, posY + x );
    this.ctx.lineTo(posX - y, posY + x);
    this.ctx.lineTo(posX - y, posY);
    this.ctx.lineTo(posX, posY);

    
    this.measureLineService.createMeasureLine(posX, posY - y - widthAla - spMeasure, directionsEnum.right, z, `${z.toString()} px`);
    this.measureLineService.createMeasureLine(posX + z + widthAla + spMeasure, posY - y, directionsEnum.top, y, `${y.toString()} px`);
    this.measureLineService.createMeasureLine(posX - y - spMeasure, posY, directionsEnum.bottom, x, `${x.toString()} px`);

    this.ctx.stroke();
  }

  
  private setFoldGroup(foldGroup : String, initialize : boolean, shapeFold : number) : any{
        
    if(!initialize){
     switch(foldGroup){
       case "A":
         this.TypeFoldA = shapeFold;
         break;
       case "B":
         this.TypeFoldB = shapeFold;
         break;
       default : break;  
     }
    
   }
 }

  
  

}
