import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/material/material.module';
import { UtilModule } from 'src/libraries/util/util.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    /* LIBRARIES */
    UtilModule,

    /* MATERIAL */
    MaterialModule,

    /* */
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
