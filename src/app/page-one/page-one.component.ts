import { Component, OnInit } from '@angular/core';

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
  public typeBox: string = 'box1';
  
  constructor() { }

  ngOnInit(): void {
  }

  changeForm(values: { x: number; y: number; z: number; foldHeight: number; typeBox: string }) {
    //console.log('values: ', values);
    if (values) {
      this.x = values.x;
      this.y = values.y;
      this.z = values.z;
      this.foldHeight = values.foldHeight;
      this.typeBox = values.typeBox;
    }
  }

}
