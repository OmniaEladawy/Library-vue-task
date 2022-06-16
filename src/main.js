import { createApp } from 'vue'
import router from './router'
import libraryWrapper from './libraryWrapper.vue'

const app = createApp(libraryWrapper)

app.use(router)

app.mount('#app')
