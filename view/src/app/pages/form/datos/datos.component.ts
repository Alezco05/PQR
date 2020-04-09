import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormGroupDirective } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from '../../../interfaces/usuarios';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: "app-datos",
  templateUrl: "./datos.component.html",
  styleUrls: ["./datos.component.scss"]
})
export class DatosComponent implements OnInit {
  pattern: string = "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}";
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private usarioService: UsuarioService
  ) { }
  ngOnInit() {
    this.makeForm(null, null);
  }
  // Formulario
  makeForm(usuario: Usuario, cedula) {
    // Se crean las variables
    let nombre, apellido, email, phone;
    // Si la cedula esta en la base de datos
    if (usuario !== null) {
      cedula = usuario.Identificacion;
      nombre = usuario.Nombre;
      apellido = usuario.Apellidos;
      email = usuario.Email;
      phone = usuario.Telefono
    }
    else {
      if (cedula === null) cedula = '';
      nombre = '';
      apellido = '';
      email = '';
      phone = '';
    }
    this.form = this.formBuilder.group({
      cedula: [
        cedula,
        [
          Validators.required,
          Validators.min(100000),
          Validators.max(9999999999),
        ]
      ],
      nombre: [
        nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
          Validators.pattern(this.pattern)
        ]
      ],
      apellido: [
        apellido,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(this.pattern)
        ]
      ],
      email: [
        email,
        [ 
          Validators.required,
          Validators.email
        ]
      ],
      phone: [
        phone,
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(4000000000),
          Validators.pattern("[0-9]+")
        ]
      ],
      terminos: [false, DatosComponent.mustBeTruthy]
    });
  }
  // Los terminos deben ser leidos
  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }
  // Tomar Datos del Formulario para Validar
  get cedula() {
    return this.form.get("cedula");
  }
  get nombre() {
    return this.form.get("nombre");
  }
  get apellido() {
    return this.form.get("apellido");
  }
  get email() {
    return this.form.get("email");
  }
  get phone() {
    return this.form.get("phone");
  }
  get terminos() {
    return this.form.get("terminos");
  }
  // Tomar el valor de la cedula
  focusoutHandler(e) {
    this.usarioService.getUsuario(e.target.value).subscribe(
      resp => this.makeForm(resp, e.target.value)
    )
  }
  //Mostrar Ley
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px'
    });
  }
  // Enviar los datos del formulario
  click() {
    const data = {
      cedula: this.form.value.cedula,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      phone: this.form.value.phone
    };
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
    this.form.reset();
    localStorage.setItem('datos', JSON.stringify(data));
    this.router.navigate(["/formulario/daño"]);
  }
}
