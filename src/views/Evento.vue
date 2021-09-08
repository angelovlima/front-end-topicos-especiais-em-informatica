<template>
    <div>
        <form @submit.prevent="cadastrar">
            <h2>Eventos</h2>
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome"
                class="form-control" required autofocus
                v-model="titulo">
            </div>
            <div class="form-group">
                <label for="descricao">Descricao</label>
                <textarea id="descricao" class="form-control" required
                 v-model="frase">
                 </textarea>
            </div>
            <div class="form-group">
                <label for="autor">Autor</label>
                <input type="text" id="autor"
                class="form-control" required autofocus
                v-model="titulo">
            </div>
            <div class="form-group">
                <label for="endereco">Endereco</label>
                <input type="text" id="endereco"
                class="form-control" required autofocus
                v-model="titulo">
            </div>
            <div class="form-group">
                <label for="ativo">Ativo </label>
                <input
                    type="checkbox"
                    v-model="toggle"
                    true-value="sim"
                    false-value="não"
                    required autofocus
                >
            </div>
            <button class="btn btn-lg btn-primary btn-clock" type="submit">Salvar</button>
        </form>
        <br>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Autor</th>
                    <th>Endereço</th>
                    <th>Ativo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="evento in eventos" :key="evento.id">
                    <td>{ { evento.id }}</td>
                    <td>{ { evento.nome }}</td>
                    <td>{ { evento.descricao }}</td>
                    <td>{ { evento.autor }}</td>
                    <td>{ { evento.endereco }}</td>
                    <td>{ { evento.ativo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
    name: 'anotacoes',
    data(){
        return {
            nome: "",
            descricao: "",
            autor: "",
            endereco: "",
            ativo: null,
            eventos: []
        }
    },
    computed:{
        ...mapState([
            'usuario'
        ])
    },
    methods:{
        cadastrar(){
            axios.post('evento/cadastrar',
            {
                nome: this.nome,
                descricao: this.descricao,
                autor: this.descricao,
                endereco: this.endereco,
                ativo: this.ativo
            })
            .then( res=> {
                console.log(res);
                this.nome = "";
                this.descricao = "";
                this.autor = "";
                this.endereco = "";
                this.atualizar();
            })
            .catch(error => console.log(error))
        }, 
        atualizar() {
            axios.get('eventos/buscarTodos', 
            { headers: { Accept: 'application.json' } })
            .then( res => {
                console.log(res)
                this.eventos = res.data
            })
            .catch
        }
    },
    created(){
        this.atualizar()
    }
}
</script>