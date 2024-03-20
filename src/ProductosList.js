import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductosList.css'; // Importar el archivo CSS para los estilos

function ProductosList() {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: ''
    });

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        axios.get('https://proyecto.forcewillcode.website/api/productos')
            .then(response => {
                console.log('Respuesta de la API (Productos):', response.data);
                setProductos(response.data.productos);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    };

    const agregarProducto = () => {
        axios.post('https://proyecto.forcewillcode.website/api/productos', nuevoProducto)
            .then(response => {
                console.log('Producto agregado:', response.data);
                setNuevoProducto({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    stock: '',
                    categoria_id: ''
                });
                obtenerProductos(); // Actualizar la lista de productos después de agregar uno nuevo
            })
            .catch(error => {
                console.error('Error al agregar el producto:', error);
            });
    };

    const eliminarProducto = (id) => {
        axios.delete(`https://proyecto.forcewillcode.website/api/productos/${id}`)
            .then(response => {
                console.log('Producto eliminado:', response.data);
                obtenerProductos(); // Actualizar la lista de productos después de eliminar uno
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    };

    const modificarProducto = (id, newData) => {
        axios.put(`https://proyecto.forcewillcode.website/api/productos/${id}`, newData)
            .then(response => {
                console.log('Producto modificado:', response.data);
                obtenerProductos(); // Actualizar la lista de productos después de modificar uno
            })
            .catch(error => {
                console.error('Error al modificar el producto:', error);
            });
    };

    return (
        <div>
            <h1>Listado de Productos</h1>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        <div className="producto-item">
                            <strong>Nombre:</strong> {producto.nombre}<br />
                            <strong>Descripción:</strong> {producto.descripcion}<br />
                            <strong>Precio:</strong> {producto.precio}<br />
                            <strong>Stock:</strong> {producto.stock}<br />
                            <strong>Categoría ID:</strong> {producto.categoria_id}<br />
                            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                            <button onClick={() => modificarProducto(producto.id, /* Aquí irían los datos a modificar */)}>Modificar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="nuevo-producto">
                <h2>Agregar Nuevo Producto</h2>
                <input type="text" value={nuevoProducto.nombre} placeholder="Nombre" onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
                <input type="text" value={nuevoProducto.descripcion} placeholder="Descripción" onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
                <input type="text" value={nuevoProducto.precio} placeholder="Precio" onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} />
                <input type="text" value={nuevoProducto.stock} placeholder="Stock" onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} />
                <input type="text" value={nuevoProducto.categoria_id} placeholder="Categoría ID" onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria_id: e.target.value })} />
                <button onClick={agregarProducto}>Agregar Producto</button>
            </div>
        </div>
    );
}

export default ProductosList;
