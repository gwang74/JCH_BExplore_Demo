<template>
<div>
    <headerHav></headerHav>
    <div id="transfer">
        <div style="display:flex;align-items:center;">
            <span class="block">钱包转账</span>
          </div>
        <div class="head">
            <div class="content">
                <div class="inputWarp">
                <span>我的钱包地址：</span><el-input @blur="checkSource" v-model="source" class="input" type="text"/>
            </div>
            <div class="inputWarp">
                <span>我的钱包密钥：</span><el-input v-model="secret" class="input" type="text"/>
            </div>
            <div class="inputWarp">
                <span>对方钱包地址：</span><el-input @blur="checkAddress" v-model="destination" class="input" type="text"/>
            </div>
            <div class="inputWarp" style="margin-left: 32px;">
                <span>转账数量：</span><el-input v-model="value" class="input" type="number"/>
            </div>
            <div class="inputWarp" style="margin-left: 32px;">
                <span>转账币种：</span>
                <el-select v-model="name" class="input" placeholder="请选择">
                    <el-option
                    v-for="item in tokenList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="inputWarp" style="margin-top: 20px;">
                <el-button class="button" type="success" :disabled="isTrasnferAble" @click="transfer">确认转账</el-button>
                <el-button class="button" type="info" @click="clear">取消转账</el-button>
            </div>
            </div>
        </div>
    </div>    
</div>
</template>

<script>
import {transferAccounts} from '../js/request';
import { jtWallet } from "jcc_wallet";
export default {
    name:'transferAction',
    data(){
        return {
            isTrasnferAble: true,
            source:"",
            currency:"",
            value:"",
            destination:"",
            memos:"",
            secret:"",
             postData: {
                client_id: "",//当前时间戳（var client_id = "id" + new Date().getTime();）
                payment: {
                    amount: {
                        currency:"", //币种类型
                        issuer:"",
                        value:"" //数量
                    },
                    source:"", //发起账号
                    destination:"",//目标账号
                    memos:[] //转账备注
                },
                secret:"" //支付方的钱包私钥
            },
            tokenList:[
                {name:''},
                {name:"SWTC"},
                {name:"MOAC"},
                {name:"CNY"},
                {name:"BTC"},
                {name:"USDC"},
            ],
            name:""
        }
    },
    methods: {
        addressCheck(){
            let res =  jtWallet.isValidAddress(this.source||this.destination);
            if(!res){

            }
        },
        transfer() {

        },
        clear() {
            this.source = "",
            this.currency = "",
            this.value = "",
            this.destination = "",
            this.memos = "",
            this.secret = ""
        }
    },
    
}
</script>

<style lang="scss" scoped>
#transfer {
    background-color: #f2f8fc;
    text-align: center;
    padding: 0 70px;
    padding-top: 20px;
    min-width: 900px;
    height: 100%;
    min-height: 600px;
}
.block {
    height: 40px;
    min-width: 100px;
    padding: 0 3px;
    background: linear-gradient(90deg, #4a99a5, #4ca0ca);
    border-radius: 6px;
    color: #f2f8fc;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
#changelan {
    position: absolute;
    right: 70px;
    height: 40px;
    margin-top: 19px;
    width: 98px;
}
.inputWarp {
  display: inline-block;
  position: relative;
  white-space: nowrap;
  margin-right: 40px;
  width: 100%;
  input[type="text"] {
    padding-left: 5px;
  }
  span {
      float: left;
      display: block;
      text-align: center;
      line-height: 40px;
      height: 40px;
  }
  .input {
    float: left;
    outline: none;  
    width: 300px;
  }
  .button {
      float: left; 
      width: 200px;
  }
}
.head {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    border: 1.8px solid #c1e9f1;
    min-height: 450px;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    .content {
        margin: 20px;
        position: relative;
        padding-left: 200px;
    }
}
</style>