import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoriaList.css'; // Importa el archivo CSS

function CategoriaList() {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [nombreCategoriaModificar, setNombreCategoriaModificar] = useState('');

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = () => {
        axios.get('https://proyecto.forcewillcode.website/api/categorias')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las categorías:', error);
            });
    };

    const agregarCategoria = () => {
        axios.post('https://proyecto.forcewillcode.website/api/categorias', { nombre: nuevaCategoria })
            .then(response => {
                setNuevaCategoria('');
                obtenerCategorias();
            })
            .catch(error => {
                console.error('Error al agregar la categoría:', error);
            });
    };

    const eliminarCategoria = (id) => {
        axios.delete(`https://proyecto.forcewillcode.website/api/categorias/${id}`)
            .then(response => {
                obtenerCategorias();
            })
            .catch(error => {
                console.error('Error al eliminar la categoría:', error);
            });
    };

    const modificarCategoria = (id) => {
        axios.put(`https://proyecto.forcewillcode.website/api/categorias/${id}`, { nombre: nombreCategoriaModificar })
            .then(response => {
                setCategoriaSeleccionada(null);
                obtenerCategorias();
            })
            .catch(error => {
                console.error('Error al modificar la categoría:', error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Categorías</h1>
            <div className="categoria-lista">
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria.id}>
                            <div className="categoria-item">
                                <div className="categoria-info">
                                    <div><strong>Identificador:</strong></div>
                                    <div>{categoria.id}</div>
                                </div>
                                <div className="categoria-info">
                                    <div><strong>Nombre de la Categoría:</strong></div>
                                    <div>{categoria.nombre}</div>
                                </div>
                                <div className="categoria-buttons">
                                    {categoriaSeleccionada === categoria ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={nombreCategoriaModificar} 
                                                onChange={(e) => setNombreCategoriaModificar(e.target.value)} 
                                                placeholder="Nuevo nombre de categoría" 
                                            />
                                            <button onClick={() => modificarCategoria(categoria.id)}>Guardar</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => eliminarCategoria(categoria.id)}>Eliminar</button>
                                            <button onClick={() => setCategoriaSeleccionada(categoria)}>Modificar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={agregarCategoria} style={{ marginTop: '20px' }}>
                <input 
                    type="text" 
                    value={nuevaCategoria} 
                    onChange={(e) => setNuevaCategoria(e.target.value)} 
                    placeholder="Nueva categoría" 
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default CategoriaList;
