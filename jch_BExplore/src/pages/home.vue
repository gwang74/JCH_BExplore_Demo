<template>
  <div id="home">
    <section style="background-color: rgb(47, 117, 153);min-height:260px;">
       <div class="topImgBox"><img src="../images/bk.jpg"></div>
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
              <input type="text" v-model="searchContent" :placeholder="searchPlacehoder">
              <span class="serachButton"  @click="confirmSearch">
                <i class="iconfont icon-sousuoicon el-icon-search"></i>
              </span>
            </div>
         </div>
         <div id="wallet" @click="createWallet">
              <span><i class="iconfont el-icon-wallet"></i>创建钱包
              </span>
           </div>
           <div id="transfer" @click="transferAction">
              <span><i class="iconfont el-icon-coin"></i>钱包转账
              </span>
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
          <div class="buttomContent"><i class="iconfont el-icon-arrow-right"></i>
          查看更多</div>
        </div>
      </div>
      <div id="list"   v-show="listnum.length !==0">
        <div class="contentList">
          <li v-for="(item,index) of  listnum" :key="index">
            <div style="padding:20px;">
                  <div style="color:##303052;font-size:14px;font-weight:600;white-space:nowrap;margin-bottom:8px;">
                    <span style="margin-right:10px;">高度</span>{{item.ledger_index}}
                  </div>
                  <div class="display:flex;align-items: center;font-size:14px;margin:10px 0">
                    <span style="color:#93A3B7;margin-right:10px;font-size:14px;">交易数
                      </span><span style="font-size:14px;" :class="'className'+index" >{{item.transactionLength}}</span>
                  </div>
                  <div class="hash" @click="jumpDetail('blockDetail',item.hash)" >{{item.ledger_hash}}</div>
                  <div class="time" >{{item.close_time_human}}</div>
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
             <div class="buttomContent"><i class="iconfont el-icon-arrow-right"></i>
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
          </el-table-column>
           <el-table-column prop="flag" label="交易方式" id="ellipsis" min-width="10%" align="center">
          </el-table-column>
          <el-table-column prop="_id"  label="交易哈希"  id="ellipsis" align="center" header-align="center" min-width="47%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail('tradeDetail',scope.row._id)">{{scope.row._id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  label="交易内容"  id="ellipsis"  align="right" header-align="right"  min-width="22%" >
            <!-- <template slot-scope="scope">
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
            </template> -->
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
import {
        getLedgerNew,
        getHomeData,
        getTransactionsByHash,
        getLedgerInformationByHash
} from '../js/request';
import {
       getTransactionAmount,
       getType
} from '../js/utils';
import { jtWallet } from "jcc_wallet";
export default {
  name: "home",
  created() {
    this.getlastBlocklists();
    this.getLatestDeals();
  },
  data() {
    return {
      listnum: [],
      showSwitch: false,
      searchContent: "",
      searchPlacehoder:"请输入地址/哈希",
      input: "",
      latestdeal: [],
      loadingBlock: false,
      loadingTrade: false,
    };
  },
  methods: {
       async getlastBlocklists() {
      if (this.loadingBlock) {
        return;
      }
      this.loadingBlock = true;
      let res = await getLedgerNew();
      if (res.length > 0) {
        this.listnum = res;
      } else {
        this.listnum = [];
      }
      this.loadingBlock = false;
    },
    async getLatestDeals() {
      if (this.loadingTrade) {
        return;
      }
      this.loadingTrade = true;
      let res = await getHomeData();
      if (res.length > 0) {
        this.latestdeal = this.handleGetData(res);
      } else {
        this.latestdeal = [];
      }
      this.loadingTrade = false;
    },
     handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          sort: i + 1,
          _id: res[i].hash,
          type: getType(res[i].type),
          flag: res[i].flag || "---",
          transactionAmount: getTransactionAmount(res[i].type, res[i].effects, res[i].amount),
          time: res[i].date
        });
      }
      return list;
    },
    displayDefaultValues(value) {
      if (value) {
        return value;
      } else {
        return { value: undefined };
      }
    },
    displayDefaultCurrency(value) {
      if (value) {
        return value;
      } else {
        return { currency: undefined };
      }
    },
    cnyTransformCNT(value) {
      if (value === "CNY") {
        return "CNT";
      } else {
        return value;
      }
    },
    jumpWellcomePage() {
      //window.open("https://jccdex.cn/#page1");
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
    jumpDetail(name, hash) {
      let path = "";
      if (name === "tradeDetail") {
        path = "trade";
      } else if (name === "blockDetail") {
        path = "block";
      } else {
        return;
      }
      let url = window.location.origin + `/#/${name}/?hash=${hash}`;
      window.open(url, "_blank");
    },
    enterSearch() {
      this.confirmSearch();
    },
    createWallet() {
        this.$router.push(`/createWallet`);
    },
    transferAction() {
        this.$router.push(`/transferAction`);
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
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的检索内容",
          duration: 1600,
          showClose: true
        });
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
    opacity: 0.2;
    object-fit: cover;
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
#wallet {
    position: absolute;
    bottom: 10px;
    left: 70px;
    height: 40px;
    width: 120px;
    background: #6cc0e8;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    text-align-last: center;
    line-height: 38px;
    color: white;
    cursor: pointer;
}
#transfer {
    position: absolute;
    bottom: 10px;
    left: 210px;
    height: 40px;
    width: 120px;
    background: #7cb9ab;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    text-align-last: center;
    line-height: 38px;
    color: white;
    cursor: pointer;
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
    background-color: #6cc0e8;
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
.hashSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6f6868;
  font-size: 14px;
  cursor: pointer;
}
.hashSpan:hover {
  color: #06aaf9;
  font-weight: bold;
}
#list {
  margin: 0 60px;
  text-align: left;
  background-color: #fff;
  .contentList {
    display: flex;
    border: 1px solid #c1e9f1;
  }
  li {
    width: 16.6%;
    list-style-type: none;
    border-right: 1px solid #e3eef0;
  }
  li:nth-last-child(1) {
    border: 0;
  }
}
.block {
    height: 28px;
    min-width: 100px;
    padding: 0 3px;
    background: linear-gradient(90deg, #4a99a5, #4ca0ca);
    border-radius: 0px 13px 13px 0px;
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
  background: rgb(47, 117, 153);
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
