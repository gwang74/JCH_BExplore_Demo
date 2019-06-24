<template>
  <div id="blockdetail" class="blo">
    <div class="blockDetailTitle">
      <span class="tille">
        当前区块:
        <span style="color:#06aaf9;padding-left:10px;">{{this.bash.block}}</span>
      </span>
      <span class="tille">
        区块哈希值:
        <span style="padding-left:10px;text-align:right;">{{bash._id}}</span>
      </span>
      <i class></i>
      <Ul class="header">
        <li>
          <span style="font-weight:600;">关闭时间</span>
          <span style="font-size:12px;">{{bash.time}}</span>
        </li>
        <li>
          <span style="font-weight:600;">交易数量</span>
          <span style="font-size:12px;">{{bash.transNum}}</span>
        </li>
        <li>
          <span style="font-weight:600;">上一区块哈希值</span>
          <span @click="jumpLastBlochDetail(bash.parentHash)" class="lastHash">{{bash.parentHash}}</span>
        </li>
      </Ul>
      <!-- <Ul v-show="isEmptyObject(bash)">
        <div v-if="loading"  style="height:79px;width:100%; border:1.8px solid #c1e9f1;border-radius: 8px;margin-bottom:20px;" v-loading="true" element-loading-spinner="el-icon-loading" :element-loading-text="$t('message.desperateLoading')"></div>
        <div v-else  style="height:80px;width:100%;text-align:center;line-height:80px;color:#909399;background:#fff;margin-bottom:20px; border: 1.8px solid #c1e9f1;border-radius: 8px;   ">{{$t('message.home.notransaction')}}</div>
      </Ul>-->
    </div>

    <div class="bockList">
      <div class="bockListData">
        <div class="title">交易记录</div>
        <el-table :data="latestdeal" style="width:100%" :row-style="rowStyle" header-row-class-name="homeHeaderRowclass">
           <ul slot="empty" style="background-color:#fff;margin:0 60px;">
            <div v-if="loadingTrade"   style="height:100px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
             <div class="noDataHome" v-else >
                 <i class="iconfont icon-zanwushuju1 "></i>
                  加载中
            </div>
           </ul>
          <el-table-column  width="30px"></el-table-column>
           <el-table-column  prop="sort" label="序号" min-width="8%" align="left" header-align="left"></el-table-column>
           <el-table-column prop="type" label="交易类型" id="ellipsis" width="130px" align="left" header-align="left">
          </el-table-column>
           <el-table-column prop="mode" label="交易方式" id="ellipsis" min-width="10%" align="center">
          </el-table-column>
          <el-table-column prop="_id"  label="交易哈希"  id="ellipsis" align="center" header-align="center" min-width="47%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpTradeDetail(scope.row._id)">{{scope.row._id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="initiator"  label="发起方"  id="ellipsis"  align="right" header-align="right"  min-width="28%" >
            <template slot-scope="scope">
                  <span class="hashSpan" @click="jumpWalletDetail(scope.row.initiator)">{{scope.row.initiator}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="fee" label="费用" id="fee" min-width="10%" align="center">
               <template slot-scope="scope">
                  <span class="spanAccount">{{scope.row.fee}}SWTC</span>
              </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  label="交易内容"  id="ellipsis"  align="right" header-align="right"  min-width="22%" >
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getLedgerInformationByHash,
  getTransactionsByHash
} from "../js/request";
import {
       getTransactionAmount,
       getType,
       getOffertype
} from '../js/utils';
export default {
  name: "blockDetail",
  created() {
    this.getData();
  },
  data() {
    return {
      blockList: [],
      hashtime: {},
      bash: {},
      hash: "",
      latestdeal: [],
      loadingTrade: false,
      loading: false,
      total: 0,
      currentPage: 1,
      gopage: 1
    };
  },

  methods: {
    async getData() {
      // if (this.loading) {
      //   return;
      // }
      // this.loading = true;
      this.hash = this.$route.query.hash;
      let res = await getLedgerInformationByHash(this.hash);
      if (res.success === true) {
        this.bash = {
          block: res.seqNum,
          _id: res.ledger_hash,
          time: res.close_time_human,
          transNum: res.transactionLength,
          parentHash: res.parent_hash
        };
        this.latestdeal = await this.handleHistoryData(res);
      } else {
        this.bash = {};
        this.latestdeal = [];
      }
    },
    clearGopage() {
      this.gopage = "";
    },
    async handleHistoryData(res) {
      let i = 0;
      let list = [];
      if (res && res.transactions.length > 0) {
        for (; i < res.transactions.length; i++) {
          let results = await getTransactionsByHash(res.transactions[i]);
          list.push({
            sort: i + 1,
            type: getType(results.type),
            mode: getOffertype(results.offertype),
            _id: results.hash,
            initiator: results.account,
            fee: results.fee,
            count: "-"
          });
        }
      } else {
        // this.total = 0;
        // this.allpage = 0;
        // this.gopage = 0;
      }
      return list;
    },

    jumpLastBlochDetail(hash) {
      let url = window.location.origin + `/#/blockDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },

    jumpTradeDetail(hash) {
      let url = window.location.origin + `/#/tradeDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },

    jumpWalletDetail(hash) {
      let url = window.location.origin + `/#/walletDetail/?hash=${hash}`;
      window.open(url, "_blank");
    },
    
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

.blockDetailTitle {
  text-align: left;
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
    width: 97%;
    overflow: hidden;
    border: 1.8px solid #c1e9f1;
    height: 120px;
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

.bockList {
  background-color: #f2f8fc;
  border: 1px solid #d0eef5;
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
</style>