import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GiphyModule } from './giphy/giphy.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GiphyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
