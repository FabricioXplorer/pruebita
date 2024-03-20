import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComprasList.css';

function ComprasList() {
    const [compras, setCompras] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [nuevaCompra, setNuevaCompra] = useState({
        proveedorId: '',
        cantidad: 0,
        fecha: ''
    });

    useEffect(() => {
        obtenerCompras();
        obtenerProveedores();
    }, []);

    const obtenerCompras = () => {
        axios.get('https://proyecto.forcewillcode.website/api/compras')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCompras(response.data);
                } else {
                    console.error('La respuesta de la API no contiene un array de compras:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener las compras:', error);
            });
    };

    const obtenerProveedores = () => {
        axios.get('https://proyecto.forcewillcode.website/api/proveedores')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setProveedores(response.data);
                } else {
                    console.error('La respuesta de la API no contiene un array de proveedores:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener los proveedores:', error);
            });
    };

    const agregarCompra = () => {
        axios.post('https://proyecto.forcewillcode.website/api/compras', nuevaCompra)
            .then(response => {
                setNuevaCompra({
                    proveedorId: '',
                    cantidad: 0,
                    fecha: ''
                });
                obtenerCompras();
            })
            .catch(error => {
                console.error('Error al agregar la compra:', error);
            });
    };

    const eliminarCompra = (id) => {
        axios.delete(`https://proyecto.forcewillcode.website/api/compras/${id}`)
            .then(response => {
                obtenerCompras();
            })
            .catch(error => {
                console.error('Error al eliminar la compra:', error);
            });
    };

    const modificarCompra = (id, cantidad) => {
        axios.put(`https://proyecto.forcewillcode.website/api/compras/${id}`, { cantidad })
            .then(response => {
                obtenerCompras();
            })
            .catch(error => {
                console.error('Error al modificar la compra:', error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Compras</h1>
            <div className="nueva-compra">
                <h2>Nueva Compra</h2>
                <form onSubmit={agregarCompra}>
                    <select
                        value={nuevaCompra.proveedorId}
                        onChange={(e) => setNuevaCompra({ ...nuevaCompra, proveedorId: e.target.value })}
                    >
                        <option value="">Seleccionar Proveedor</option>
                        {proveedores.map(proveedor => (
                            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombres} {proveedor.apellidos}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={nuevaCompra.cantidad}
                        onChange={(e) => setNuevaCompra({ ...nuevaCompra, cantidad: e.target.value })}
                        placeholder="Cantidad"
                    />
                    <input
                        type="date"
                        value={nuevaCompra.fecha}
                        onChange={(e) => setNuevaCompra({ ...nuevaCompra, fecha: e.target.value })}
                    />
                    <button type="submit">Agregar Compra</button>
                </form>
            </div>
            <div className="lista-compras">
                <h2>Compras Realizadas</h2>
                <ul>
                    {compras.length > 0 ? (
                        compras.map(compra => (
                            <li key={compra.id}>
                                <div>
                                    Proveedor ID: {compra.proveedorId}<br />
                                    Cantidad: {compra.cantidad}<br />
                                    Fecha: {compra.fecha}
                                </div>
                                <div className="acciones-compra">
                                    <button onClick={() => eliminarCompra(compra.id)}>Eliminar</button>
                                    <input
                                        type="number"
                                        value={compra.cantidad}
                                        onChange={(e) => modificarCompra(compra.id, e.target.value)}
                                    />
                                    <button onClick={() => modificarCompra(compra.id, compra.cantidad)}>Modificar</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No hay compras disponibles</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ComprasList;
