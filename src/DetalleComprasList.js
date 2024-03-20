import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DetalleComprasList.css'; // Importa el archivo CSS

function DetalleComprasList() {
    const [productos, setProductos] = useState([]);
    const [compra, setCompra] = useState({
        productoId: '',
        cantidad: 1 // Por defecto, la cantidad es 1
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

    const agregarProductoACompra = () => {
        // Aquí puedes implementar la lógica para agregar el producto a la compra
        console.log('Producto agregado a la compra:', compra);
        // Aquí puedes enviar la compra al backend o hacer cualquier otra acción necesaria
    };

    return (
        <div className="detalle-compras-container"> {/* Agrega la clase del contenedor principal */}
            <h1>Detalle de Compras</h1>
            <h2>Productos Disponibles</h2>
            <ul className="productos-list"> {/* Agrega la clase para la lista de productos */}
                {productos.map(producto => (
                    <li key={producto.id} className="producto-item"> {/* Agrega la clase para cada elemento de producto */}
                        <div>
                            Nombre: {producto.nombre}<br />
                            Descripción: {producto.descripcion}<br />
                            Precio: {producto.precio}<br />
                            Stock: {producto.stock}<br />
                            <button onClick={() => setCompra({ productoId: producto.id, cantidad: 1 })}>
                                Agregar a Compra
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Compra Actual</h2>
            <div className="compra-actual"> {/* Agrega la clase para el área de compra actual */}
                <label>Producto:</label>
                <select
                    value={compra.productoId}
                    onChange={(e) => setCompra({ ...compra, productoId: e.target.value })}
                >
                    <option value="">Seleccionar Producto</option>
                    {productos.map(producto => (
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                    ))}
                </select>
                <label>Cantidad:</label>
                <input
                    type="number"
                    value={compra.cantidad}
                    onChange={(e) => setCompra({ ...compra, cantidad: e.target.value })}
                />
                <button onClick={agregarProductoACompra}>Agregar a Compra</button>
            </div>
        </div>
    );
}

export default DetalleComprasList;
