import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {LoginContext} from '../../context/LoginContext'

function Header() {

    const { admin, isLogado } = useContext(LoginContext)

    if(isLogado && admin){
        return(
            <nav class="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                <Link to='/eventCreator' className="btn btn-primary">Criar eventos</Link>
                <Link to="/" className="btn btn-primary">Login</Link>    
                <span className="h3">Tópicos Especiais</span>
                <Link to="/eventos" className="btn btn-primary">Eventos</Link>
                </div>
            </nav>
        )
    } else if (isLogado){
        return(
            <nav class="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                <Link to="/" className="btn btn-primary">Login</Link>    
                <span className="h3">Tópicos Especiais</span>
                <Link to="/eventos" className="btn btn-primary">Eventos</Link>
                </div>
            </nav>
        )
    } else {
        return(
            <nav class="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                <Link to="/" className="btn btn-primary">Login</Link>    
                <span className="h3">Tópicos Especiais</span>
                </div>
            </nav>
        )
     }
    
}
export default Header;