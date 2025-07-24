import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Producto {
    id?: string;
    nombre: string;
    precio: number;
    stock: number;
}

@Injectable({
    providedIn: 'root'
})

export class ProductosService {
    // private apiUrl = 'http://localhost:3000/api/productos';
    private apiUrl = environment.apiUrl; // Utiliza la URL del entorno

    constructor(private http: HttpClient) {}

    // getProductos(): Observable<Producto[]> {
    //     return this.http.get<Producto[]>(this.apiUrl);
    // }

    // Método para obtener productos desde la API en local.
    // getProductos(): Observable<Producto[]> {
    //     return this.http.get<{ [key: string]: Producto }>(this.apiUrl).pipe(
    //         map(responseData => {
    //             const productos: Producto[] = [];
    //             for (const key in responseData) {
    //                 if (responseData.hasOwnProperty(key)) {
    //                     productos.push({ ...responseData[key], id: key });
    //                 }
    //             }
    //             return productos;
    //         })
    //     );
    // }

    // Método para obtener un producto desde la API en Producción.
    getProducto(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
    }

    agregarProducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.apiUrl, producto);
    }

    actualizarProducto(id: string, producto: Producto): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    }

    eliminarProducto(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}