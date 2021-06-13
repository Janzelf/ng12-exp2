import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { SelectproefComponent } from './selectproef/selectproef.component';
import { SelectincComponent } from './selectinc/selectinc.component';

const routes: Routes = [
  { path: 'help', component: ContactComponent },
  { path: 'deincasso', component: SelectincComponent },
  { path: 'proef', component: SelectproefComponent },
  { path: '', pathMatch: 'full', redirectTo: 'deincasso' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
