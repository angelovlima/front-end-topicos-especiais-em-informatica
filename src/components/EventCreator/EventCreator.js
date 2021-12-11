import axios from 'axios';
import React, { useState, useEffect, useContext  } from 'react';
import ComboSelect from 'react-combo-select';
import Select from 'react-select'
import { LoginContext } from '../../context/LoginContext';


function EventCreator(props){

    const { isLogado,loginFeito, changeAdmin } = useContext(LoginContext)

    const getCategorias = async () => {
        const response = await fetch("http://localhost:8084/categorias/buscarTodos")
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    }

    const [categorias, setCategorias] = useState([])

    useEffect(async () =>{
        const categ = await getCategorias()
        setCategorias(categ)
    }, [])

    const [state, setState] = useState({
        nome: "",
        descricao: "",
        autor:"",
        endereco:"",
        categoria: "",
        ativo: false
    })
    
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
                "descricao": state.descricao,
                "autor": state.autor,
                "endereco": state.endereco,
                "categoria": state.categoria,
                "ativo": state.ativo,
            }

            try{
                await axios.post('http://localhost:8084/usuarios/auth', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        // redirectToHome();
                        alert("Cadastro realizado com sucesso!")
                    } else {
                        alert("Algo de errado aconteceu.");
                    }
                })
                .catch(error =>{
                    console.error('There was an error!', error)
                })
            } catch(e){
                console.log('error', e)
            }
            
        } else {
            alert('Por favor insira um nome ou senha válidos.')
        }

    }

    if(isLogado){
        console.log(loginFeito)
        return (
            <div className="login-card">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputNome1">nome</label>
                        <input type="nome"
                            className="form-control"
                            id="nome"
                            value={state.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">descricao</label>
                        <input type="descricao"
                            className="form-control"
                            id="descricao"
                            value={state.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">autor</label>
                        <input type="autor"
                            className="form-control"
                            id="autor"
                            value={state.autor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEndereco">endereço</label>
                        <input type="endereco"
                            className="form-control"
                            id="endereco"
                            value={state.endereco}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="selectCombo">Categoria</label>
                        <Select 
                            name="categorias"
                            options={categorias}
                            value={state.categoria}
                            onChange={handleChange}
                            getOptionLabel={(categorias) => categorias.nome}
                            getOptionValue={(categorias) => categorias.id}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">ativo</label>
                        <input type="checkbox"
                            className="form-control"
                            id="ativo"
                            value={state.ativo}
                            onChange={handleChange}
                        />
                    </div>
                        <button
                            type="submit"
                            className="btn-send"
                            onClick={handleSubmitClick}
                        >
                            Registrar evento
                        </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h3 className="p-3 text-center">Por favor faça login para criar eventos</h3>
            </div>
        )
    }

    
}

export default EventCreator