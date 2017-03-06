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
    NuevaEquipoFormSubmitButton:false
  };
  constructor(private _http: Http,
              private _masterURL:MasterUrlService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url+"Equipo")
      .subscribe(
        (res:Response)=>{
          console.log(res.json());
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
    this.disabledButtons.NuevaEquipoFormSubmitButton=true;
    console.log(formulario);

    this._http.post(this._masterURL.url + "Equipo", {
      nombre: formulario.value.nombre
    })
    // .subscribe(respuesta => console.log("respuesta", respuesta));
      .subscribe(
        (res)=>{
          console.log("No hubo Errores");
          console.log(res);
          this.Equipos.push(res.json());
          this.nuevoEquipo={};
          this.disabledButtons.NuevaEquipoFormSubmitButton=false;
        },
        (err)=>{
          this.disabledButtons.NuevaEquipoFormSubmitButton=false;
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
          let equipoBorrada=res.json();
          this.Equipos=this.Equipos.filter(value=>equipoBorrada.id!=value.id)
        },
        (err)=>{
          console.log(err);
        }
      )
  }
  actualizarEquipo(equipo:any){
    let parametros = {
      nombre:equipo.nombre
    };
    this._http.put(this._masterURL.url+"Equipo/"+equipo.id,parametros)
      .subscribe(
        (res)=>{
          equipo.formularioCerrado=!equipo.formularioCerrado;
          console.log("Respuesta", res.json());
        },
        (err)=>{
          console.log("Error"+err);
        }
      )
  }

}
