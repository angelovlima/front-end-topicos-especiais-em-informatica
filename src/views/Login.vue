<template>
    <form @submit.prevent="auth">
        <h2>Login</h2>
        <div>
            <label for="username">Usuário</label>
            <input type="text" id="username" class="form-control"
            required autofocus v-model="nome">
        </div>
        <div class="form-group">
            <label for="inputPassword">Senha</label>
            <input type="password" id="inputPassword" class="form-control"
            required v-model="senha">
        </div>
        <button class="btn btn-lg btn-primary btn-primary"
        type="submit">Ok</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "login",
    data() {
        return {
            nome: "",
            senha: ""
        };
    },
    methods:{
        ...mapActions(["login"]),
        auth(){
            this.login({ usuario: this.nome, senha: this.senha });
        }
    }
}
</script>
