import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiFolderPlus } from "react-icons/fi";

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

import api from '../../api';

export default props => {

    const [data, setData] = useState([])
    const token = localStorage.getItem('@token_fenix');
    const faccao_code = localStorage.getItem('@faccao_code');
    const history = useHistory();

    useEffect(() => {

        api.get(`/faccao-romaneios/list/${faccao_code}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setData(data);

        }).catch(e => {
            console.log(e)
        })

    }, []);

    return (
        <div className="container">
            <Header />
            <Menu />

            <div className="box-op">
                <header className="op-header">
                    Ordem Produção
                </header>

                <div className="box-list">
                    <ul className="box-ul">
                        {data.length && data.map(item => {
                            return (
                                <li className="box-li" key={item.id} >
                                    <Link className="list-link" to={`/ordem-producao/detalhes/${item.ordem_producao}`}  >
                                        <span className="list-span"><b>O.P:</b> {item.ordem_producao} </span>
                                        <FiFolderPlus size="25" color="#efefef" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                </div>

            </div>

        </div>

    );
}