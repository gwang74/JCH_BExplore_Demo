import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import block from '../pages/blockIndex'
import trade from '../pages/tradeIndex'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/block',
        name: 'block',
        component: block
    }, {
        path: '/trade',
        name: 'trade',
        component: trade
    }]
})