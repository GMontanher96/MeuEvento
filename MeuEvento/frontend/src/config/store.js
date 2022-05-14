import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            nome: 'User Teste',
            email: 'teste@gmail.com'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            // eslint-disable-next-line no-console
            console.log('toggleMenu = ' + state.isMenuVisible)

            
        }
    }
})