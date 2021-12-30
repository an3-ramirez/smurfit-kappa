import { Component, OnInit } from '@angular/core';

/** Enums */
import { BoxTypeEnum } from 'src/app/enums/box-type-enum';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {

  public x!: number;
  public y!: number;
  public z!: number;
  public foldHeight!: number;
  public shapeFold : number = 1;
  public typeBox: BoxTypeEnum = BoxTypeEnum.BOX_ONE;

  public BoxTypeEnum = BoxTypeEnum;
  
  constructor() { }

  ngOnInit(): void {
  }

  changeForm(values: { x: number; y: number; z: number; foldHeight: number; shapeFold : number; typeBox: BoxTypeEnum }) {
    
    if (values) {
      this.x = values.x;
      this.y = values.y;
      this.z = values.z;
      this.foldHeight = values.foldHeight;
      this.shapeFold =  Number(values.shapeFold);
      this.typeBox = values.typeBox;
    }
  }

}
