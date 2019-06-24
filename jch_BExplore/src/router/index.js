import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import block from '../pages/blockIndex'
import trade from '../pages/tradeIndex'
import blockDetail from '../pages/blockDetail'
import tradeDetail from '../pages/tradeDetail'
import test from '../components/HelloWorld'

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
    }, {
        path: '/blockdetail',
        name: 'blockDetail',
        component: blockDetail
    }, {
        path: '/tradedetail',
        name: 'tradeDetail',
        component: tradeDetail
    }, {
        path: '/',
        name: 'test',
        component: test
    }]
})