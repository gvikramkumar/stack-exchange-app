import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
// import { DataTableModule, InputTextareaModule, PanelModule, DropdownModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTablesModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
