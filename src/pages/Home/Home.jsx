import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

import api from '../../api';

export default props => {

    const [data, setData] = useState([])
    const token = sessionStorage.getItem('@token_fenix');
    const data_string = [];

    useEffect(() => {
        // console.log(api.defaults.headers)

        api.post('/auth/validate', data_string, { headers: { Authorization: `Bearer ${token}` }}).then(({ data }) => {
            setData(data);
        }).catch(e => {
            console.log(e)
        })

    }, []);
    console.log(data)
    return (
        <div className="container">
            <Header />
            <Menu />
            <p>home</p>
        </div>

    );
}