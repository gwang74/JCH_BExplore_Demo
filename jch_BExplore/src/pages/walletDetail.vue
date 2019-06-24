<template>
<div>
  <headerHav></headerHav>
  <div id="wallet" class="blo">
     <div>
      <div class="walletHeader">
        <div style="font-weight: 600;">钱包地址:<span style="color:#06aaf9;padding-left:10px;">{{wallet}}</span></div>
        <div class="tille" > 余额 <i class="iconfont icon-xiangqingxianshitubiao tilleIcon"></i></div>
      </div>
      <el-row style="margin-bottom:10px;">
        <el-col :span="24">
            <div class="headerTop" flex="main:center cross:center" >
               <div style="color:#5F5D5D;">
                 <span style="margin-right:11px;margin-left:10px;font-size:14px;color:#3E3F45;font-weight: 600;">SWTC</span>
                 <span>10000</span></div>
               <div style="font-size:14px;color:#636161;"><span>冻结:</span><span style="margin-left:10px;">
                 25</span></div>
            </div>
       </el-col>
      </el-row>
      <el-row style="margin-bottom:20px;">
       <div v-for="(item, index) in coinList" :key="index" class="onTitleLIst">
           <el-col class="headercenter" :span="12" >
          <div style="color:#5F5D5D;">
              <span style="font-weight: 600;font-size:14px; display: inline-block;min-width: 80px;text-align:left;">{{item.currency}}
              </span><span style="margin-left:5px;">{{item.value}}</span>
          </div>
          <div style="color:#3E3F45;text-align:left;">
            <span >冻结
            </span ><span style="margin-left:10px;display: inline-block;min-width: 90px;">{{item.freezed}}</span>
          </div>
           </el-col>
       </div>
      </el-row>
      </div>
    <div class="bockList">
      <div class="historicalList">
        <div style="margin-left:0.9px;"><div class="walletTitle">交易记录</div></div>
        <el-table :data="historicalList" style="width:100%" :row-style="rowStyle" header-row-class-name="homeHeaderRowclass">
           <ul slot="empty" style="background-color:#fff;margin:0 60px;">
            <div v-if="loadingTrade"   style="height:100px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="加载中"></div>
             <div class="noDataHome" v-else >
                 <i class="iconfont icon-zanwushuju1 "></i>
                  加载中
            </div>
           </ul>
          <el-table-column  width="30px"></el-table-column>
           <el-table-column  prop="sort" label="序号" min-width="8%" align="left" header-align="left"></el-table-column>
           <el-table-column  prop="time" label="交易时间" min-width="20%" align="left" header-align="left"></el-table-column>
           <el-table-column prop="type" label="交易类型" id="ellipsis" width="130px" align="left" header-align="left"></el-table-column>
           <el-table-column  prop="direction" label="交易方向" min-width="10%" align="left" header-align="left"></el-table-column>
           <el-table-column  prop="cntent" label="交易内容" min-width="20%" align="left" header-align="left"></el-table-column>
           <!-- <el-table-column  prop="tradeDj" label="交易对家" min-width="8%" align="left" header-align="left">
           </el-table-column> -->

           <el-table-column prop="tradeDj"  label="交易对家"  id="ellipsis" align="center" header-align="center">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpWalletDetail(scope.row.tradeDj)">{{scope.row.tradeDj}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tradeHash"  label="交易哈希"  id="ellipsis" align="center" header-align="center">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpTradeDetail(scope.row.tradeHash)">{{scope.row.tradeHash}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- <div class="bockList">
      <div class="historicalList">
        <div style="margin-left:0.9px;"><div class="walletTitle">{{$t('message.trade.tradeRecord')}}</div></div>
        <div style="margin:9px; ">
        <div class="title">
          <section style="display:flex;" class="left">
             <div style="margin-right:21px;">
              <span style="margin-right:6px;min-width:29.5px;display: inline-block;">{{$t('message.header.type')}}</span>
              <el-select v-model="selectTypeValue"  @change="changeTransactionType" style="height:34px;" :style="updateLanguage==='en'?'width:106px;':'width:84px;'">
                <el-option v-for="item in  transactionType" :key="item.selectTypeValue" :label="item.label" :value="item.selectTypeValue"></el-option>
              </el-select>
             </div>
             <div  :class="{'dropDown': isSelectTypeValueEmpty===true}">
                  <div v-show="isSelectTypeValueEmpty" style="margin-right:21px;">
                      <span style="margin-right:6px;min-width:29.5px;dmin-width:29.5px;display: inline-block;">{{$t('message.header.transactionmode')}}</span>
                      <el-select v-model="selectModeValue"  @change="changeTransactionMode" style="width:84px;height:34px;" :class="{'controlEn': isSelectTypeValueEmpty===true}">
                        <el-option v-for="item in transactionMode" :key="item.selectModeValue" :label="item.label" :value="item.selectModeValue"></el-option>
                      </el-select>
                  </div>
                  <div   v-show="isSelectTypeValueEmpty">
                    <span>{{$t('message.wallet.transactionCurrency')}}</span>
                    <el-select v-model="base"  @change="changeTransactionCurrency" style="width:84px;height:34px;">
                      <el-option v-for="item in  transactionDefaultCurrency" :key="item.base" :label="item.baseTitle" :value="item.base"></el-option>
                      <el-option v-for="item in  transactionCurrency" :key="item.base"  :label="item.baseTitle" :value="item.base"></el-option>
                    </el-select>
                  </div>
                  <div  v-show="isSelectTypeValueTransfer">
                    <i class="iconfont icon-shuangxiangjiantou "  style="margin:0 6px 0 8px;"></i>
                    <el-select v-model="selectCurrencyCounterValue"  @change="changeTransactionCounterType" style="width:84px">
                      <el-option v-for="item in  transactionCounterType" :key="item.selectCurrencyCounterValue" :label="item.label" :value="item.selectCurrencyCounterValue"></el-option>
                    </el-select>
                  </div>
              </div>
          </section>
          <section>
            <div class="selctionData"><span style="margin-right:6px;">{{$t('message.wallet.dateRange')}}</span>
             <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.startTime')" style="width:128px;"></el-date-picker><span style="margin:0 6px 0 8px;">{{$t('message.wallet.to')}}</span>
             <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.endTime')" style="width:128px;"></el-date-picker>
             <span class="sure" @click="selectTimerange">{{$t('message.blockList.confirm')}}</span>
            </div>
          </section>
        </div>
        </div>
        <div style="border-top:1px solid #ebeef5;">
        <el-table :data="historicalList" style="width:100%" row-class-name="walletrowClass" header-row-class-name="walletHeaderRowclass" >
          <div slot="empty" style="font-size:18px;">
            <div v-if="loading"  style="width:100%;padding-bottom:20px;margin-bottom:10px" v-loading="true" element-loading-spinner="el-icon-loading" :element-loading-text="$t('message.desperateLoading')"></div>
            <div  v-else style="margin:114px 0 159px 0;font-size:14px;font-weight:400;color:#BBC7CE;">
                  <div style=" position: relative;"><i class="iconfont icon-wujiaoyijilu" style="font-size:155px;">
                  </i><br/>
                  <span style="position: relative;left:-9px;">{{$t('message.home.notransaction')}}</span></div>
            </div>
          </div>
           <el-table-column prop="matchFlag"  width="30px">
             <template slot-scope="scope">
                <div style="overflow:visible;"><i class="iconfont"  :class="scope.row.matchFlag"></i></div>
            </template>
           </el-table-column>
           <el-table-column prop="time" :label="$t('message.header.transactiontime')" align="left" header-align="left" width="160px">
          </el-table-column>
          <el-table-column prop="type" :label="$t('message.header.transactiontype')" id="ellipsis"  min-width="13%" align="left" header-align="left" width="130px">
            <template slot-scope="scope">
              <div style="display: flex;align-items: center;"> <i :class="scope.row.displayDifferentBg" style="margin-right:6px;"></i>
              {{$t(`message.wallet.${JudgingOtherTypes(scope.row.type)}`)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="flag" :label="$t('message.header.transactionmode')" id="ellipsis"  min-width="11%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">{{$t(`message.wallet.${JudgingOthermode(scope.row.flag)}`)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.header.transactioncontent')"  id="ellipsis"   align="center" header-align="center"  min-width="26%" >
            <template slot-scope="scope">
                <span v-if="scope.row.takerPaysCurrency">
                    <span style="color:#07C5F2;white-space: nowrap;">{{scope.row.takerGetsValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-danxiangjiantou1 "></i>
                    <span style="color:#07C5F2;white-space: nowrap;">{{scope.row.takerPaysValue}}</span>
                    <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
                <span v-else-if="scope.row.takerCurreny">
                      <span style="color:#07C5F2;white-space: nowrap;">{{scope.row.takerValue}}</span>
                      <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerCurreny)}}</span>
                </span>
                 <span v-else>---</span>
            </template>
          </el-table-column>
          <el-table-column prop="tradePrice" :label="$t('message.header.transactionprice')" id="ellipsis" align="center" min-width="13%">
            <template slot-scope="scope">
               <span v-if="scope.row.judgeTrade === 1">
                   <span style="color:#07C5F2;white-space: nowrap;">{{divided(scope.row.takerGetsValue,scope.row.takerPaysValue)}}</span>
                   <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
              </span>
               <span v-else-if="scope.row.judgeTrade === 2">
                 <span style="color:#07C5F2;white-space: nowrap;">{{divided(scope.row.takerPaysValue,scope.row.takerGetsValue)}}</span>
                 <span style="white-space: nowrap;">{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
              <span v-else>---</span>
            </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('message.header.transactionto')" id="ellipsis" align="center" min-width="26%">
            <template slot-scope="scope">
              <div class="hashWallet"  @click="jumpWalletPage(scope.row.account)">{{scope.row.account}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="hash" :label="$t('message.header.transactionhash')" id="ellipsis" align="center" min-width="15%">
           <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{ interceptHeaderKey(scope.row.hash)}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="30px"></el-table-column>
        </el-table>
        </div>
      </div>
       <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li>{{$t('message.blockList.goto')}}
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          {{$t('message.blockList.page')}}
        </li>
        <li>
          <div class="sortButton" @click="jumpSizeChange">{{$t('message.blockList.confirm')}}</div>
        </li>
      </ul>
    </div> -->
  </div>
</div>
</template>
<script>
import {
  getAccountBalance,
  getTransactionsByaddress
} from "../js/request";
import {
       getTransactionAmount,
       getType,
       getOffertype
} from '../js/utils';
export default {
  name: "walletDetail",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      transactionCurrency: [],
      defaultBalance: [],
      historicalList: [],
      walletlist: [],
      coinList: [],
      selectModeValue: "",
      base: "",
      selectCurrencyCounterValue: "",
      selectTypeValue: "",
      startTime: "",
      endTime: "",
      timer: "",
      total: 0,
      allpage: 1,
      gopage: 100,
      currentPage: 1,
      loading: false,
      walletBalance: {},
      wallet: "",
      transactionPairs: {},
      type: "",
      buyOrSell: "",
      pair: "",
      isSelectTypeValueEmpty: false,
      isSelectTypeValueTransfer: false
    };
  },
  created() {
    this.getAccountBalance();
    this.getHistoricalList();

  },
  methods: {
    async getAccountBalance() {
      this.wallet = this.$route.query.hash;
      var res = await getAccountBalance(this.wallet);
      if (res.length > 0) {
        this.coinList = res;
      } else {
        this.coinList = [];
      }
    },

     async getHistoricalList() {
       var i = 0;
       var list = [];
       this.wallet = this.$route.query.hash;
       var res = await getTransactionsByaddress(this.wallet);
       if (res.length > 0) {
         for (; i<res.length; i++) {
           var jydj = "--";
           if(res[i].type === "sent" || res[i].type === "offereffect") {
             jydj　=　res[i].effects[0].counterparty.account;
           } else {
             jydj　=　"--";
           }

           list.push({
            sort: i + 1,
            time: res[i].date,
            type: getType(res[i].type),
            direction: "--",
            cntent: "--",
            tradeDj: jydj,
            tradeHash: res[i].hash
           })
         }
       }
      this.historicalList = list;
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


//   mounted() {
//     setTimeout(() => {
//       this.transactionPairs = this.$store.getters.transactionPairs;
//       // this.defaultTransactionCurrency = this.$store.getters.transactionCurrency;
//     }, 500);
//   },
//   created() {
//     this.wallet = this.$route.query.wallet;
//     this.getBalanceList(this.wallet);
//     this.getHistoricalList();
//   },
//   computed: {
//     transactionDefaultCurrency() {
//       return [
//         {
//           base: "",
//           baseTitle: this.$t("message.wallet.allCurrency")
//         }
//       ];
//     },
//     transactionType() {
//       return [
//         { selectTypeValue: "", label: this.$t("message.wallet.alltype") },
//         {
//           selectTypeValue: "OfferCreate",
//           label: this.$t("message.wallet.OfferCreate")
//         },
//         {
//           selectTypeValue: "OfferAffect",
//           label: this.$t("message.wallet.OfferAffect")
//         },
//         {
//           selectTypeValue: "OfferCancel",
//           label: this.$t("message.wallet.OfferCancel")
//         },
//         {
//           selectTypeValue: "Send,Receive",
//           label: this.$t("message.wallet.Payment")
//         }
//       ];
//     },
//     transactionMode() {
//       if (
//         this.selectTypeValue === "Send,Receive" ||
//         this.selectTypeValue === ""
//       ) {
//         return [
//           { selectModeValue: "", label: this.$t("message.wallet.allMode") },
//           {
//             selectModeValue: "Receive",
//             label: this.$t("message.wallet.Receive")
//           },
//           {
//             selectModeValue: "Send",
//             label: this.$t("message.wallet.Send")
//           }
//         ];
//       } else {
//         return [
//           { selectModeValue: "", label: this.$t("message.wallet.allMode") },
//           {
//             selectModeValue: 1,
//             label: this.$t("message.wallet.Purchase")
//           },
//           { selectModeValue: 2, label: this.$t("message.wallet.Sale") }
//         ];
//       }
//     },
//     updateLanguage() {
//       return this.$i18n.locale;
//     },
//     transactionCounterType() {
//       if (
//         this.selectTypeValue === "Send,Receive" ||
//         this.selectTypeValue === ""
//       ) {
//         return [
//           {
//             selectCurrencyCounterValue: "",
//             label: this.$t("message.wallet.tradeArea")
//           }
//         ];
//       } else {
//         if (this.base === "SWTC") {
//           return [
//             {
//               selectCurrencyCounterValue: "",
//               label: this.$t("message.wallet.tradeArea")
//             },
//             { selectCurrencyCounterValue: "CNY", label: "CNT" },
//             { selectCurrencyCounterValue: "JETH", label: "ETH" },
//             { selectCurrencyCounterValue: "JUSDT", label: "USDT" }
//           ];
//         } else {
//           return [
//             {
//               selectCurrencyCounterValue: "",
//               label: this.$t("message.wallet.tradeArea")
//             },
//             { selectCurrencyCounterValue: "SWTC", label: "SWTC" },
//             { selectCurrencyCounterValue: "CNY", label: "CNT" },
//             { selectCurrencyCounterValue: "JETH", label: "ETH" },
//             { selectCurrencyCounterValue: "JUSDT", label: "USDT" }
//           ];
//         }
//       }
//     }
//   },
//   methods: {
//     array_get_repeat(arr1, arr2) {
//       let i = 0;
//       let arr3 = [];
//       if (arr1 && arr1.length > 0) {
//         for (; i < arr1.length; i++) {
//           for (let j = 0; j < arr2.length; j++) {
//             if (arr1[i].base === arr2[j].base) {
//               arr3.push(arr1[i]);
//             }
//           }
//         }
//       }
//       return arr3;
//     },
//     array_move_repeat(arr) {
//       let i = 0;
//       let indexarr3 = [];
//       let arr2 = [];
//       if (arr && arr.length > 0) {
//         for (; i < arr.length; i++) {
//           if (i === 0) {
//             indexarr3.push(arr[i].base);
//             arr2.push(arr[i]);
//           } else {
//             if (indexarr3.indexOf(arr[i].base) === -1) {
//               indexarr3.push(arr[i].base);
//               arr2.push(arr[i]);
//             }
//           }
//         }
//       }
//       return arr2;
//     },
//     divided(num1, num2) {
//       if (num1 > 0 && num2 > 0) {
//         return new BigNumber(num1)
//           .dividedBy(new BigNumber(num2))
//           .decimalPlaces(10)
//           .toNumber();
//       } else if (num1 === "0" || num2 === "0") {
//         return "0";
//       } else {
//         return "---";
//       }
//     },
//     clearGopage() {
//       this.gopage = "";
//     },
//     jumpSizeChange() {
//       if (
//         this.currentPage !== parseInt(this.gopage) &&
//         parseInt(this.gopage) >= parseInt(1) &&
//         Number.isInteger(parseInt(this.gopage))
//       ) {
//         this.currentPage = this.gopage;
//         this.loading = false;
//         this.getHistoricalList();
//       }
//     },
//     judgeIsExist(value) {
//       if (value) {
//         return value;
//       } else {
//         return "";
//       }
//     },
//     handleCurrentChange(val) {
//       this.currentPage = val;
//       this.loading = false;
//       this.getHistoricalList();
//     },
//     jumpWalletPage(value) {
//       if (value && value !== "---") {
//         let url = window.location.origin + `/#/wallet/?wallet=${value}`;
//         window.open(url, "_blank");
//       }
//     },
//     async getHistoricalList() {
//       this.historicalList = [];
//       if (this.loading) {
//         return;
//       }
//       this.loading = true;
//       let data = {
//         page: this.currentPage || 1,
//         size: 20,
//         begin: this.startTime || "",
//         end: this.endTime || "",
//         type: this.type || "",
//         buyOrSell: this.buyOrSell || "",
//         pair: this.pair || "",
//         wallet: this.wallet || ""
//       };
//       console.log(data, "发送数据");
//       let res = await queryHistoricalWallet(data);
//       if (res.result === true && (res.code === 0 || res.code === "0")) {
//         console.log(res, "得到的数据");
//         this.historicalList = this.getHistoryData(res);
//       } else {
//         this.historicalList = [];
//         this.total = 0;
//         this.gopage = 0;
//       }
//       this.loading = false;
//     },
//     async getBalanceList(wallet) {
//       let res = "";
//       if (res && (res.code === 2003 || res.code === "2003")) {
//         this.walletBalance = {};
//         this.$message({
//           type: "error",
//           message: this.$t("message.walletAddressinvalid"),
//           duration: 5000,
//           showClose: true
//         });
//       } else if (res && (res.code === 2004 || res.code === "2004")) {
//         this.walletBalance = {};
//         this.$message({
//           type: "error",
//           message: this.$t("message.walletAddressInputNoactivate"),
//           duration: 5000,
//           showClose: true
//         });
//       } else if (res.result === true && (res.code === 0 || res.code === "0")) {
//         this.walletBalance = this.getHistoryTitleData(res.data);
//         this.transactionCurrency = this.getDefaultBalance(res.data);
//         this.defaultBalance = this.transactionCurrency;
//       } else {
//         this.walletBalance = {};
//       }
//     },
//     getDefaultBalance(key) {
//       let defaultBalance = [];
//       if (key) {
//         for (let i in key) {
//           if (i === "SWTC") {
//             defaultBalance.push({ base: "SWTC", baseTitle: "SWTC" });
//           }
//           if (i !== "SWTC" && i !== "_id") {
//             let keys = i.split("_");
//             defaultBalance.push({
//               base: keys[0],
//               baseTitle: this.interceptHeaderKey(
//                 this.cnyTransformCNT(keys[0]),
//                 3
//               )
//             });
//           }
//         }
//       }
//       return this.array_move_repeat(defaultBalance);
//     },
//     // array_move_repeat(arr) {
//     //   arr.filter((x, index, self) => self.indexOf(x) === index);
//     // },
//     getHistoryTitleData(key) {
//       let oneTitleList = [];
//       let issuerType = [];
//       let swtcTitleList = {};
//       if (key) {
//         for (let i in key) {
//           if (i === "SWTC") {
//             swtcTitleList = { SWTC: key[i] };
//           }
//           if (i !== "SWTC" && i !== "_id") {
//             let keys = i.split("_");
//             if (issuerType.indexOf(keys[1]) === -1) {
//               issuerType.push(keys[1]);
//               let currentKey = keys[1];
//               let currencyObject = { currency: this.cnyTransformCNT(keys[0]) };
//               let value = {
//                 [currentKey]: [[{ ...currencyObject, ...key[i] }]]
//               };
//               oneTitleList.push(value);
//             } else {
//               let s = 0;
//               for (; s < oneTitleList.length; s++) {
//                 let newkey = Object.keys(oneTitleList[s])[0];
//                 if (newkey === keys[1]) {
//                   let currencyObject = {
//                     currency: this.cnyTransformCNT(keys[0])
//                   };
//                   let value = [{ ...currencyObject, ...key[i] }];
//                   oneTitleList[s][newkey].push(value);
//                 }
//               }
//             }
//           }
//         }
//       }
//       return { oneTitleList, swtcTitleList };
//     },
//     interceptHeaderKey(key, index = 4) {
//       if (key) {
//         // return this.cnyTransformCNT(keys[0]);
//         if (key.length > 12) {
//           return (
//             key.substr(0, index) +
//             "..." +
//             key.substr(key.length - index, key.length)
//           );
//         } else {
//           return key;
//         }
//       }
//     },
//     changeTransactionMode() {
//       if (
//         this.selectTypeValue === "Send,Receive" &&
//         this.selectModeValue === ""
//       ) {
//         this.type = "Send,Receive";
//         this.buyOrSell = "";
//       } else if (
//         this.selectTypeValue === "Send,Receive" ||
//         this.selectModeValue === "Send" ||
//         this.selectModeValue === "Receive"
//       ) {
//         this.type = this.selectModeValue;
//         this.buyOrSell = "";
//       } else {
//         this.buyOrSell = this.selectModeValue;
//       }
//     },
//     changeTransactionCurrency() {
//       this.judgePairIsTranter();
//     },
//     changeTransactionCounterType() {
//       if (this.base !== "SWTC") {
//         this.base = "";
//       }
//       this.judgePairIsTranter();
//       console.log(this.selectCurrencyCounterValue);
//       if (this.selectCurrencyCounterValue === "JETH") {
//         console.log(this.selectCurrencyCounterValue);
//         this.transactionCurrency = this.array_get_repeat(
//           this.transactionPairs.JETH,
//           this.defaultBalance
//         );
//         console.log(
//           this.transactionCurrency,
//           this.transactionPairs.JETH,
//           this.defaultBalance
//         );
//       } else if (this.selectCurrencyCounterValue === "CNY") {
//         this.transactionCurrency = this.array_get_repeat(
//           this.transactionPairs.CNY,
//           this.defaultBalance
//         );
//       } else if (this.selectCurrencyCounterValue === "SWTC") {
//         this.transactionCurrency = this.array_get_repeat(
//           this.transactionPairs.SWTC,
//           this.defaultBalance
//         );
//       } else if (this.selectCurrencyCounterValue === "JUSDT") {
//         this.transactionCurrency = this.array_get_repeat(
//           this.transactionPairs.JUSDT,
//           this.defaultBalance
//         );
//       } else {
//         this.transactionCurrency = this.defaultBalance;
//       }
//     },
//     changeTransactionType() {
//       this.selectModeValue = "";
//       this.selectCurrencyCounterValue = "";
//       this.base = "";
//       this.pair = "";
//       this.buyOrSell = "";
//       this.type = this.selectTypeValue;
//       if (this.selectTypeValue === "Send,Receive") {
//         this.isSelectTypeValueEmpty = true;
//         this.isSelectTypeValueTransfer = false;
//         // this.transactionCurrency = this.defaultTransferAccountsCurrency;
//       } else if (this.selectTypeValue === "") {
//         this.isSelectTypeValueEmpty = false;
//         this.isSelectTypeValueTransfer = false;
//         // this.transactionCurrency = [];
//       } else {
//         this.isSelectTypeValueEmpty = true;
//         this.isSelectTypeValueTransfer = true;
//         // this.transactionCurrency = this.defaultNoTransferAccountsCurrency;
//       }
//     },
//     judgePairIsTranter() {
//       if (this.selectTypeValue === "Send,Receive") {
//         this.pair = this.base;
//       } else {
//         this.pair = `${this.base}-${this.selectCurrencyCounterValue}`;
//         if (this.pair === "-") {
//           this.pair = "";
//         }
//       }
//     },
//     isEmptyObject(obj) {
//       for (let name in obj) {
//         return false;
//       }
//       return true;
//     },
//     selectTimerange() {
//       this.currentPage = 1;
//       this.getHistoricalList();
//     },
//     judgeTransferFailure(value) {
//       if (value !== "tesSUCCESS") {
//         return "zhuanzhangshiba";
//       }
//     },
//     // this.$t(this.getTransactionType(res.data.list[i].type))
//     getHistoryData(res) {
//       let i = 0;
//       let list = [];
//       if (res && res.data && res.data.list.length > 0) {
//         for (; i < res.data.list.length; i++) {
//           list.push({
//             // type:
//             //   this.$t(`message.wallet.${res.data.list[i].type}`) ||
//             //   this.$t("message.wallet.unknown"),
//             type: res.data.list[i].type,
//             // flag:
//             //   this.$t(this.getTransactionMode(res.data.list[i].flag)) ||
//             //   this.$t(this.getTransactionMode(res.data.list[i].type)) ||
//             //   "---",
//             flag: res.data.list[i].flag || res.data.list[i].type,
//             time: this.handleHashtime(res.data.list[i].time) || "---",
//             displayDifferentColor:
//               this.getFlagColor(res.data.list[i].flag) ||
//               this.getFlagColor(res.data.list[i].type) ||
//               "",
//             displayDifferentBg: this.getTypeBg(res.data.list[i].type) || "",
//             takerPaysCurrency: this.interceptStringByEllipsis(
//               this.displayDefaultCurrency(res.data.list[i].takerPays).currency
//             ),
//             takerPaysValue: this.displayDefaultValues(
//               res.data.list[i].takerPays
//             ).value,
//             takerGetsCurrency: this.interceptStringByEllipsis(
//               this.displayDefaultCurrency(res.data.list[i].takerGets).currency
//             ),
//             takerGetsValue: this.displayDefaultValues(
//               res.data.list[i].takerGets
//             ).value,
//             takerCurreny: this.interceptStringByEllipsis(
//               this.displayDefaultCurrency(res.data.list[i].amount).currency
//             ),
//             takerValue: this.displayDefaultValues(res.data.list[i].amount)
//               .value,
//             account: res.data.list[i].account || "---",
//             hash: res.data.list[i].hash || "---",
//             matchFlag:
//               this.getMatchFlag(res.data.list[i].matchFlag) ||
//               this.getMatchFlag(
//                 this.judgeTransferFailure(res.data.list[i].success)
//               ),
//             judgeTrade: res.data.list[i].flag
//           });
//         }
//         this.total = res.data.count;
//         this.allpage = Math.ceil(this.total / 20);
//         this.gopage = this.allpage;
//       } else {
//         this.total = 0;
//         this.allpage = 0;
//         this.gopage = 0;
//       }
//       return list;
//     },
//     displayDefaultValues(value) {
//       if (value) {
//         return value;
//       } else {
//         return { value: undefined };
//       }
//     },
//     displayDefaultCurrency(value) {
//       if (value) {
//         return value;
//       } else {
//         return { currency: undefined };
//       }
//     },
//     displayDefaultFrozen(value) {
//       if (value) {
//         return value;
//       } else {
//         return { frozen: undefined };
//       }
//     },
//     displayDefaultSWTC(value) {
//       if (value) {
//         return value;
//       } else {
//         return { SWTC: undefined };
//       }
//     },
//     jumpDetail(hash) {
//       if (hash) {
//         let url = window.location.origin + `/#/trade/tradeDetail/?hash=${hash}`;
//         window.open(url, "_blank");
//       }
//     },
//     fillZero(value) {
//       if (value < 10) {
//         value = "0" + value;
//       }
//       return value;
//     },
//     cnyTransformCNT(value) {
//       if (value === "CNY") {
//         return "CNT";
//       } else {
//         return value;
//       }
//     },
//     handleHashtime(time) {
//       let { fillZero } = this;
//       let dateIn = new Date((time + 946684800) * 1000);
//       let hashTime = "";
//       // fillZero(dateIn.getDate());
//       hashTime =
//         fillZero(dateIn.getFullYear()) +
//         "-" +
//         fillZero(dateIn.getMonth() + 1) +
//         "-" +
//         fillZero(dateIn.getDate()) +
//         " " +
//         fillZero(dateIn.getHours()) +
//         ":" +
//         fillZero(dateIn.getMinutes()) +
//         ":" +
//         fillZero(dateIn.getSeconds());
//       return hashTime;
//     }
//   }
};
</script>
<style lang="scss" scoped>
#wallet {
  text-align: center;
  min-width: 900px;
  padding: 0 70px;
  padding-bottom: 50px;
  background: #f2f8fc;
  .historicalList {
    background: #fff;
  }
  .dropDown {
    display: flex;
  }
  @media screen and (max-width: 1180px) {
    .left {
      display: flex;
      flex-direction: column;
    }
    .dropDown {
      display: flex;
      margin-top: 14px;
    }
  }
  .nodataTitle {
    width: 100%;
    border: 1.8px solid #c1e9f1;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
  }
  .walletTitle {
    background: linear-gradient(to right, #0ab1f2, #26e0cc);
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
  }
  // .hashWallet {
  //   font-size: 12px;
  //   text-align: left;
  // }
  .hashWallet:hover {
    color: #06aaf9;
    cursor: pointer;
    font-weight: bold;
  }
  .hashSpan {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
  .hashSpan:hover {
    color: #06aaf9;
    cursor: pointer;
    font-weight: bold;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 20px 0;
  background: #fff;
  .sortButton {
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    width: 50px;
    margin-left: 20px;
    background: #fff;
    border: 1px solid #959595;
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
.walletHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  .tille {
    display: flex;
    align-items: center;
    color: #18c9dd;
    font-size: 14px;
  }
  .tilleIcon {
    font-size: 10px;
    float: right;
    padding: 3px 0 0 6px;
    color: #18c9dd;
  }
  .walletHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #3e3f45;
    padding: 10px 0;
  }
}
.bockList {
  background-color: #f2f8fc;
  border: 1px solid #d0eef5;
}
.title {
  width: 100%;
  text-align: left;
  font-size: 14px;
  justify-content: space-between;
  color: #383a4b;
  display: flex;
}
// .titleItem1 {
//   font-size: 14px;
//   color: #383a4b;
//   padding-left: 10px;
// }
// .el-select {
//   width: 155px;
//   margin-left: 10px;
// }
.el-select-dropdown__item {
  font-size: 14px;
  color: #565a65;
  padding: 0 !important;
  text-align: center;
}
.el-select-dropdown__item:hover {
  background: #f2fbef;
  opacity: 80%;
}
</style>

<style  lang="scss" >
#wallet .el-icon-arrow-right {
  font-size: 16px;
}
#wallet .el-row {
  width: 100%;
  border-radius: 8px;
  background: #ffffff;
  border: 1.8px solid #c1e9f1;
  .onTitleLIst div:nth-child(even) {
    border-right: 0px;
  }
  .headercenterBox {
    height: 40px;
    border-bottom: 1px solid #e0e8ed;
  }
  .headercenter {
    height: 40px;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-right: 1px solid #e0e8ed;
    border-bottom: 1px solid #e0e8ed;
    font-size: 12px;
  }
  .headerbottom {
    height: 40px;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.7px solid #c1e9f1;
    padding: 0 20px;
    font-size: 12px;
  }
  // .headerbottom:nth-last-child(1) {
  //   border-bottom: 0;
  // }
  .lastheaderbottom {
    border-bottom: 0;
  }
  .headerTop {
    height: 40px;
    display: flex;
    font-size: 12px;
    white-space: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
#wallet .walletHeaderRowclass {
  color: #383a4b;
  font-size: 12px;
  height: 40px;
  border-bottom: 1px solid #ebeef5 !important;
  // border-top: 1px solid #ebeef5 !important;
  // border-bottom: 1px solid #ebeef5;
}
#wallet .walletrowClass {
  font-size: 12px;
  height: 40px；;
}

// #wallet .el-picker-panel {
//   width: 330px;
//   height: 348px;
// }
#wallet .selctionData {
  // right: 0;
  color: #383a4b;
  font-size: 14px;
  float: right;
  // height: 40px;
  overflow: hidden;
  .sure {
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #c8d0d5;
    background: #fff;
    display: inline-block;
    border-radius: 6px;
    margin-left: 6px;
    color: #959595;
    min-width: 36px;
    padding: 0 2px;
  }
  .sure:hover {
    color: #06aaf9;
    border: 1px solid #06aaf9;
    cursor: pointer;
  }
  input::-webkit-input-placeholder {
    color: #565a65;
    font-size: 14px;
    // position: relative;
    // left: 0px;
    // top: 3px;
  }
  .el-input__prefix {
    top: -3.5px;
    color: #565a65;
  }
  .el-input__inner {
    padding-right: 0px !important;
    height: 34px;
    top: -1px;
    position: relative;
    padding-left: 25px;
  }
  .el-icon-circle-close {
    padding: 0;
    margin: 0;
    position: relative;
    top: -3.5px;
    right: -1px;
  }
  // .el-date-editor {
  //   text-align: center;
  //   width: 130px;
  //   height: 40px;
  //   line-height: 40px;
  //   margin: 0 6px 0 6px;
  //   text-align: left;
  // }
}
// .el-input__icon {
//   float: right;
//   font-size: 18px;
// }
#wallet .title .left .el-input__icon {
  line-height: 25px !important;
}
#wallet .title .left .el-input__inner {
  padding: 0 0px 0 0px !important;
  height: 34px;
}
#wallet .title .left .el-input__suffix {
  right: -3px;
}
#wallet .pagination .is-background {
  .el-pager li:not(.disabled).active {
    background: #18c9dd;
    border: 0px;
    color: #fff;
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
// #wallet .el-pager .el-icon-more {
//   display: none;
// }
// #wallet .selected span {
//   color: #565a65;
//   font-size: 14px;
//   font-weight: normal;
// }
// #wallet .el-table__expand-icon {
//   transform: rotate(90deg);
//   margin-right: 10px;
//   .el-icon {
//     margin-left: -8px;
//     margin-top: -8px;
//   }
// }
// .el-table__expand-icon--expanded {
//   transform: rotate(-90deg);
// }
#wallet .el-button {
  border: 0;
  background: none;
  font-size: 12px;
}
#wallet .el-select-dropdown__item {
  font-size: 14px;
  // color: #565a65;
}
.el-select-dropdown__item.selected {
  font-weight: 500;
  color: #565a65;
  background: #fff;
}
.el-select-dropdown__item:hover {
  background: #fff;
  font-weight: 500;
}
.el-select-dropdown__item.hover {
  background: #f2fbff !important;
  color: #06aaf9 !important;
  opacity: 0.8;
  font-weight: 600;
}
// .el-input__suffix-inner {
//   display: none !important;
//   background: red;
// }
// .el-input__suffix {
//   display: none !important;
// }
// .el-input__icon {
//   display: none !important;
// }
#wallet .el-table td,
#wallet .el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
}
#wallet .el-table:before {
  height: 0.6px;
}
</style>