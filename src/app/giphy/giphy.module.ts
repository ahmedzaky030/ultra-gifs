import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GiphyListComponent } from './components/giphy-list/giphy-list.component';
import { GiphyItemComponent } from './components/giphy-item/giphy-item.component';



@NgModule({
  declarations: [
    GiphyListComponent,
    GiphyItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
    
  ]
})
export class GiphyModule { }
