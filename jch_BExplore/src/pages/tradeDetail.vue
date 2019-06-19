<template>
  <div id="tradedetail" class="blo">
    <div class="tradeDetailTitle">
      <span class="tille">当前交易哈希:<span style="color:#06aaf9;padding-left:10px;">43EEFFC182AF96981228A6B6505DF54D528578A5314D186D235E2DEC0BAE1856</span>
      </span>
      <i class=""></i>
      <Ul class="header">
        <li><span style="font-weight:600;">交易类型</span><span style="font-size:12px;">转账</span></li>
        <li><span style="font-weight:600;">账本号</span><span style="font-size:12px;">13097774</span></li>
        <li><span style="font-weight:600;">燃料费用</span><span style="font-size:12px;">0.01</span></li>
        <li><span style="font-weight:600;">转账金额</span><span style="font-size:12px;">0.003201 WYB</span></li>
        <li><span style="font-weight:600;">交易时间</span><span style="font-size:12px;">2019-06-17 09:45:30</span></li>
        <li><span style="font-weight:600;">交易对家</span><span style="font-size:12px;">jMouTdrZU56WuQt4L6WgfwaCFkD2k1Xmbr</span></li>
        <li><span style="font-weight:600;">交易结果</span><span style="font-size:12px;">交易成功</span></li>
        <li><span style="font-weight:600;">交易备注:</span><span style="font-size:12px;">消耗微饮产出NTCC</span></li>
      </Ul>
    </div>

    <div class="tradeList">
      <div class="tradeListData">
        <div class="title">交易明细</div>
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
           <el-table-column prop="type" label="交易方式" id="ellipsis" width="130px" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"> <i :class="scope.row.displayDifferentBg" style="margin-right:6px;"></i>--</div>
            </template>
          </el-table-column>
           <el-table-column prop="count" label="交易内容" id="ellipsis" min-width="10%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">--</span>
              </template>
          </el-table-column>
          <el-table-column prop="_id"  label="交易价格"  id="ellipsis" align="center" header-align="center" min-width="47%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail('tradeDetail',scope.row._id)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="initiator"  label="交易对家"  id="ellipsis"  align="right" header-align="right"  min-width="22%" >
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "blockDetail",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      blockList: [],
      hashtime: {},
      bash: {},
      hash: "",
      loading: false,
      total: 0,
      currentPage: 1,
      gopage: 1
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    async getTranstionListByHash() {
      this.blockList = [];
      if (this.loading) {
        return;
      }
      this.loading = true;
      let data = {
        page: this.currentPage || "1",
        size: 20,
        total: this.total,
        hash: this.hash || ""
      };
      let res = await getTransListByHash(data);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.blockList = this.handleHistoryData(res);
      } else {
        this.blockList = [];

        this.gopage = 0;
      }
      this.loading = false;
    },
    async getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.hash = this.$route.query.hash;
      let res = await getBlockDetail(this.hash);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.blockList = this.handleHistoryData(res);
        this.bash = res.data.info;
        // this.bash = {};
      } else {
        this.blockList = [];
        this.bash = {};
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    clearGopage() {
      this.gopage = "";
    },
    handleHistoryData(res) {
      let i = 0;
      let list = [];
      if (res && res.data && res.data.list.length > 0) {
        for (; i < res.data.list.length; i++) {
          list.push({
            matchFlag:
              this.getMatchFlag(res.data.list[i].matchFlag) ||
              this.getMatchFlag(
                this.judgeTransferFailure(res.data.list[i].succ)
              ),
            sort: (this.currentPage - 1) * 20 + i + 1,
            type: res.data.list[i].type,
            flag: res.data.list[i].flag,
            displayDifferentBg: this.getTypeBg(res.data.list[i].type) || "",
            displayDifferentColor:
              this.getFlagColor(res.data.list[i].flag) ||
              this.getFlagColor(res.data.list[i].type) ||
              "",
            takerPaysCurrency: this.interceptStringByEllipsis(
              this.displayDefaultCurrency(res.data.list[i].takerPays).currency
            ),
            takerPaysValue: this.displayDefaultValues(
              res.data.list[i].takerPays
            ).value,
            takerGetsCurrency: this.interceptStringByEllipsis(
              this.displayDefaultCurrency(res.data.list[i].takerGets).currency
            ),
            takerGetsValue: this.displayDefaultValues(
              res.data.list[i].takerGets
            ).value,
            takerCurreny: this.interceptStringByEllipsis(
              this.displayDefaultCurrency(res.data.list[i].amount).currency
            ),
            takerValue: this.displayDefaultValues(res.data.list[i].amount)
              .value,
            fee: res.data.list[i].fee || "---",
            account: res.data.list[i].account || "---",
            _id: res.data.list[i]._id || "---"
          });
        }
        this.total = res.data.count;
        this.allpage = Math.ceil(this.total / 20);
        this.gopage = this.allpage;
      } else {
        this.total = 0;
        this.allpage = 0;
        this.gopage = 0;
      }
      return list;
    },
    isEmptyObject(bash) {
      if (isEmptyObject(bash)) {
        return true;
      } else {
        return false;
      }
    },
    cnyTransformCNT(value) {
      if (value === "CNY") {
        return "CNT";
      } else {
        return value;
      }
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
    jumpSizeChange() {
      if (
        this.currentPage !== parseInt(this.gopage) &&
        parseInt(this.gopage) <= parseInt(this.allpage) &&
        parseInt(this.gopage) >= parseInt(1) &&
        Number.isInteger(parseInt(this.gopage))
      ) {
        console.log(this.gopage, this.total);
        this.currentPage = this.gopage;
        this.loading = false;
        this.getTranstionListByHash();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = false;
      this.getTranstionListByHash();
    },
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          _id: res[i]._id,
          transNum: res[i].transNum,
          hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      return list;
    },
    jumpDetail(hash) {
      if (hash) {
        let url = window.location.origin + `/#/trade/tradeDetail/?hash=${hash}`;
        window.open(url, "_blank");
      }
    },
    jumpWalletPage(value) {
      if (value && value !== "---") {
        let url = window.location.origin + `/#/wallet/?wallet=${value}`;
        window.open(url, "_blank");
      }
    },
    jumpLastBlochDetail(hash) {
      if (hash) {
        let url = window.location.origin + `/#/block/blockDetail/?hash=${hash}`;
        window.open(url, "_blank");
      }
    },
    judgeTransferFailure(value) {
      if (value !== "tesSUCCESS") {
        return "zhuanzhangshiba";
      }
    },
    handleHashtime(time) {
      if (time) {
        let { fillZero } = this;
        let dateIn = new Date((time + 946684800) * 1000);
        let hashTime = "";
        hashTime =
          fillZero(dateIn.getFullYear()) +
          "-" +
          fillZero(dateIn.getMonth() + 1) +
          "-" +
          fillZero(dateIn.getDate()) +
          " " +
          fillZero(dateIn.getHours()) +
          ":" +
          fillZero(dateIn.getMinutes()) +
          ":" +
          fillZero(dateIn.getSeconds());
        return hashTime;
      }
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    }
  }
};
  
</script>

<style lang="scss" scoped>
#blockdetail {
  text-align: center;
  min-width: 900px;
  padding: 0 70px;
  padding-bottom: 50px;
  background: #f2f8fc;
}

.tradeDetailTitle {
  text-align: left;
  width: 90%;
  margin-left: 60px;
  div {
    display: inline-block;
  }
  .tille {
    width: 25%;
    padding: 16px 0;
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    font-size: 16px;
    color: #3e3f45;
    float: left;
  }
  .tille:nth-child(2) {
    color: #18c9dd;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    width: calc(75% - 22px);
    text-align: right;
  }
  .tilleIcon {
    font-size: 10px;
    float: right;
    padding: 20px 0 16px 0;
    color: #18c9dd;
  }
  .header {
    width: 100%;
    overflow: hidden;
    border: 1.8px solid #c1e9f1;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    li {
      display: flex;
      justify-content: space-between;
      height: 40px;
      overflow: hidden;
      font-size: 14px;
      line-height: 40px;
      padding: 0 20px;
      color: #5f5d5d;
      border-bottom: 1px solid #e0e8ed;
    }
    li:nth-child(3) {
      border-bottom: 0;
    }
  }
}


.tradeList {
  background-color: #f2f8fc;
  border: 1px solid #d0eef5;
  width: 93%;
  margin-left: 60px;
}

.title {
  background: linear-gradient(to right, #0ab1f2, #26e0cc);
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  border-bottom: 1px #d0eef5;
}

.lastHash {
  color: #636161;
  font-size: 12px;
  font-family: PingFangSC-Regular;
}
.lastHash:hover {
  color: #06aaf9;
  cursor: pointer;
  font-weight: 600;
}


</style>