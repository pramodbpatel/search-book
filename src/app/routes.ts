import { Routes } from '@angular/router';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
    { path: 'home', component: SearchboxComponent},
    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]