import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { NotesComponent } from './components/notes/notes.component';
import { NavComponent } from './components/nav/nav.component';
import { DieComponent } from './components/die/die.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NotesComponent,
    NavComponent,
    DieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
