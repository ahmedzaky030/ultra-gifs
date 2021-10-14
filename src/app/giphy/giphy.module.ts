import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GiphyListComponent } from './components/giphy-list/giphy-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GiphyListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ GiphyListComponent ]
})
export class GiphyModule { }
