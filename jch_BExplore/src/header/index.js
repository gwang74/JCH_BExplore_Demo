import Vue from 'vue'

import headerHav from '../header/HeaderHav'

const HeaderHav = {
    install: function(Vue) {
        Vue.component('headerHav', headerHav)
    }
}

export default HeaderHav