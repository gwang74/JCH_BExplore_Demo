<template>
<div>
<headerHav></headerHav>
  <div id="trade" class="blo">
    <div class="selectionDate">
      <div class="blocktitle">
        <img src='../images/trade.png' style="height:39px;width:39px;"/>
        <span>最新交易</span>
      </div>
    </div>
    <div class="bockList">
      <div class="bockListData">
        <el-table :data="tranList" style="width:100%" :row-style="rowStyle"  row-class-name="traderowClass" header-row-class-name="tradeHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading"  style="height:79px;width:100%"  v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
             <div  v-else style="margin:114px 0 159px 0;font-size:14px;font-weight:400;color:#BBC7CE;">
                  <div style=" position: relative;"><i class="iconfont icon-wujiaoyijilu" style="font-size:155px;">
                  </i><br/>
                  <span style="position: relative;left:-9px;">无交易信息</span></div>
            </div>
          </div>
          <el-table-column  width="30px">
             <template slot-scope="scope">
              <div style="overflow:visible;">
                 <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>
              </div>
            </template>
          </el-table-column>
           <el-table-column prop="sort" label="序号" min-width="8%"></el-table-column>
          <el-table-column prop="type" label="交易类型" id="ellipsis" width="130px" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"> <i :class="scope.row.displayDifferentBg" style="margin-right:6px;"></i>--</div>
            </template>
          </el-table-column>
           <el-table-column prop="flag" label="交易方式" id="ellipsis" min-width="8%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">--</span>
              </template>
          </el-table-column>
          <el-table-column prop="_id"  label="交易哈希"  id="ellipsis" align="center" header-align="center" min-width="37%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row._id)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  label="交易内容"  id="ellipsis"  align="right" header-align="right"  min-width="27%" >
            <template slot-scope="scope">
                <span v-if="scope.row.takerPaysValue"  style="color:#3B3F4C">
                    <span style="white-space: nowrap;">{{scope.row.takerGetsValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-danxiangjiantou1 "  style="color:#3B3F4C"></i>
                    <span style="white-space: nowrap;">{{scope.row.takerPaysValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
                <span v-else-if="scope.row.takerValue"  style="color:#3B3F4C">
                      <span style="white-space: nowrap;">{{scope.row.takerValue}}</span>
                      <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerCurreny)}}</span>
                </span>
                <span v-else  style="color:#3B3F4C">---</span>
            </template>
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
        </el-table>
      </div>
        <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li>跳至
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          页
        </li>
        <li>
          <div class="sortButton" @click="jumpSizeChange">确认</div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
//import { getTranslist } from "../../js/fetch";
// import {
//   getTransactionType,
//   getTransactionMode,
//   getFlagColor,
//   getTypeBg,
//   interceptStringByEllipsis,
//   getMatchFlag
// } from "@/js/utils";
//import common from "../../mixins/common";
export default {
  name: "trade",
  //mixins: [common],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // selectedDate: "",
      tranList: [],
      // getRowClass: String,
      index: String,
      // defaultValue: "",
      // labelclass: String,
      // hashtime: String,
      total: 0,
      loading: false,
      currentPage: 1,
      gopage: 1
    };
  },
  created() {
    let data = {
      page: 1,
      size: 20
    };
    this.getAllList(data);
  },
  methods: {
    async getAllList(data) {
      this.tranList = [];
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getTranslist(data);
      console.log(res, "jiao yi");

      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.tranList = this.handleGetData(res.data.list);
      } else {
        this.tranList = [];
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          sort: (this.currentPage - 1) * 20 + i + 1,
          // seq: res[i].seq || "---",
          _id: res[i]._id,
          matchFlag:
            this.getMatchFlag(res[i].matchFlag) ||
            this.getMatchFlag(this.judgeTransferFailure(res[i].succ)),
          type: res[i].type,
          flag: res[i].flag || res[i].type,
          displayDifferentBg: this.getTypeBg(res[i].type) || "",
          displayDifferentColor:
            this.getFlagColor(res[i].flag) ||
            this.getFlagColor(res[i].type) ||
            "",
          takerPaysCurrency: this.interceptStringByEllipsis(
            this.displayDefaultCurrency(res[i].takerPays).currency
          ),
          takerPaysValue: this.displayDefaultValues(res[i].takerPays).value,
          takerGetsCurrency:
            this.interceptStringByEllipsis(
              this.displayDefaultCurrency(res[i].takerGets).currency
            ) || "---",
          takerGetsValue: this.displayDefaultValues(res[i].takerGets).value,
          takerCurreny:
            this.interceptStringByEllipsis(
              this.displayDefaultCurrency(res[i].amount).currency
            ) || "---",
          takerValue: this.displayDefaultValues(res[i].amount).value,
          // takerFlag: this.judgeIsMatch(res[i].takerFlag) || "---",
          // displayDifferentCircles: getType(res.data.list[i].flag) || "",
          // transNum: this.handleData(res[i].transNum, 1),
          // hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      // this.defaultValue = "---";
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
    judgeTransferFailure(value) {
      if (value !== "tesSUCCESS") {
        return "zhuanzhangshiba";
      }
    },
    handleHashtime(time) {
      let { fillZero } = this;
      let dateIn = new Date((time + 946684800) * 1000);
      let hashTime = "";
      // fillZero(dateIn.getDate());
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
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    clearGopage() {
      this.gopage = "";
    },
    jumpSizeChange() {
      if (
        this.currentPage !== parseInt(this.gopage) &&
        parseInt(this.gopage) >= parseInt(1) &&
        Number.isInteger(parseInt(this.gopage))
      ) {
        this.currentPage = this.gopage;
        let data = {
          size: 20,
          page: this.gopage || 1
        };
        this.loading = false;
        this.getAllList(data);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = {
        page: val,
        size: 20
      };
      this.loading = false;
      this.getAllList(data);
    },
    jumpDetail(hash) {
      if (hash) {
        let url = window.location.origin + `/#/trade/tradeDetail/?hash=${hash}`;
        window.open(url, "_blank");
      }
    },
    rowStyle({ row, rowIndex }) {
      return "height:40px";
    },
    handleData(value, code = 0) {
      if (value) {
        return value;
      } else {
        if (code === 1) {
          return "0.01SWTC";
        } else {
          return "null";
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#trade {
  background-color: #f2f8fc;
  text-align: center;
  padding: 0 70px;
  min-width: 900px;
  height: 100%;
  min-height: 600px;
  .bockListData {
    border: 1px solid #c1e9f1;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 50px;
  background: #f2f8fc;
  .sortButton {
    border: 1px solid #959595;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    width: 50px;
    margin-left: 20px;
    background: #fff;
    padding: 0 3px;
    color: #959595;
  }
  .sortButton:hover {
    color: #289ef5;
    border: 1px solid #18c9dd;
    cursor: pointer;
  }
  li .inputDiv {
    width: 36px;
    height: 36px;
    border: 1px solid #959595;
    display: inline-block;
    margin: 0 10px;
    border-radius: 6px;
    input[type="text"],
    input[type="password"],
    textarea {
      text-indent: 0px;
      text-align: center;
      color: #959595;
    }
  }
  li div input {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    border: 0;
  }
}
.selectionDate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .blocktitle {
    display: flex;
    align-items: center;
    margin:20px 20px 20px 0px;
    img {
      width: 40px;
      height: 40px;
    }
    span {
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
  }
}
</style>

<style  lang="scss" >
#trade .tradeHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#trade .traderowClass:nth-child(odd) {
  background: #edf5fa;
  height: 40px;
}
// #trade .traderowClass:nth-child(even) {
//   background: #edf5fa;
//   height: 40px;
// }
#trade .traderowClass td:nth-child(2) {
  color: #3b3f4c;
  font-size: 14px;
}
#trade .el-table .cell {
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    cursor: pointer;
  }
  .hashSpan:hover {
    color: #06aaf9;
    font-weight: bold;
  }
  .transNumSpan {
    color: #6f6868;
  }
}
#trade .pagination .is-background {
  .el-pager li:not(.disabled).active {
    background: #18c9dd;
    color: #ffffff;
    border: 0;
  }
  .el-pager li {
    background: #ffffff;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #959595;
    border: 1px solid #959595;
  }
  .btn-next,
  .btn-prev {
    background: #ffffff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #959595;
    border: 1px solid #959595;
  }
}
#trade .el-pager .el-icon-more {
  display: none;
}
#trade .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
#trade .el-table td,
#trade .el-table th.is-leaf {
  border-bottom: 0;
}
#trade .el-table:before {
  height: 0;
}
</style>