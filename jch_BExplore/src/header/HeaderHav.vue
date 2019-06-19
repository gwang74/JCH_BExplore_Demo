<template>
  <div id="headerHav">
    <div class="headLogo" @click="backhome('home')">
      <img src="" >
      <span>井创SWTC公链浏览器</span>
    </div>
    <div style="display:flex;align-items:center;">
      <div class="searchWarp">
        <input type="text" v-model="searchContent" placeholder="请输入地址/哈希" v-on:input ="searchTokens"  @blur="closeDialog" @focus="openDialog" @keyup.enter="enterSearch" @keyup.down="downSearch" @keyup.up="upSearch">
        <span class="serachButton" @click="confirmSearch">
          <i class="iconfont icon-sousuoicon el-icon-search"></i>
        </span>
        <div class="dialog" id="dialog" v-show='searchContent !== "" && tokenList.length!== 0 &&showDialog' ref="dialogRef">
          <div v-for=" (item,index) in tokenList" :key="index" class="dialogItem"  @click="jumpTokenDetail(item)"  :class="{'dialogItemBg': index===tokenListIndexes}">
             <div>{{interceptString(tokensSplit(item,1))}}</div><div><span style="margin-right:10px;">发行方:</span>{{interceptString(tokensSplit(item,2),2)}}</div>
          </div>
        </div>
      </div>
      <!-- <el-dropdown @command="switchLanguage" trigger="click">
        <span class="el-dropdown-link">{{languageList[currentLanguage].name}}
          <i class="iconfont icon-yuyanshezhi-xiala"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.label" v-for="(item,index) in languageList" :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
//import logo from "@/images/logo_NavHead.png";
//import { getBlockDetail, fuzzyqueryBytokens } from "../../js/fetch";
//import { jtWallet } from "jcc_wallet";
//var homepageTitle = document.getElementById("homepage_title");
export default {
  name: "headerHav",
  data() {
    return {
      //logo,
      searchContent: "",
      showLanguage: false,
      tokenList: [],
      tokenListIndexes: 0,
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
    tokensSplit(key, index = 1) {
      if (!key) {
        return;
      }
      if (key) {
        var list = key.split("_");
        if (index === 1) {
          return list[0];
        } else {
          return list[1];
        }
      }
    },
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
    getHashType(key) {
      let map = new Map([[1, "blockDetail"], [2, "tradeDetail"]]);
      return map.get(key);
    },
    async jumpDetailByHash(value) {
      let res = await getBlockDetail(value);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        let hashType =
          this.getHashType(this.displayDefaultHashType(res.data).hashType) ||
          this.getHashType(res.data.info.hashType);
        let path = "";
        if (hashType === "tradeDetail") {
          path = "trade";
        } else if (hashType === "blockDetail") {
          path = "block";
        } else {
          return;
        }
        let url =
          window.location.origin + `/#/${path}/${hashType}/?hash=${value}`;
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
    async searchTokens() {
      if (this.searchContent) {
        // console.log(this.searchContent);
        let res = await fuzzyqueryBytokens(this.searchContent);
        if (res.result === true && (res.code === 0 || res.code === "0")) {
          // console.log(res.data);
          this.tokenList = res.data;
        } else {
          this.tokenList = [];
        }
      }
      this.tokenListIndexes = 0;
    },
    jumpTokenDetail(token) {
      this.searchContent = "";
      if (token) {
        let url = window.location.origin + `/#/tokendetail/?token=${token}`;
        window.open(url, "_blank");
      }
    },
    openDialog() {
      this.tokenList = [];
      this.searchContent = "";
      this.showDialog = true;
    },
    closeDialog() {
      setTimeout(() => {
        this.showDialog = false;
        this.tokenListIndexes = 0;
      }, 500);
    },
    enterSearch() {
      this.confirmSearch();
    },
    tokenListscrollTo(index) {
      if (index >= 0 && index < this.tokenList.length) {
        this.$refs.dialogRef.scrollTo(0, index * 36);
      }
    },
    upSearch() {
      if (this.tokenList.length > 0) {
        this.tokenListIndexes--;
        if (this.tokenListIndexes < 0) {
          this.tokenListIndexes = this.tokenList.length - 1;
        }
      }
      this.tokenListscrollTo(this.tokenListIndexes);
    },
    downSearch() {
      if (this.tokenList.length > 0) {
        this.tokenListIndexes++;
        if (this.tokenListIndexes > this.tokenList.length - 1) {
          this.tokenListIndexes = 0;
        }
      }
      this.tokenListscrollTo(this.tokenListIndexes);
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
      } else if (this.tokenList.length > 0) {
        console.log(this.tokenList);
        this.jumpTokenDetail(this.tokenList[this.tokenListIndexes]);
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
  .dialog::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
  .dialog::-webkit-scrollbar-thumb {
    background-color: #f5fcff;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  .dialog::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  .dialog {
    position: absolute;
    width: 360px;
    z-index: 12;
    font-size: 4px;
    margin-top: 5px;
    background: #fff;
    border: 1px solid #d0eef5;
    border-radius: 4px;
    color: #898c97;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
    max-height: 360px;
    overflow-y: auto;
    .dialogItem {
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 5px 10px 5px 10px;
      height: 26px;
      div {
        height: 26px;
        line-height: 26px;
      }
    }
    .dialogItemBg {
      background: rgba(245, 252, 255, 1);
      color: #06aaf9;
    }
    .dialogItem:hover {
      background: rgba(245, 252, 255, 1);
      color: #06aaf9;
      cursor: pointer;
    }
  }
}
.el-dropdown-link {
  display: inline-block;
  white-space: nowrap;
  height: 38px;
  border: 1px solid #18c9dd;
  border-radius: 6px;
  line-height: 38px;
  color: #fff;
  width: 96px;
  cursor: pointer;
  i {
    font-size: 11px;
    margin-left: 3px;
    position: relative;
    bottom: 1px;
  }
}
.el-dropdown-menu {
  background-color: #fff;
  font-size: 14px;
  .el-dropdown-menu__item {
    padding: 0 20px;
    color: #6f6868;
  }
  .el-dropdown-menu__item:hover {
    font-weight: bold;
    color: #06aaf9;
  }
}
</style>