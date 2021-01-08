import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

export default props => {
   const history = useHistory();
   const [data, setData] = useState([]);

   // useEffect(() => {
   //    const req = JSON.parse(localStorage.getItem('@friday_user_data'));
   //    setData(req);
   // }, []);

   function logOut() {

      sessionStorage.removeItem('@token_fenix');
      return history.push('/login')

   }

   return (
      <div className="container">

         <Header />
         <Menu />

         <div className="box-logout">
            <header>Deseja Realmente Sair?</header>
            <dib className="box-logout-group">
               <Link className="logout-bt" to="/">Cancelar</Link>
               <button className="logout-bt" onClick={logOut}>Sair</button>
            </dib>
         </div>

      </div>
   );


}




