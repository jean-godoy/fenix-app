import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiSearch } from "react-icons/fi";
import './menu.css';

export default props => {

    return (
        <div className="menu-area">
            <nav className="menu-nav">
                <ul className="menu-ul">
                    <li className="menu-li">
                        <FiHome className="icon-footer" color="#efefef" size="20" />
                        <Link className="menu-link" to="/home"><b>Home</b></Link>
                    </li>

                    <li className="menu-li">
                        <FiShoppingCart className="icon-footer" color="#efefef" size="20" />
                        <Link className="menu-link" to="#"><b>O.P.</b></Link>
                    </li>

                    <li className="menu-li">
                        <FiSearch className="icon-footer" color="#efefef" size="20" />
                        <Link className="menu-link" to="#"><b>Pesquisar</b></Link>
                    </li>

                    {/* <li className="menu-li">
                        <Link className="menu-link" to="#">Sair</Link>
                    </li> */}

                </ul>
            </nav>
        </div>
    );
}