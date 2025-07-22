import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.services';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  imports: [CommonModule, FormsModule]
})

export class ProductosComponent implements OnInit{
  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', precio: 0, stock: 0 };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.getProductos().subscribe(data => {
      console.log('Productos recibidos:', data);
      this.productos = data;
    });
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre) return;
    this.productosService.agregarProducto(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', precio: 0, stock: 0 };
      this.obtenerProductos();
    })
  }

  eliminarProducto(id: string){
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.obtenerProductos();
    });
  }
}
