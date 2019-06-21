<template>
<div>
    <headerHav></headerHav>
    <div id="create">
        <div class="head">
            <div class="content">
            <span class="tille">创建钱包</span>
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
    data(){
        return {}
    },
    methods: {}
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
.head {
   width: 100%;
    overflow: hidden;
    background-color: #f2f8fc;
    margin-bottom: 20px;
    .content {
        margin-top: 20px;
        width: 100%;
        min-height: 450px;
        border-radius: 8px;
        background: #ffffff;
        border: 1.8px solid #c1e9f1;
    }
}


</style>


