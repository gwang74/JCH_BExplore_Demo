<template>
  <div id="headerHav">
    <div class="headLogo" @click="backhome('home')">
      <img src="" >
      <span>井创SWTC公链浏览器</span>
    </div>
    <div style="display:flex;align-items:center;">
      <div class="searchWarp">
        <input type="text" v-model="searchContent" placeholder="请输入地址/哈希">
        <span class="serachButton" @click="confirmSearch">
          <i class="iconfont icon-sousuoicon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTransactionsByHash,
  getLedgerInformationByHash
} from '../js/request';
import { jtWallet } from "jcc_wallet";
export default {
  name: "headerHav",
  data() {
    return {
      searchContent: "",
      showLanguage: false,
      showDialog: false,
      languageList: {
        zh: { label: "zh", name: "简体中文" },
        en: { label: "en", name: "English" }
      }
    };
  },
  mounted() {
  },
  computed: {
    // currentLanguage() {
    //   return this.$i18n.locale;
    // },
    currentNav() {
      return this.$store.getters.currentNav;
    }
  },
  methods: {
    interceptString(key, index = 1) {
      if (key && key !== "---") {
        if (key.length > 12) {
          if (index === 2) {
            return (
              key.substr(0, 6) +
              "......" +
              key.substr(key.length - 6, key.length)
            );
          }
          return (
            key.substr(0, 8) + "..." + key.substr(key.length - 8, key.length)
          );
        } else {
          return key;
        }
      } else {
        return key;
      }
    },
    displayDefaultHashType(value) {
      if (value) {
        return value;
      } else {
        return { value: undefined };
      }
    },
    async getHashType(hash) {
      let block = await getLedgerInformationByHash(hash);
      let trade = await getTransactionsByHash(hash);
      let res = "";
      console.log(block,trade)
      if(block.success&&!trade.success) {res = "blockDetail"}
      else if(!block.success&&trade.success) {res = "tradeDetail"}
      return res;
    },
    async jumpDetailByHash(value) {
      let res = await this.getHashType(value);
      console.log(res)
      if (res !== "") {
        let url =
          window.location.origin + `/#/${res}/?hash=${value}`;
        window.open(url, "_blank");
      } else {
        this.$message({
          type: "error",
          message: "哈希值输入错误",
          duration: 1600,
          showClose: true
        });
      }
    },
    async confirmSearch(value) {
      this.searchContent = this.searchContent.replace(/(^\s*)|(\s*$)/g, "");
      console.log(this.searchContent);
      if (this.searchContent === "") {
        this.$message({
          type: "error",
          message: "请输入检索内容",
          duration: 1600,
          showClose: true
        });
      } else if (
        /^[0-9A-Za-z]{34}$/.test(this.searchContent) ||
        /^[0-9A-Za-z]{33}$/.test(this.searchContent)
      ) {
        if (jtWallet.isValidAddress(this.searchContent)) {
          let url =
            window.location.origin + `/#/wallet/?wallet=${this.searchContent}`;
          window.open(url, "_blank");
          // }
        } else {
          this.$message({
            type: "error",
            message: "钱包地址输入错误",
            duration: 1600,
            showClose: true
          });
        }
      } else if (/^[0-9A-Za-z]{64}$/.test(this.searchContent)) {
        this.jumpDetailByHash(this.searchContent);
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的检索内容",
          duration: 1600,
          showClose: true
        });
      }
    },
    // switchLanguage(lang) {
    //   this.$i18n.locale = lang;
    //   localStorage.setItem("languageType", lang);
    //   homepageTitle.innerHTML = "--";
    //   this.showLanguage = false;
    // },
    backhome(to) {
      //this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    }
  }
};
</script>

<style lang="scss" scoped>
#headerHav {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  min-width: 900px;
  padding: 0 70px;
  background: rgb(47, 117, 153);
  color: #f4f4fb;
}
.headLogo {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    display: inline-block;
    font-size: 18px;
    color: #f4f4fb;
    margin-left: 15px;
    text-align: left;
  }
}
.searchWarp {
  display: inline-block;
  position: relative;
  white-space: nowrap;
  margin-right: 40px;
  input[type="text"] {
    padding-left: 5px;
  }
  input {
    float: left;
    width: 315px;
    height: 40px;
    text-indent: 5px;
    font-size: 14px;
    border: none;
    border-radius: 4px 0 0 4px;
    background-color: #f9f9f9;
    outline: none;
  }
  .serachButton {
    position: absolute;
    display: inline-block;
    min-width: 45px;
    height: 42px;
    line-height: 40px;
    text-align: center;
    background-color: #6cc0e8;
    color: #fff;
    user-select: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
}
</style>