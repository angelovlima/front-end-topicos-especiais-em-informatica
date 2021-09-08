import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

axios.interceptors.request.use(config => {
    if(store.state.token) {
        config.headers.Authorization = store.state.token
    }
    return config
})
axios.interceptors.response.use(res => {
    return res
    }, error => {
        if(error.response.status ===403 ) {
            alert('Não autorizado!')
        }
        else if(error.response.status === 401) {
            store.commit('logout')
            router.push('/login')
        }
        throw error
})

axios.defaults.baseURL = 'localhost:8080/'

createApp(App).use(store).use(router).mount('#app')


