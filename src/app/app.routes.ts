import { Routes } from '@angular/router';
import { InternshipFormComponent } from './internship-form/internship-form.component';
import { InternshipsComponent } from './internships/internships.component';

export const routes: Routes = [
    {path:"", component: InternshipsComponent},
    {path:"data-entry", component: InternshipFormComponent}
];
