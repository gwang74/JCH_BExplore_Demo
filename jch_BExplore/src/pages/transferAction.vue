<template>
<div>
    <headerHav></headerHav>
    <div id="transfer">
        <div style="display:flex;align-items:center;">
            <span class="block">钱包转账</span>
          </div>
        <div class="head">
            <el-form :model="dataForm" ref="dataForm" class="content" :rules="rules" label-width="100px">
                <el-form-item label="我的钱包地址" class="inputWarp" prop="source">
                    <el-input v-model="dataForm.source" class="input" type="text"/>
                </el-form-item>
                <el-form-item label="我的钱包密钥" class="inputWarp" prop="secret">
                    <el-input v-model="dataForm.secret" class="input" type="text"/>
                </el-form-item>
                <el-form-item label="对方钱包地址" class="inputWarp" prop="destination">
                    <el-input v-model="dataForm.destination" class="input" type="text"/>
                </el-form-item>
                <el-form-item label="转账数量" class="inputWarp" prop="tranfersValue">
                    <el-input v-model="dataForm.tranfersValue" class="input" type="number"/>
                </el-form-item>
                <el-form-item label="转账币种" class="inputWarp" prop="currency">
                    <el-select v-model="dataForm.currency" class="input" clearable placeholder="请选择">
                        <el-option
                        v-for="item in tokenList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="转账备注" class="inputWarp" prop="memos">
                    <el-input class="input" type="textarea" 
                    :rows="2"
                    v-model="dataForm.memos"></el-input>
                </el-form-item>
                <el-form-item class="inputWarp">
                    <el-button class="button" type="primary" @click="submitForm()">确认转账</el-button>
                    <el-button class="button" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
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
        var validateAddress = (rule, value, callback) => {
        if (!jtWallet.isValidAddress(value)) {
          callback(new Error('请输入有效的钱包地址'));
        } else {
          callback();
        }
        };
        var validateValue = (rule, value ,callback) => {
            if (value <= 0) {
                callback(new Error('转账数量必须大于0'))
            }else {
                callback();
            }
        };
        return {
            isTrasnferAble: true,
            dataForm: {
                source:'',
                currency:'',
                tranfersValue:'',
                destination:'',
                memos:'',
                secret:''
            },
            rules: {
                source:[
                    {required: true, message: '请输入钱包地址', trigger: 'blur' },
                    {validator: validateAddress ,trigger: 'blur'}
                ],
                secret:[
                    {required: true, message: '请输入钱包密钥', trigger: 'blur' }
                ],
                destination:[
                    {required: true, message: '请输入钱包地址', trigger: 'blur' },
                    {validator: validateAddress ,trigger: 'blur'}
                ],
                tranfersValue:[
                    {required: true, message: '请输入转账数量', trigger: 'blur' },
                    {validator: validateValue ,trigger: 'blur'}
                ],
                currency:[
                    {required: true, message: '请输入转账币种', trigger: 'change' }
                ]
            },
            tokenList:[
                {name:''},
                {name:"SWT"},
                {name:"JCC"},
                {name:"CNY"},
                {name:"BTC"},
                {name:"USDC"},
            ],
        }
    },
    methods: {
         submitForm() {
            this.$refs['dataForm'].validate(async (valid) => {
            if (valid) {
                var postData =  {
                    client_id: "id" + new Date().getTime(),//当前时间戳（var client_id = "id" + new Date().getTime();）
                    payment: {
                        amount: {
                            currency: this.dataForm.currency, //币种类型
                            issuer: "",
                            value: this.dataForm.tranfersValue //数量
                        },
                        source: this.dataForm.source, //发起账号
                        destination: this.dataForm.destination ,//目标账号
                        memos: [this.dataForm.memos] //转账备注
                    },
                    secret: this.dataForm.secret //支付方的钱包私钥
                };
                console.log(postData);
                let res = await transferAccounts(this.dataForm.source, postData);
                console.log(res);
                if(res.success){
                    this.$message({
                    type: "info",
                    message: "转账成功",
                    duration: 1600,
                    showClose: true
                })
                }
            } else {
                this.$message({
                    type: "info",
                    message: "转账失败",
                    duration: 1600,
                    showClose: true
                })
                return false;
            }
            });

        },
        resetForm() {
            this.$refs['dataForm'].resetFields();
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
    width: 400px;
  }
  .button {
      float: left; 
      width: 180px;
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