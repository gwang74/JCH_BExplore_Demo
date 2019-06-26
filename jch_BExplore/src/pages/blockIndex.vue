<template>
<div> 
    <headerHav></headerHav>
  <div id="block">
    <div class="selectionDate">
      <div class="blocktitle">
        <img src='../images/block.png' />
        <span>区块高度</span>
      </div>
    </div>
    <div class="bockList">
      <div class="bockListData">
        <el-table :data="blockList" style="width:100%"  row-class-name="blockRowClass" header-row-class-name="blockHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading"  style="height:79px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
             <div  v-else style="margin:114px 0 159px 0;font-size:14px;font-weight:400;color:#BBC7CE;">
                  <div style=" position: relative;"><i class="iconfont icon-wujiaoyijilu" style="font-size:155px;">
                  </i><br/>
                  <span style="position: relative;left:-9px;">无记录</span></div>
            </div>
          </div>
          <el-table-column  width="30px"></el-table-column>
          <el-table-column prop="_id" label="区块高度"  min-width="17%"  align="left" header-align="left">
            <template slot-scope="scope">
              <span class="idSpan" @click="jumpDetail(scope.row.hash)">{{scope.row._id}}</span>
            </template>
          </el-table-column>
            <el-table-column prop="hash"  label="区块哈希值"  id="ellipsis" align="center" header-align="center" min-width="57%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{scope.row.hash}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间"  min-width="20%"  header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="transNum" min-width="7%"  label="交易量"  header-align="center" align="center">
            <template slot-scope="scope">
              <span class="transNumSpan">{{scope.row.transNum}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="30px" ></el-table-column>
        </el-table>
      </div>
      <ul class="pagination"  style="list-style: none;">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li>跳至
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          <!-- placeholder="100" -->
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
//import { getBlocklist } from "../../js/fetch";
export default {
  name: "block",
  data() {
    return {
      blockList: [],
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
    //this.getAllList(data);
  },
  methods: {
    async getAllList(data) {
      console.log(data, "数据");
      this.blockList = [];
      // this.total = 0;
      // this.gopage = 1;
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getBlocklist(data);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.blockList = this.handleGetData(res.data.list);
        //  this.blockList = [];
      } else {
        this.blockList = [];
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    // setDatetiem(val) {
    //   this.selectedDate = val;
    // },
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
          page: this.gopage || 100
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
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          sort: (this.currentPage - 1) * 20 + i + 1,
          _id: res[i]._id,
          transNum: res[i].transNum,
          hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      return list;
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
    jumpDetail(hash) {
      if (hash) {
        let url = window.location.origin + `/#/block/blockDetail/?hash=${hash}`;
        window.open(url, "_blank");
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
#block {
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
.demonstration {
  font-weight: bold;
  font-size: 18px;
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
  .number {
    min-width: 36rem;
  }
  .sortButton {
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    width: 50px;
    margin-left: 20px;
    background: #fff;
    border: 1px solid #959595;
    padding: 0 3px;
    cursor: pointer;
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
#block .rowClass td:nth-child(2) {
  color: #3b3f4c;
  font-size: 14px;
}
.rowClass:hover {
  background-color: rgba(255, 255, 255, 1);
}
#block .el-table .cell {
  .timespan {
    margin-left: 10px;
  }
  .idSpan {
    color: #07c5f2;
  }
  .idSpan:hover {
    color: #06aaf9;
    font-size: 14px;
    cursor: pointer;
  }
  .timespan {
    color: #6f6868;
  }
  .transNumSpan {
    color: #6f6868;
  }
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .hashSpan:hover {
    color: #06aaf9;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>
<style  lang="scss"  >
#block .pagination .is-background {
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
#block .el-pager .el-icon-more {
  display: none;
}
#block .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
#block .blockHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#block .blockRowClass:nth-child(odd) {
  background: #edf5fa;
  height: 40px;
}
#block .el-table td,
#block .el-table th.is-leaf {
  border-bottom: 0;
}
#block .el-table:before {
  height: 0;
}
</style>