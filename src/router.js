import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './views/Home'
import Saved from './views/Saved'

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/saved',
            name: 'Saved',
            component: Saved
        }
    ]
})

export default router;
