import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiUserCheck, FiLock } from 'react-icons/fi';
import api from '../../api';
import './login.css'

const initialValues = {
    user_email: '',
    user_pass: '',
}

export default props => {

    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const [user, setUser] = useState();

    //função que verifica se existe um token 
    useEffect(() => {
        if (localStorage.getItem('@token_fenix')) {
            return history.push('/');
        }
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const email = values.user_email;
        const pass = values.user_pass;

        if(email.length == ""){
            return alert("E-mail obrigatorio!");
        }

        if(pass.length == ""){
            return alert("Senha obrigatoria!");
        }

        const data_string = JSON.stringify(values)
       
        api.post('/auth/login-faccao', data_string).then(({ data }) => {
            console.log(data)
            if (data.length > 0) {
                const part = data.split(" ");
                const token = part[1];
                
                localStorage.setItem('@token_fenix', token);
                // api.defaults.headers['Authorization'] = `Bearer ${token}`;
                return history.push('/');
                
            } else {
                alert("Usuario ou Senha não Conferem!")
                setValues(initialValues);
            }

        }).catch((e) => {
            console.log("error :" + e)
        })
    }
    
    return (

        <div className="box-login">


            <form onSubmit={onSubmit} className="form">
                <h1>Login</h1>
                <div className="box-login-ico">
                    <FiUserCheck color="#331" size={24} fontWeight="bold" />
                    <input className="login-inp" type="text" name="user_email" placeholder="E-mail" value={values.user_name} onChange={onChange} />
                </div>

                <div className="box-login-ico">
                    <FiLock color="#331" size={24} fontWeight="bold" />
                    <input className="login-inp" type="password" name="user_pass" id="" placeholder="Password" value={values.user_pass} onChange={onChange} />
                </div>

                <button className="login-bt-sub" type="submit">Entrar</button>
            </form>

        </div>

    )
}