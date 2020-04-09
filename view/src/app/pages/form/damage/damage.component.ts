import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { MunicipioService } from 'src/app/services/municipio.service';
import { Barrio } from 'src/app/interfaces/barrio';
import { Municipio } from 'src/app/interfaces/municipio';

@Component({
  selector: "app-damage",
  templateUrl: "./damage.component.html",
  styleUrls: ["./damage.component.scss"]
})
export class DamageComponent implements OnInit {
  form: FormGroup;
  pattern: string = "^[1-9]+[1-9a-zA-Z]*";
  municipios: Municipio[] = [];
  barrios: Barrio[] = [];
  selected = false;
  calles: string[] = [
    "CARRERA",
    "CALLE",
    "AVENIDA",
    "BALNEARIO",
    "CANCHA",
    "DIAGONAL"
  ];
  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl("auto");
  constructor(private formBuilder: FormBuilder, private router: Router,
    private municipioService: MunicipioService) { }
  ngOnInit() {
    this.makeForm();
    this.municipioService.getMunicipios().subscribe(
      resp => this.municipios = resp
    );

  }
  ionViewDidEnter() { }
  makeForm() {
    this.form = this.formBuilder.group({
      tipo: ["", Validators.required],
      numero1: ["",
       [ Validators.required,
        Validators.maxLength(4),
        Validators.pattern(this.pattern)]
      ],
      numero2: ["", [Validators.required,
        Validators.pattern(this.pattern)]
      ],
      numero3: ["", Validators.required],
      referencia: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(40)]
      ],
      municipio: ["", Validators.required],
      barrio: ["", Validators.required]
    });
  }
  get tipo() {
    return this.form.get("tipo");
  }
  get numero1() {
    return this.form.get("numero1");
  }
  get numero2() {
    return this.form.get("numero1");
  }
  get numero3() {
    return this.form.get("numero3");
  }
  get municipio() {
    return this.form.get("municipio");
  }
  get barrio() {
    return this.form.get("barrio");
  }
  get referencia() {
    return this.form.get("referencia");
  }
  selectOpt(e) {
    this.selected = true;
    this.form.controls.barrio.setValue('');
    this.municipioService.getBarrios().subscribe(
      resp => this.barrios = resp
    );
    this.municipioService.getBarrios().subscribe(
      resp => {
        this.barrios = resp;
        this.barrios = this.barrios.filter(cit => cit.CMun === e.value.codigo);
      },
      err => console.log(err)
    );
  }
  click() {
    const direccion = `${this.form.value.tipo} ${this.form.value.numero1} # ${this.form.value.numero2.trim().replace(/ /g, "")} - ${this.form.value.numero3}`;
    const data = {
      direccion,
      municipio: this.form.value.municipio,
      barrio: this.form.value.barrio,
      referencia: this.form.value.referencia
    };
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
    localStorage.setItem('damage', JSON.stringify(data));
    this.router.navigate(["/formulario/problema"]);
  }
}
