import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  title: string = "Bienvenidos a Ingresar Equipos";
  nuevoEquipo: any = {};
  Equipos = [];
  disabledButtons={
    NuevoEquipoFormSubmitButton:false
  };
  constructor(private _http: Http,
              private _masterURL:MasterUrlService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url+"Equipo")
      .subscribe(
        (res:Response)=>{
          this.Equipos=res.json().map((value)=>{
            value.formularioCerrado=true;
            return value;
          });
        },
        (err)=>{
          console.log(err)
        }
      )
  }
  crearEquipo(formulario:NgForm) {
    this.disabledButtons.NuevoEquipoFormSubmitButton=true;
    let nuevoEquipo={
      nombre:formulario.value.nombre,
      fechaCreacion:formulario.value.fechaCreacion,
      paisResidencia:formulario.value.paisResidencia
    };
    this._http.post(this._masterURL.url + "Equipo", nuevoEquipo)
      .subscribe(
        (res)=>{
          console.log("No hubo Errores");
          console.log(res);
          this.Equipos.push(res.json());
          this.nuevoEquipo={};
          this.disabledButtons.NuevoEquipoFormSubmitButton=false;
        },
        (err)=>{
          this.disabledButtons.NuevoEquipoFormSubmitButton=false;
          console.log("Ocurrio un error",err);
        },
        ()=>{
          console.log("Termino la función vamos a las casas");
        }
      );
  }
  borrarEquipo(id:number){
    this._http.delete(this._masterURL.url+"Equipo/" +id)
      .subscribe(
        (res)=>{
          let equipoBorrado=res.json();
          this.Equipos=this.Equipos.filter(value=>equipoBorrado.id!=value.id)
        },
        (err)=>{
          console.log(err);
        }
      )
  }
  actualizarEquipo(equipo:any){
    let parametros = {
      nombre:equipo.nombre,
      fechaCreacion:equipo.fechaCreacion,
      paisResidencia:equipo.paisResidencia
    };
    this._http.put(this._masterURL.url+"Equipo/"+equipo.id,parametros)
      .subscribe(
        (res: Response)=>{
          equipo.formularioCerrado=!equipo.formularioCerrado;
          console.log("Respuesta", res.json());
        },
        (err)=>{
          console.log("Error"+err);
        }
      )
  }

}
