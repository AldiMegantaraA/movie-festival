import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './routes';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
