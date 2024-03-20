import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VentasList.css'; // Importa el archivo CSS

function VentasList() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        obtenerVentas();
    }, []);

    const obtenerVentas = () => {
        axios.get('https://proyecto.forcewillcode.website/api/ventas')
            .then(response => {
                console.log('Respuesta de la API (Ventas):', response.data);
                setVentas(response.data.ventas);
            })
            .catch(error => {
                console.error('Error al obtener las ventas:', error);
            });
    };

    return (
        <div className="ventas-container"> {/* Agrega la clase del contenedor principal */}
            <h1 className="ventas-header">Listado de Ventas</h1> {/* Agrega la clase del encabezado */}
            <ul>
                {ventas.map(venta => (
                    <li key={venta.id} className="venta-item"> {/* Agrega la clase de cada venta */}
                        <div>
                            <strong>Fecha de Venta:</strong> {venta.fecha_venta}<br />
                            <strong>Total:</strong> {venta.total}<br />
                            <strong>Cliente ID:</strong> {venta.cliente_id}<br />
                            <strong>Vendedor ID:</strong> {venta.vendedor_id}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VentasList;
