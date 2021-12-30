import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** Enums */
import { BoxTypeEnum } from 'src/app/enums/box-type-enum';


@Component({
  selector: 'app-form-figure',
  templateUrl: './form-figure.component.html',
  styleUrls: ['./form-figure.component.scss']
})
export class FormFigureComponent implements OnInit {

  public formRef!: FormGroup;
  public BoxTypeEnum = BoxTypeEnum;

  /** Outputs */
  @Output() submit = new EventEmitter();
  @Output() onType = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.formRef = this.formBuilder.group({
      x: [50, Validators.required],
      y: [100, Validators.required],
      z: [150, Validators.required],
      typeBox: [BoxTypeEnum.BOX_ONE, Validators.required],
      shapeFold: ["1", Validators.required],
      foldGroup: ['A', Validators.required], 
      foldHeight: [20]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submit.emit(this.formRef.value);
  }

  changetype() {
    this.onType.emit(this.formRef.value.typeBox);
  }

}
