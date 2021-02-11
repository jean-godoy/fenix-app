import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

import api from '../../api';

export default props => {

    const [data, setData] = useState([])
    const token = localStorage.getItem('@token_fenix');
    const data_string = [];

    useEffect(() => {

        api.get('/mobile/credentials', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setData(data);
            localStorage.setItem('@faccao_code', data);
        }).catch(e => {
            console.log(e)
        });

    }, []);
    console.log("token "+localStorage.getItem('@token_fenix'))
    return (
        <div className="container">
            <Header />
            <Menu />
            <p>home</p>
        </div>

    );
}