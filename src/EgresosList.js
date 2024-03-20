import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EgresosList() {
    const [egresos, setEgresos] = useState([]);
    const [nuevoEgreso, setNuevoEgreso] = useState({
        descripcion: '',
        monto: 0
    });

    useEffect(() => {
        obtenerEgresos();
    }, []);

    const obtenerEgresos = () => {
        axios.get('https://proyecto.forcewillcode.website/api/egresos')
            .then(response => {
                console.log('Respuesta de la API (Egresos):', response.data);
                setEgresos(response.data.egresos);
            })
            .catch(error => {
                console.error('Error al obtener los egresos:', error);
            });
    };

    const agregarEgreso = () => {
        axios.post('https://proyecto.forcewillcode.website/api/egresos', nuevoEgreso)
            .then(response => {
                console.log('Egreso agregado:', response.data);
                setNuevoEgreso({
                    descripcion: '',
                    monto: 0
                });
                obtenerEgresos();
            })
            .catch(error => {
                console.error('Error al agregar el egreso:', error);
            });
    };

    return (
        <div>
            <h1>Registro de Egresos</h1>
            <div className="nuevo-egreso">
                <h2>Nuevo Egreso</h2>
                <form onSubmit={agregarEgreso}>
                    <input
                        type="text"
                        value={nuevoEgreso.descripcion}
                        onChange={(e) => setNuevoEgreso({ ...nuevoEgreso, descripcion: e.target.value })}
                        placeholder="Descripción"
                    />
                    <input
                        type="number"
                        value={nuevoEgreso.monto}
                        onChange={(e) => setNuevoEgreso({ ...nuevoEgreso, monto: e.target.value })}
                        placeholder="Monto"
                    />
                    <button type="submit">Agregar Egreso</button>
                </form>
            </div>
            <div className="lista-egresos">
                <h2>Egresos Registrados</h2>
                <ul>
                    {egresos.map(egreso => (
                        <li key={egreso.id}>
                            <div>
                                Descripción: {egreso.descripcion}<br />
                                Monto: {egreso.monto}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EgresosList;
