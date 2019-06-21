<template>
<div>
    <headerHav></headerHav>
    <div id="transfer">
        <div class="head">
            <span class="tille">转账</span>
        </div>
    </div>    
</div>
</template>

<script>
import {} from '../js/request'
export default {
    name:'transferAction',
    data(){
        return {}
    },
    methods: {}
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
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    border: 1.8px solid #c1e9f1;
    min-height: 450px;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
}
</style>