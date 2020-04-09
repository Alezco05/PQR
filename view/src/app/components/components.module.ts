import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopinfoComponent } from './popinfo/popinfo.component';




@NgModule({
  declarations: [HeaderComponent,PopinfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PopinfoComponent
  ]
})
export class ComponentsModule { }
