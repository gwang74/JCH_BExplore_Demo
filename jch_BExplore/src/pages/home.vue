<template>
  <div id="home">
    <section style="background-color: rgb(83, 200, 212);min-height:260px;">
       <div class="topImgBox"><img src="../images/bk.jpg" object-fit="cover"></div>
     </section>
     <section class="init">
       <div class="top">
         <div id="index_circle"><img src="" style="max-width:462px;height:264px;"></div>
         <div class="topLeft">
            <img src=""  id="index_net">
         </div>
         <div class="topRight" >
          <div class="index"><img src=""></div>
            <p class="browser">井创SWTC公链浏览器</p>
            <div class="searchWarp">
              <input type="text" v-model="searchContent" :placeholder="searchPlacehoder" v-on:input ="searchTokens"  @blur="closeDialog" @focus="openDialog" @keyup.enter="enterSearch" @keyup.down="downSearch" @keyup.up="upSearch">
              <span class="serachButton"  @click="confirmSearch">
                <i class="iconfont icon-sousuoicon el-icon-search"></i>
              </span>
              <div class="dialog" id="dialog" v-show='searchContent !== "" && tokenList.length!== 0&&showDialog' ref="dialogRef">
                    <div v-for=" (item,index) in tokenList" :key="index" class="dialogItem"  @click="jumpTokenDetail(item)" :class="{'dialogItemBg': index===tokenListIndexes}">
                        <div>{{interceptString(tokensSplit(item,1))}}</div><div><span style="margin-right:10px;">钱包:</span>{{interceptString(tokensSplit(item,2),2)}}</div>
                    </div>
                </div>
            </div>
         </div>
        </div>
     </section>
     <section>
       <div style="display:flex;align-items:center;justify-content: flex-end;margin-right:60px;margin-top:15px;" >
          <span  style="font-size:16px;font-weight:400;"  :style="{'color':showSwitch?'#18C9DD':'#828f90'}">实时更新</span>
          <el-switch style="width:42px;height:24px;margin-left:10px" v-model="showSwitch" active-color="#18C9DD" inactive-color="#cbd1d2"  @change="isrefreshData"></el-switch>
        </div>
     </section>
     <section >
      <div class="pilot">
        <div style="display:flex;align-items:center;justify-content: center;">
          <img src="../images/block.png" style="height:39px;width:39px;">
          <span class="block">区块高度</span>
        </div>
        <div class="buttom" @click="searchAll('block')">
          <div class="buttomContent"><i class="iconfont icon-chakangengduoicon"></i>
          查看更多</div>
        </div>
      </div>
      <div id="list"   v-show="listnum.length !==0">
        <div class="contentList">
          <li v-for="(item,index) of  listnum" :key="index">
            <div style="padding:20px;">
                  <div style="color:##303052;font-size:14px;font-weight:600;white-space:nowrap;margin-bottom:8px;">
                    <span style="margin-right:10px;">高度</span>{{item._id}}
                  </div>
                  <div class="display:flex;align-items: center;font-size:14px;margin:10px 0">
                    <span style="color:#93A3B7;margin-right:10px;font-size:14px;">交易数
                      </span><span style="font-size:14px;" :class="'className'+index" >{{item.transNum}}</span>
                  </div>
                  <div class="hash" @click="jumpDetail('blockDetail',item.hash)" >{{item.hash}}</div>
                  <div class="time" >{{handleHashtime(item.time)}}</div>
            </div>
          </li>
         </div>
        </div>
        <div v-show="listnum.length === 0" class="v-show" style="background-color:#fff;margin:0 60px;border: 1px solid #C1E9F1;">
           <div v-if="loadingBlock"   style="height:100px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
            <div class="noDataHome" v-else >
                 <i class="iconfont icon-zanwushuju1 "></i>没有数据
            </div>
        </div>
     </section>
          <section>
      <div class="end" style="margin: 0 60px;;">
        <div class="endTop" >
          <div style="display:flex;align-items:center;">
            <img src="../images/trade.png" style="height:39px;width:39px;">
            <span class="block">最新数据</span>
          </div>
          <div class="buttom" @click="searchAll('trade')" >
             <div class="buttomContent"><i class="iconfont icon-chakangengduoicon"></i>
            查看更多</div>
          </div>
        </div>
        <div class="endMidder">
          <div style="width:100%;">
           <el-table :data="latestdeal" style="width:100%" :row-style="rowStyle" header-row-class-name="homeHeaderRowclass">
           <ul slot="empty" style="background-color:#fff;margin:0 60px;">
            <div v-if="loadingTrade"   style="height:100px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
             <div class="noDataHome" v-else >
                 <i class="iconfont icon-zanwushuju1 "></i>
                  暂无数据
            </div>
           </ul>
          <el-table-column  width="30px"></el-table-column>
           <el-table-column  prop="sort" label="序号" min-width="8%" align="left" header-align="left"></el-table-column>
           <el-table-column prop="type" label="交易类型" id="ellipsis" width="130px" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"> <i :class="scope.row.displayDifferentBg" style="margin-right:6px;"></i>--</div>
              <!-- <span :class="scope.row.displayDifferentBg" style="margin-right:6px;"></span> -->
            </template>
          </el-table-column>
           <el-table-column prop="flag" label="交易方式" id="ellipsis" min-width="10%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">--</span>
              </template>
          </el-table-column>
          <el-table-column prop="_id"  label="交易哈希"  id="ellipsis" align="center" header-align="center" min-width="47%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail('tradeDetail',scope.row._id)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  label="交易内容"  id="ellipsis"  align="right" header-align="right"  min-width="22%" >
            <template slot-scope="scope">
                <span v-if="scope.row.takerPaysValue" style="color:#3B3F4C;">
                    <span style="white-space: nowrap;">{{scope.row.takerGetsValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-danxiangjiantou1 "></i>
                    <span style="white-space: nowrap;">{{scope.row.takerPaysValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
                <span v-else-if="scope.row.takerValue" style="color:#3B3F4C;">
                      <span style="white-space: nowrap;">{{scope.row.takerValue}}</span>
                      <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerCurreny)}}</span>
                </span>
                <span v-else style="color:#3B3F4C;">---</span>
            </template>
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
        </el-table>
        </div>
        </div>
    </div>
     </section>
    <section>
      <div class="endEnd">
        <div class="endEndLeft" >
          <img src="">
          <span>井创SWTC公链浏览器</span>
          <div></div>
          <span>合肥井创数字科技有限公司</span>
        </div>
        <div class="endEndRignt">
          <span @click="jumpWellcomePage">井创官网</span>
        </div>
      </div>
     </section>
  </div>
</template>

<script>
export default {
  name: "home",
  created() {
    //this.getlastBlocklists();
    //this.getLatestDeals();
  },
  data() {
    return {
      listnum: [],
      tokenList: [],
      showSwitch: false,
      searchContent: "",
      searchPlacehoder:"请输入币种/地址/哈希",
      input: "",
      latestdeal: [],
      loadingBlock: false,
      loadingTrade: false,
    };
  },
  methods: {
       async getlastBlocklists() {
      // this.listnum = [];
      if (this.loadingBlock) {
        return;
      }
      this.loadingBlock = true;
      let res = await getlastBlocklist();
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.listnum = res.data.list;
      } else {
        this.listnum = [];
      }
      this.loadingBlock = false;
    },
    async getLatestDeals() {
      // this.latestdeal = [];
      if (this.loadingTrade) {
        return;
      }
      this.loadingTrade = true;
      let res = await getLatestDeal();
      // let res2 = await getTokensDetail({
      //   tokens: "JSLASH_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
      //   page: "2"
      // });
      // let res3 = await getTokens();
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.latestdeal = this.handleGetData(res.data.list);
      } else {
        this.latestdeal = [];
      }
      this.loadingTrade = false;
    },
    jumpTokenDetail(token) {
      this.searchContent = "";
      if (token) {
        let url = window.location.origin + `/#/tokendetail/?token=${token}`;
        window.open(url, "_blank");
      }
    },
    jumpWellcomePage() {
      window.open("https://jccdex.cn/#page1");
    },
    async searchTokens() {
      if (this.searchContent) {
        let res = await fuzzyqueryBytokens(this.searchContent);
        if (res.result === true && (res.code === 0 || res.code === "0")) {
          this.tokenList = res.data;
        } else {
          this.tokenList = [];
        }
      }
    },
    searchAll(to) {
      //this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "background:#EDF5FA;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
      }
    },
    isrefreshData() {
      clearInterval(this.timer);
      if (this.showSwitch) {
        this.timer = setInterval(() => {
          this.getlastBlocklists();
          this.getLatestDeals();
        }, 10000);
      }
      // console.log(this.showSwitch);
    },
    openDialog() {
      this.tokenList = [];
      this.searchContent = "";
      this.showDialog = true;
    },
    closeDialog() {
      setTimeout(() => {
        this.tokenListIndexes = 0;
        this.showDialog = false;
      }, 500);
    },
    enterSearch() {
      this.confirmSearch();
    },
    async confirmSearch(value) {
      this.searchContent = this.searchContent.replace(/(^\s*)|(\s*$)/g, "");
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
        this.jumpTokenDetail(this.tokenList[this.tokenListIndexes]);
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的检索内容",
          duration: 1600,
          showClose: true
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home {
  width: 100%;
  background: #f2f8fc;
  display: flex;
  flex-direction: column;
  min-width: 1024px;
  .noDataHome {
    color: #cbd4e2;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 27px 0;
    i {
      font-size: 50px;
    }
  }
  .topImgBox > img {
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 41, 198, 1) 0%,
      rgba(31, 71, 220, 1) 100%
    );
    max-height: 260px;
  }
}

.init {
  position: absolute;
  width: 100%;
  min-height: 260px;
  min-width: 1024px;
}
.top {
  min-width: 1024px;
  width: 100%;
  height: 25%;
  min-height: 260px;
  display: flex;
  #index_circle {
    width: 50%;
    height: 260px;
  }
  .topLeft {
    width: 50%;
    height: 100%;
    position: absolute;
    flex-direction: column;
  }
  .topRight {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    #index_net {
      position: absolute;
      width: 26%;
      height: 200px;
      // top: 51px;
      right: 350px;
      bottom: 0px;
      max-width: 300px;
    }
    .buttomList {
      position: absolute;
      right: 198px;
      top: 27px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 400;
      .token {
        display: flex;
        align-items: center;
        height: 30px;
        padding-right: 9px;
        background: rgba(56, 95, 246, 1);
        border-radius: 4px;
        color: #fff;
        i {
          margin: 0 7px 0 9px;
        }
      }
      .token:hover {
        color: #0ad8f0;
      }
      span {
        margin-left: 28px;
      }
      span:hover {
        color: #0ad8f0;
        cursor: pointer;
      }
    }
    #changelan {
      position: absolute;
      right: 70px;
      height: 40px;
      margin-top: 19px;
      width: 98px;
    }
    .state {
      width: 180px;
      vertical-align: center;
      font-size: 10px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        270deg,
        rgba(4, 168, 249, 1) 0%,
        rgba(35, 220, 205, 1) 100%
      );
      position: absolute;
      top: 78px;
      right: 190px;
      border-radius: 8px;
      text-align: left;
      padding: 7px 9px 9px 9px;
    }
    @media screen and (max-width: 1080px) {
      .state {
        right: 190px;
      }
      #index_net {
        right: 320px;
      }
    }
  }
}
.browser {
  font-size: 22px;
  color: #f4f4fb;
  margin-top: 13px;
  min-height: 30px;
  // width: 50%;
  // margin-left: 25%;
  // min-width: 176px;
  font-family: HYYaKuHeiW;
}    
.buttom {
  width: 150px;
  color: #9daebb;
  font-size: 14px;
  position: relative;
}
.buttom:hover {
  color: #18c9dd;
  cursor: pointer;
}
.buttomContent {
  position: absolute;
  // bottom: 0;
  right: 0;
}
.searchWarp {
  display: inline-block;
  white-space: nowrap;
  margin-top: 30px;
  min-width: 315px;
  input[type="text"] {
    padding-left: 5px;
  }
  input {
    width: 320px;
    height: 40px;
    text-indent: 5px;
    font-size: 14px;
    border: none;
    outline: none;
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
    background-color: #4789a9;
    color: #fff;
    user-select: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
}
.header {
  background-color: rgb(35, 74, 222);
  width: auto;
  min-height: 240px;
}
.main {
  background-color: rgb(247, 247, 247);
  width: auto;
  min-height: 500px;
}
.footer {
  background-color: rgb(35, 74, 222);
  font-size: 14px;
  color: #f4f5fe;
  width: auto;
  min-height: 60px;
}
.contentList {
  border: 1px solid #c1e9f1;
}
.block {
    height: 40px;
    min-width: 100px;
    padding: 0 3px;
    background: linear-gradient(90deg, #4a99a5, #4ca0ca);
    margin-left: 13px;
    border-radius: 13px;
    color: #f2f8fc;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.hash {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 12px;
  margin: 10px 0;
  color: #6f6868;
}
.hash:hover {
  color: #06aaf9;
  cursor: pointer;
  font-weight: bold;
}
.time {
  color: #8a8d90;
  font-size: 12px;
}
.pilot {
  margin: 10px 60px 10px 60px;
  height: 22%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.endTop {
  height: 22%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.endMidder {
  margin-top: 10px;
  border: 1px solid #c1e9f1;
  .idSpan2 {
    color: #6f6868;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .idSpan2:hover {
    color: #06aaf9;
    cursor: pointer;
  }
}
.endEnd {
  position: relative;
  display: flex;
  background: rgb(83, 200, 212);
  align-items: center;
  height: 50px;
  padding: 0 60px;
  margin-top: 80px;
  justify-content: space-between;
  .endEndLeft {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #f4f5fe;
    width: 60%;
    span {
      margin-left: 10px;
    }
    div {
      margin-left: 10px;
      width: 2px;
      height: 14px;
      background: #eef1fe;
      border-radius: 1px;
    }
    img {
      height: 30px;
      width: 30px;
    }
  }
  .endEndRignt {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6b9eff;
    text-align: right;
    span:hover {
      color: #18c9dd;
      cursor: pointer;
    }
    div {
      margin: 0 20px;
      width: 2px;
      height: 14px;
      background: #eef1fe;
      border-radius: 1px;
    }
  }
}
</style>
