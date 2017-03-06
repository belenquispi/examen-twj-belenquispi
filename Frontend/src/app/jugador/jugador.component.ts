import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  private _parametros;
  jugadores = [];
  nuevoJugador = {};
  disabledButtons = {
    NuevoJugadorFormSubmitButton: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http: Http,
              private _masterURL: MasterUrlService) {
  }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Jugador?idEquipo=' + this._parametros.idEquipo)
          .subscribe(
            (res: Response) => {
              this.jugadores = res.json()
                .map((value) => {
                  value.formularioCerrado = true;
                  return value;
                });
            },
            (err) => {
              console.log(err)
            }
          )
      });
  }

  crearJugador(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevoJugadorFormSubmitButton = true;
    let nuevitoJugador = {
      nombre: formulario.value.nombre,
      fichadoHasta: formulario.value.fichadoHasta,
      posicion: formulario.value.posicion,
      idEquipo: this._parametros.idEquipo
    };
    this._http.post(this._masterURL.url + 'Jugador', nuevitoJugador)
      .subscribe(
        (res: Response) => {
          this.jugadores.push(res.json());
          this.nuevoJugador = {};
          this.disabledButtons.NuevoJugadorFormSubmitButton = false;
        },
        (err) => {
          this.disabledButtons.NuevoJugadorFormSubmitButton = false;
          console.log(err)
        }
      );
  }

  borrarJugador(id: number) {
    this._http.delete(this._masterURL.url + "Jugador/" + id)
      .subscribe(
        (res) => {
          let jugadorBorrado = res.json();
          this.jugadores = this.jugadores.filter(value => jugadorBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  actualizarJugador(jugador: any) {
    let parametos = {
      nombre: jugador.nombre,
      fichadoHasta: jugador.fichadoHasta,
      idEquipo: this._parametros.idEquipo
    };
    this._http.put(this._masterURL.url + "Jugador/" + jugador.id, parametos)
      .subscribe(
        (res: Response) => {
          jugador.formularioCerrado = !jugador.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
