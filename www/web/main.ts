import {createApp} from 'vue'
import App from './App.vue'
// @ts-ignore
import install, {$optionsType} from "@/bag-web/install";
import routes from "@www/web/router";
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

const app = createApp(App)

const $options: $optionsType = {
    router: {routes},
}
app.use(install, $options,)
app.use(UndrawUi)
app.mount('#app')
