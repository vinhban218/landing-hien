import App from "../components/App.vue";
import { createApp } from "vue";
import { store } from './store'
const globalMixin = {
    computed: {
        storeState() {
            return store.state
        },
        isVi() {
            return store.state.vi
        },
        viContent() {
            return store.state.viContent
        },
        enContent() {
            return store.state.enContent
        }
    }
}


createApp(App).use(store).mixin(globalMixin).mount("#app");
