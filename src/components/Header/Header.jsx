import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignJustify, FiMail, FiLogIn, FiSettings, FiChevronsUp } from "react-icons/fi";
import './header.css';

export default props => {

    const [modal, setModal] = useState('menu-close');

    function open() {
        setModal('menu-open');
    }

    function close() {
        setModal('menu-close');
    }

    console.log('modal: ' + modal)
    return (
        <div className="header-area">

            <nav className="box-nav">
                <header className="box-nav-header">
                    <span className="box-nav-span">
                        <b>Fenix Facções</b>
                    </span>
                </header>
                <div className="menu">
                    <Link onClick={open}>
                        <FiAlignJustify className="icon-menu" color="#efefef" size="20" />
                    </Link>
                </div>
            </nav>

            <div className={`menu-content ${modal}`}>

                <ul className="box-modal-ul">

                    <li className="box-modal-li">
                        <Link className="modal-link">
                            <FiMail className="icon-modal" color="#efefef" size="20" />
                            <span className="modal-span">Mensagens</span>
                        </Link>
                    </li>

                    <li className="box-modal-li">
                        <Link className="modal-link">
                            <FiSettings className="icon-modal" color="#efefef" size="20" />
                            <span className="modal-span">Configurações</span>
                        </Link>
                    </li>

                    <li className="box-modal-li">
                        <Link className="modal-link" to="/logout">
                            <FiLogIn className="icon-modal" color="#efefef" size="20" />
                            <span className="modal-span">Sair</span>
                        </Link>
                    </li>
                </ul>

                <div className="closed">
                    <Link className="modal-close" onClick={close}>
                        <div className="box-close">
                            <FiChevronsUp className="icon-modal-close" color="#efefef" size="20" />
                            <span className="span-modal-close"><b>Fechar</b></span>
                        </div>
                    </Link>
                </div>

            </div>



        </div>
    );

}