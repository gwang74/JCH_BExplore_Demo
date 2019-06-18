<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTransactionsByaddress, getLedgerIndex, getLedgerInformationByIndex, getLedgerInformationByHash } from '../js/request'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.test();
  },
  methods:{
    async test () {
      // await getAccountBalance('jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC')
      // await getAccountOrders('jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC')
      // await getTransactionsByHash('F2A40B1A7ED2097F2F4A5E008F9896336E7DD441F5C1FC74D17491BD58C73FB8')
      // await getTransactionsByaddress('jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC')
      await getLedgerIndex()
      await getLedgerInformationByIndex(13099611)
      await getLedgerInformationByHash('F2A40B1A7ED2097F2F4A5E008F9896336E7DD441F5C1FC74D17491BD58C73FB8')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
