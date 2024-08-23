import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipFormComponent } from './internship-form/internship-form.component';
import { InternshipsComponent } from './internships/internships.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'login', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:"dashboard", component: InternshipsComponent},
    {path:"data-entry", component: InternshipFormComponent},
    {path:"edit/:id", component: InternshipFormComponent},
    { path: '**', component: LandingPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }