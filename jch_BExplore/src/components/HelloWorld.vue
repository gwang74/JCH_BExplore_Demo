<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  transferAccounts,
  getTransactionsByaddress,
  getLedgerIndex,
  getLedgerInformationByIndex,
  getLedgerInformationByHash,
  getHomeData
} from "../js/request";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    async test() {
      // await getAccountBalance('jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC')
      // await getAccountOrders('jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC')
      let address = "jK9YYLxty5GCqu2qyFMbtQp9RPwnXxkxRu";
      var client_id = "id" + new Date().getTime();
      let postData = {
        client_id: client_id,
        payment: {
          amount: {
            currency: "SWT",
            issuer: "",
            value: "0.1"
          },
          destination: "jKBCwv4EcyvYtD4PafP17PLpnnZ16szQsC",
          memos: ["test jch demo"],
          source: "jK9YYLxty5GCqu2qyFMbtQp9RPwnXxkxRu"
        },
        secret: "ssCCDeMezExV9ZsTfx7w71vnRHDKW"
      };
      await transferAccounts(address, postData);
      // await getLedgerIndex()
      // await getLedgerInformationByIndex(13099611)
      // await getLedgerInformationByHash('2DAAE21F605C157F8FB251F81A69DE71C7FF8C29553277507B62430BE81F5C88')
      // await getHomeData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
