import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  private _parametros: any;
  jugadores=[];
  nuevoJugador= {};
  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService) {
  }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url+'Jugador?idEquipo='+this._parametros.idEquipo)
          .subscribe(
            (res:Response)=>{
              this.jugadores = res.json();
            },
            (err)=>{
              console.log(err)
            }
          )
      });
  }
  crearEquipo(nombre:string){
    let jugador = {
      nombre:nombre,
      idEquipo:this._parametros.idEquipo
    };
    this._http.post(this._masterURL.url+'Jugador',jugador)
      .subscribe(
        (res:Response)=>{
          this.jugadores.push(res.json());
          this.nuevoJugador = {};
        },
        (err)=>{
          console.log(err)
        }
      )
  }
}
