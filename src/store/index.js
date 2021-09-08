import axios from 'axios';
import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setUsuario( state, usuario ) {
      state.usuario = usuario;
    },
    setToken( state, token ){
      state.setToken = token;
    },
    logout( state ){
      state.token = null;
      state.usuario = null;
    }
  },
  actions: {
    login( context, { usuario, senha } ) {
      axios
      .post( "login", {
        nome: usuario,
        senha: senha
      } )
      .then(res => {
        console.log( res );
        context.commit( 'setUsuario', usuario) ;
        context.commit( 'setToken', res.data.token );
        router.push( '/' )
      })
      .catch( error => console.log( error ) )
    }
  },
  modules: {
  }
})
