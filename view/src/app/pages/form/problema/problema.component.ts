import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Usuario } from 'src/app/interfaces/usuarios';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Reporte } from 'src/app/interfaces/reportes';
import { ReporteService } from 'src/app/services/reporte.service';
@Component({
  selector: "app-problema",
  templateUrl: "./problema.component.html",
  styleUrls: ["./problema.component.scss"]
})
export class ProblemaComponent implements OnInit {
  form: FormGroup;
  ipAddress: string;
  postes: string[] = ["METALICO", "CONCRETO"];
  luminarias: string[] = ["FAROL", "LAMPARA", "REFLECTOR"];
  problemas: string[] = [
    "HURTO DE LUMINARIA",
    "LUMINARIA APAGADA",
    "LUMINARIA DIRECTA",
    "LUMNIARIA INTERMENTETE",
    "SECTOR APAGADO",
    "PARQUE APAGADO",
    "CABLE EN EL SUELO"
  ];
  usuario: Usuario;
  datos;
  damage;
  data: Reporte;
  date: string = moment().format('YYYY-MM-DD');
  hora = moment().format('h:mm:ss');
  constructor(private formBuilder: FormBuilder, private router: Router, private ip: DataService
    , private usuarioService: UsuarioService, private reporteService: ReporteService) { }
  ngOnInit() {
    this.makeForm();
    this.getIP();
    this.datos = JSON.parse(localStorage.getItem('datos'));
    this.damage = JSON.parse(localStorage.getItem('damage'));
  }
  makeForm() {
    this.form = this.formBuilder.group({
      poste: ["", Validators.required],
      luminaria: ["", Validators.required],
      problema: ["", Validators.required],
      issue: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
          Validators.pattern(
            "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
          )
        ]
      ]
    });
  } // Tomar Datos del Formulario para Validar
  get poste() {
    return this.form.get("poste");
  }
  get luminaria() {
    return this.form.get("luminaria");
  }
  get problema() {
    return this.form.get("problema");
  }
  get issue() {
    return this.form.get("issue");
  }
  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip
    });
  }
  createUser(user: Usuario) {
 
    this.usuario = {
      Identificacion: this.datos.cedula,
      Nombre: this.datos.nombre,
      Apellidos: this.datos.apellido,
      Email: this.datos.email,
      Telefono: this.datos.phone,
      Fecha_HD: this.date,
      IP_Equipo: this.ipAddress,
    };
    if (user === null) {
      this.usuarioService.createUsuario(this.usuario).subscribe(
        resp => console.log(resp),
        error => console.log(error)
      );
    }
    else {
      this.usuarioService.updateUsuario(this.datos.cedula, this.usuario).subscribe(
        resp => console.log(""),
        error => console.log(error)
      );
    }
  }
  click() {
    this.data = {
      DireccionD: this.damage.direccion,
      CmunicipioD: this.damage.municipio.codigo,
      MunicipioD: this.damage.municipio.nombre,
      BarrioD: this.damage.barrio,
      Tposte: this.form.value.poste,
      Tluminaria: this.form.value.luminaria,
      Tproblema: this.form.value.problema,
      Dproblema: this.form.value.issue.toUpperCase(),
      fechaD: this.date,
      HoraReporte: this.hora,
      IdentUsu: this.datos.cedula,
      ape_us: this.datos.apellido.toUpperCase(),
      nom_us: this.datos.nombre.toUpperCase(),
      correo: this.datos.email.toLowerCase(),
      celular: this.datos.phone,
      IPEquipo: this.ipAddress
    };
    this.usuarioService.getUsuario(this.datos.cedula).subscribe(
      resp => this.createUser(resp),
      error => console.log(error)
    );
   this.reporteService.createReporte(this.data).subscribe(
      resp => {
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key).setErrors(null) ;
        });
        localStorage.clear();
        Swal.fire({
          title: "Exito!",
          html: "El daño ha sido reportado.",
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        });
        this.router.navigate(["formulario"]);
      },
      () => {
        Swal.fire({
          title: "Error!",
          html: "Intente mas tarde",
          icon: 'error',
          timer: 2000,
          timerProgressBar: true
        });
      }
    );    
  }
}
