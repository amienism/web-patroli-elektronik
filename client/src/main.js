import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import dayjs from 'dayjs'
import dayjslocale from "dayjs/locale/id";

loadFonts()

axios.defaults.baseURL = 'http://192.168.0.232:3000/api';
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

dayjs.locale("id");

const app = createApp(App)

app.mixin({
  methods: {
      // dayjslocale,
      dayjs,
      dateFormat(value) {
          return dayjs(value).format("dddd, DD MMM YYYY");
      },
      timeFormat(value){
        return dayjs(value).format("HH:mm")
      }
    }
}
)

app
.use(router)
.use(store)
  .use(vuetify)
  .mount('#app')
