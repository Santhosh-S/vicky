import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { NumberToWordsPipe } from './number-to-words.pipe'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BillComponent } from './billData/bill.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'bill', component:BillComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BillComponent,
    NumberToWordsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [NumberToWordsPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
