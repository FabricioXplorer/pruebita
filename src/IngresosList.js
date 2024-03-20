import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IngresosList.css'; // Importar el archivo CSS

function IngresosList() {
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {
        obtenerIngresos();
    }, []);

    const obtenerIngresos = () => {
        axios.get('https://proyecto.forcewillcode.website/api/ingresos')
            .then(response => {
                console.log('Respuesta de la API (Ingresos):', response.data);
                setIngresos(response.data.ventas);
            })
            .catch(error => {
                console.error('Error al obtener los ingresos:', error);
            });
    };

    return (
        <div className="ingresos-container"> {/* Agregando clase para el contenedor principal */}
            <h1 className="ingresos-header">Listado de Ingresos</h1> {/* Agregando clase para el encabezado */}
            <ul className="ingresos-list"> {/* Agregando clase para la lista de ingresos */}
                {ingresos.map(ingreso => (
                    <li key={ingreso.id} className="ingresos-item"> {/* Agregando clase para cada elemento de la lista */}
                        <div className="ingresos-content"> {/* Agregando clase para el contenido de cada ingreso */}
                            <span className="ingresos-title">Fecha de Venta:</span> {ingreso.fecha_venta}<br />
                            <span className="ingresos-title">Total:</span> {ingreso.total}<br />
                            <span className="ingresos-title">Cliente ID:</span> {ingreso.cliente_id}<br />
                            <span className="ingresos-title">Vendedor ID:</span> {ingreso.vendedor_id}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngresosList;
