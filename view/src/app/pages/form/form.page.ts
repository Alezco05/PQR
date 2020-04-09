import { Component, OnInit } from '@angular/core';
/* import { PqrService } from '../services/pqr.service';
import { environment } from '../../environments/environment.prod';
 */import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
/* import { ProblemList } from '../interfaces/problem-list';
import { Neighbors } from '../interfaces/neighbors';
import { Infrastructures } from '../interfaces/infrastructures'; */
@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage implements OnInit {
  form: FormGroup;
  /* problems: ProblemList[] = [];
  neighbors: Neighbors[] = [];
  infraestuctures: Infrastructures[] = [];
  */ constructor(
//    private pqrService: PqrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.makeForm();
  }
  ionViewDidEnter() {
  }
  makeForm() {
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('[0-9]+')
        ]
      ]
    });
  }
  click() {
    const data = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      infrastructure_id: this.form.value.infrastructure_id,
      phone: this.form.value.phone,
    };
  }
}
