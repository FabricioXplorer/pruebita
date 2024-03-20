import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/categorias">Categorías</Link>
                </li>
                <li>
                    <Link to="/clientes">Clientes</Link>
                </li>
                <li>
                    <Link to="/movimientos">Movimientos</Link>
                </li>
                <li>
                    <Link to="/bonificaciones">Bonificaciones</Link>
                </li>
                <li>
                    <Link to="/compras">Compras</Link>
                </li>
                <li>
                    <Link to="/detalle-compras">Detalle_Compras</Link>
                </li>
                <li>
                    <Link to="/egresos">Egresos</Link>
                </li>
                <li>
                    <Link to="/ingresos">Ingresos</Link>
                </li>
                <li>
                    <Link to="/productos">Productos</Link>
                </li>
                <li>
                    <Link to="/proveedores">Proveedores</Link>
                </li>
                <li>
                    <Link to="/ventas">Ventas</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
