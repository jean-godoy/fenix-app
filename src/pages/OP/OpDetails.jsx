import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiFolderPlus } from "react-icons/fi";
import './op.css';

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

import api from '../../api';

export default props => {
    const op = props.match.params.id;
    const [data, setData] = useState([]);
    const [sequencia, setSequencia] = useState([]);
    const [grades, setGrades] = useState([]);
    const token = localStorage.getItem('@token_fenix');
    const faccao_code = localStorage.getItem('@faccao_code');
    const [modal, setModal] = useState('close');
    const [status, setStatus] = useState(null);

    useEffect(() => {

        api.get(`/faccao-romaneios/get-list/${op}`, { headers: { Authorization: `${faccao_code}` } }).then(({ data }) => {
            setData(data.romaneio);
            setSequencia(data.sequencia);
            setGrades(data.grade);
            setStatus(parseInt(data.romaneio.faccao_status));
            
        }).catch(e => {
            console.log(e)
        })

    }, []);

    function open() {
        setModal('open');
    }

    function close() {
        setModal('close');
    }

    // function onChange({target:{name, value}}) {
    //     setStatus({ ...status, [name]: value });
    // }

    function save() {

        (async () => {
            
            const data_values = {
                status:         status,
                romaneio_code:  data.romaneio_code
            }

            const data_string = JSON.stringify(data_values);
           
            const response = await api.post('/faccao-romaneios/set-status', data_string , { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
                alert(data);
            }).catch(e => {
                console.log(e)
            });
          
          })();

        setModal('close');
    }
    
    return (
        <div className="container">
            <Header />

            <div className="box-op">
                <header className="op-header">
                    <b>Ordem Producão:</b> {data.ordem_producao}
                </header>

                <button className="bt-status" onClick={open} >Status</button>

                <div className="box-romaneio">
                    <div className="romaneio-group">
                        <span><b>Semana: </b></span><span>{data.semana}</span>
                    </div>
                    <div className="romaneio-group">
                        <span><b>Data Inicio: </b></span><span>{data.data}</span>
                    </div>
                    <div className="romaneio-group">
                        <span><b>N. Controle: </b></span><span>{data.id}</span>
                    </div>
                    <div className="romaneio-group">
                        <span><b>Referencia: </b></span><span>{data.referencia}</span>
                    </div>
                    <div className="romaneio-group">
                        <span><b>Descrição: </b></span><span>{data.descricao_servico}</span>
                    </div>
                    <div className="romaneio-group">
                        <span><b>Quantidade: </b></span><span>{data.quantidade}</span>
                    </div>
                </div>
                <h3>Grades</h3>
                <div className="box-romaneio-grade">
                    {(Array.isArray(grades) ? grades : []).map(item => {
                        return (
                            <div className="grade-group" key={item.id} >
                                <div className="grade-list">
                                    <span>{item.grade}</span>
                                    <span>{item.quantidade}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="box-romaneio-list">
                    <h3>Sequencia Operacional</h3>
                    <ul className="box-romaneio-ul">
                        {sequencia.length && sequencia.map(item => {
                            return (
                                <li className="box-romaneio-li" key={item.id} >
                                    <div className="romaneio-li-group">
                                        <span><b>Maquina:</b></span>
                                        <span>{item.maquina}</span>
                                    </div>

                                    <div className="romaneio-li-group">
                                        <span><b>Sequencia:</b></span>
                                        <span>{item.sequencia}</span>
                                    </div>

                                    <div className="romaneio-li-group">
                                        <span><b>Operação:</b></span>
                                        <span>{item.operacao}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                </div>

                <div className={`modal ${modal}`} >
                    <div className="box-modal">
                        <header>Status da Operação</header>

                        <div className="box-status-list">
                            <ul className="status-ul">
                                <li className="status-li">
                                    <input className="input-checked" type="radio" onClick={({ target:{checked} }) => checked && setStatus(6)} id="status-6"  checked={6 === status} />
                                    <label htmlFor="status-6"><b>A Produzir</b></label>
                                </li>

                                <li className="status-li">
                                    <input className="input-checked" type="radio" onClick={({ target:{checked} }) => checked && setStatus(7)} id="status-7"  checked={7 === status} />
                                    <label htmlFor="status-7"><b>Iniciado</b></label>
                                </li>

                                <li className="status-li">
                                    <input className="input-checked" type="radio" onClick={({ target:{checked} }) => checked && setStatus(8)} id="status-8"  checked={8 === status} />     
                                    <label htmlFor="status-8"><b>Faltas</b></label>
                                </li>

                                <li className="status-li">
                                    <input className="input-checked" type="radio" onClick={({ target:{checked} }) => checked && setStatus(9)} id="status-9"  checked={9 === status} /> 
                                    {/* <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:4}})} id="status-4"  checked={4 === values.status} /> */}
                            
                                    <label htmlFor="status-9"><b>Pronto para coleta</b></label>
                                </li>
                            </ul>
                        </div>

                        <button className="bt-modal-save" onClick={save} >Salvar</button>
                        <button className="bt-modal-close" onClick={close} >Cancelar</button>
                    </div>
                </div>

            </div>
            <Menu />
        </div>

    );
}