import { useState, useEffect, useContext } from "react";
import { LoginContext } from '../../context/LoginContext';

function Eventos(props){

    const { isLogado, token } = useContext(LoginContext)

    const getEvents = async () => {
        console.log(token)
        const response = await fetch("http://localhost:8084/eventos/buscarTodos", {
            headers: new Headers({
                "Authorization": token
            })
        });
        console.log(response)
        const body = await response.json();
    
        return body;
    }

    const [eventos, setEventos] = useState([])

    useEffect(async () =>{
        const events = await getEvents()
        setEventos(events)
    }, [])

    if(isLogado) {
        return (
            <div className="container">
                <h3 className="p-3 text-center">eventos</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Autor</th>
                            <th>Endereço</th>
                            <th>Ativo</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map( (elemento, index ) => (
                            <tr>
                                <td>{elemento.nome}</td>
                                <td>{elemento.descricao}</td>
                                <td>{elemento.autor}</td>
                                <td>{elemento.endereco}</td>
                                <td>
                                    <input type="checkbox"
                                        defaultChecked={elemento.ativo}
                                        disabled={true}/>
                                </td>
                                <td>{elemento.categorias.map(child =>(
                                    child.nome + " "
                                ))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h3 className="p-3 text-center">Por favor faça login para ver os eventos listados</h3>
            </div>
        )
    }
}

export default Eventos