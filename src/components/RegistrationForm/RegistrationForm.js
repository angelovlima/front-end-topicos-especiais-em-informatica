import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { LoginContext } from '../../context/LoginContext';

function RegistrationForm() {

    const { loginFeito, changeAdmin, defineToken } = useContext(LoginContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loginCount, setLoginCount]  = useState(0)
    const [state, setState] = useState({
        nome: "",
        senha: ""
    })

    const [redirection, setRedirection] = useState(false);
    
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
    }

    const sendDetailsToServer = async () => {
        if (state.password.length) {
            const payload = {
                "nome": state.nome,
                "senha": state.password
            }   

            try{
                await axios.post('http://localhost:8084/usuarios/auth', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        if(response.data['admin']===true) {
                            alert(`Bem vindo ${state.nome} \nRole: Admin`)
                            setIsAdmin(true)
                            loginFeito();
                            changeAdmin();
                            defineToken(response.data['token'])
                            setRedirection(true)
                        } else {
                            alert(`Bem vindo ${state.nome} \nRole: User`)
                            loginFeito()
                            defineToken(response.data['token'])
                            setRedirection(true)
                        }
                        
                    } else {
                        alert("Algo de errado aconteceu.");
                    }
                })
                .catch(error =>{
                    alert("Seu usuário não está correto, por favor insira um usuário válido.");
                    setLoginCount(loginCount + 1)
                })
            } catch(e){
                console.log('error', e)
            }
            
        } else {
            alert('Por favor insira um nome ou senha válidos.')
        }

    }

    if(redirection){
        if(isAdmin){
            console.log(isAdmin)
            return <Redirect to="/eventCreator"/>
        } else {
            return <Redirect to="/eventos"/>
        }
        
    }
    if(loginCount  < 3) {
        return (
            <div className="login-card">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputNome1">Nome</label>
                        <input type="nome"
                            className="form-control"
                            id="nome"
                            value={state.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">senha</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                        <button
                            type="submit"
                            className="btn-send"
                            onClick={handleSubmitClick}
                        >
                            Login
                        </button>
                </form>
            </div>
        )
    } else {
        return(
            <div className="container">
                    <h3 className="p-3 text-center">Login bloqueado após série de logins incorrentos.</h3>
            </div>
        )
    }
}

export default RegistrationForm