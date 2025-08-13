import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    // { path: 'ventas', loadComponent: () => import('./ventas/ventas.component').then(m => m.VentasComponent) },
    { path: '**', redirectTo: '' }
];