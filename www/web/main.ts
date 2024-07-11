import {createApp} from 'vue'
import App from './App.vue'
// @ts-ignore
import install, {$optionsType} from "@/bag-web/install";
import routes from "@www/web/router";
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
import { resetForm, } from "@/common/utils/ruoyi";
const app = createApp(App)
app.config.globalProperties.resetForm = resetForm;
const $options: $optionsType = {
    router: {routes},
}

app.use(install, $options,)
app.use(UndrawUi)
app.mount('#app')
