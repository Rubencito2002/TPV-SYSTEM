import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    private apiUrl = 'http://localhost:3000/api/productos';

    constructor(private http: HttpClient) {}

    // getProductos(): Observable<Producto[]> {
    //     return this.http.get<Producto[]>(this.apiUrl);
    // }

    getProductos(): Observable<Producto[]> {
    return this.http.get<{ [key: string]: Producto }>(this.apiUrl).pipe(
        map(responseData => {
            const productos: Producto[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    productos.push({ ...responseData[key], id: key });
                }
            }
            return productos;
        })
    );
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