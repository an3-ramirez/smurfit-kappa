import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-figure',
  templateUrl: './form-figure.component.html',
  styleUrls: ['./form-figure.component.scss']
})
export class FormFigureComponent implements OnInit {

  public formRef!: FormGroup;

  /** Outputs */
  @Output() submit = new EventEmitter();
  @Output() onType = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.formRef = this.formBuilder.group({
      x: [50, Validators.required],
      y: [100, Validators.required],
      z: [150, Validators.required],
      typeBox: ['box1', Validators.required],
      foldHeight: [20]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submit.emit(this.formRef.value);
  }

  changetype() {
    //console.log('cambio el tipo: ', this.formRef.value.typeBox);
    this.onType.emit(this.formRef.value.typeBox);
  }

}
