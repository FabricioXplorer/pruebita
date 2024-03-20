import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProveedoresList.css'; // Importa el archivo CSS

function ProveedoresList() {
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = () => {
        axios.get('https://proyecto.forcewillcode.website/api/proveedores')
            .then(response => {
                console.log('Respuesta de la API (Proveedores):', response.data);
                setProveedores(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los proveedores:', error);
            });
    };

    return (
        <div className="proveedores-container"> {/* Agrega la clase del contenedor principal */}
            <h1 className="proveedores-header">Listado de Proveedores</h1> {/* Agrega la clase del encabezado */}
            <ul>
                {proveedores.map(proveedor => (
                    <li key={proveedor.id} className="proveedor-item"> {/* Agrega la clase de cada proveedor */}
                        <div>
                            <strong>Nombre:</strong> {proveedor.nombres} {proveedor.apellidos}<br />
                            <strong>Dirección:</strong> {proveedor.direccion}<br />
                            <strong>Teléfono:</strong> {proveedor.telefono}<br />
                            <strong>Email:</strong> {proveedor.email}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProveedoresList;
