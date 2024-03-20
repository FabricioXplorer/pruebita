import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClienteList.css'; // Importa el archivo CSS

function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [nombreClienteModificar, setNombreClienteModificar] = useState('');

    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = () => {
        axios.get('https://proyecto.forcewillcode.website/api/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los clientes:', error);
            });
    };

    const agregarCliente = () => {
        axios.post('https://proyecto.forcewillcode.website/api/clientes', { nombre: nuevoCliente })
            .then(response => {
                setNuevoCliente('');
                obtenerClientes();
            })
            .catch(error => {
                console.error('Error al agregar el cliente:', error);
            });
    };

    const eliminarCliente = (id) => {
        axios.delete(`https://proyecto.forcewillcode.website/api/clientes/${id}`)
            .then(response => {
                obtenerClientes();
            })
            .catch(error => {
                console.error('Error al eliminar el cliente:', error);
            });
    };

    const modificarCliente = (id) => {
        axios.put(`https://proyecto.forcewillcode.website/api/clientes/${id}`, { nombres: nombreClienteModificar })
            .then(response => {
                setClienteSeleccionado(null);
                obtenerClientes();
            })
            .catch(error => {
                console.error('Error al modificar el cliente:', error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Clientes</h1>
            <div className="cliente-lista">
                <ul>
                    {clientes.map(cliente => (
                        <li key={cliente.id}>
                            <div className="cliente-item">
                                <div><strong>Nombre del Cliente:</strong> {cliente.nombres} {cliente.apellidos}</div>
                                <div><strong>Dirección:</strong> {cliente.direccion}</div>
                                <div><strong>Teléfono:</strong> {cliente.telefono}</div>
                                <div><strong>Email:</strong> {cliente.email}</div>
                                <div className="cliente-buttons">
                                    {clienteSeleccionado === cliente ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={nombreClienteModificar} 
                                                onChange={(e) => setNombreClienteModificar(e.target.value)} 
                                                placeholder="Nuevo nombre del cliente" 
                                            />
                                            <button onClick={() => modificarCliente(cliente.id)}>Guardar</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
                                            <button onClick={() => setClienteSeleccionado(cliente)}>Modificar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={agregarCliente} style={{ marginTop: '20px' }}>
                <input 
                    type="text" 
                    value={nuevoCliente} 
                    onChange={(e) => setNuevoCliente(e.target.value)} 
                    placeholder="Nuevo cliente" 
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default ClienteList;
