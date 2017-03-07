import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JugadorComponent } from './jugador/jugador.component';
import { EquipoComponent } from './equipo/equipo.component';
import {routing} from "./app.routes";
import {MasterUrlService} from "./services/master-url.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JugadorComponent,
    EquipoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
