import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {EquipoComponent} from "./equipo/equipo.component";
import {JugadorComponent} from "./jugador/jugador.component";
import {ModuleWithProviders} from "@angular/core";
/**
 * Created by Belen on 05/03/2017.
 */
export const routes:Routes =[
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'equipo', component: EquipoComponent},
  {path:'equipo/:idEquipo/jugador', component: JugadorComponent}
];

export const routing:ModuleWithProviders=RouterModule.forRoot(routes);

