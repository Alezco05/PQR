import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPage } from './form.page';
import { DatosComponent } from './datos/datos.component';
import { DamageComponent } from './damage/damage.component';
import { ProblemaComponent } from './problema/problema.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule  } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild([  
    { path: 'datos', component: DatosComponent}, 
    { path: 'daño', component: DamageComponent}, 
    { path: 'problema', component: ProblemaComponent}, 
    { path: '**', pathMatch: 'full', redirectTo: 'datos' },
    ])
  ],
  declarations: [FormPage, DatosComponent,DamageComponent,ProblemaComponent,ModalComponent],
  entryComponents:[ModalComponent]
})
export class FormPageModule {}
