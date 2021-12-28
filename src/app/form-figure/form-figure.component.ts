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

  constructor(private formBuilder: FormBuilder) {
    this.formRef = this.formBuilder.group({
      x: [50, Validators.required],
      y: [100, Validators.required],
      z: [150, Validators.required],
      typeBox: ['Clasic', Validators.required],
      foldHeight: [20]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submit.emit(this.formRef.value);
  }

}
