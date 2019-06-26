<template>
<div>
    <headerHav></headerHav>
    <div id="create">
        <div style="display:flex;align-items:center;">
            <span class="block">创建钱包</span>
          </div>
        <div class="head">
            
            <div class="content">
                <button class="createButton el-button" @click="getCreat">创建钱包</button>
                <div class="infoBack">
                    <div class="margin">
                        <span>钱包地址：</span>
                        <el-input class="long"
                            readonly
                            type="text"
                            placeholder="无"
                            v-model="data.address">
                        </el-input>
                    </div>
                    <div class="margin">
                        <span>钱包秘钥：</span>
                        <el-input class="long"
                            type="text"
                            readonly
                            placeholder="无"
                            v-model="data.secret">
                        </el-input>
                    </div>    
                </div>
            </div>
        </div>
    </div>    
</div>
</template>

<script>
import {
    createWallet
    } from '../js/request' 
export default {
    name:'createWallet',
    data() {
        return {
            loading:false,
            data:{
                secret:"",
                address:""
            }
        }
    },
    methods: {
        async getCreat(){
            let res = await createWallet();
            console.log(res);
            if(res&&res!=='创建钱包失败'){
                this.data = res;
                this.$message({
                type: "info",
                message: "创建钱包成功",
                duration: 1600,
                showClose: true
            })}else{
                this.data = res;
                this.$message({
                type: "info",
                message: "创建钱包失败",
                duration: 1600,
                showClose: true
            })}
        }
    }
}
</script>

<style lang="scss" scoped>
#create {
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
.head {
   margin-top: 20px;
    width: 100%;
    overflow: hidden;
    border: 1.8px solid #c1e9f1;
    min-height: 450px;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    .tille {
    margin-left: 50px;
    padding: 16px 0;
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    font-size: 16px;
    color: #3e3f45;
    float: left;
    }
    .content {
        margin: 60px 50px 50px 50px;
        height: 300px;
        .createButton {
            float: left;
            width: 200px;
            height: 50px;
            color: #ffffff;
            background: linear-gradient(90deg, #4a99a5, #4ca0ca);
        }
        .infoBack {
            margin-top: 50px;
            float: left;
            position: relative;
            top: 10px;
            right: 200px;
            height: 200px;
        }
    }
}

.margin {
    margin-top: 20px;
    .long {
       width: 500px; 
    }
}


</style>


