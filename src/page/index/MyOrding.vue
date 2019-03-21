<template>
  <div class="body">
    <div class="center-div">
      <h2>我的订单</h2>
      <div v-for="(ording, index) in ordingInfo">
        <div>
          <!--<div>{{}}</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {service} from '../../js/api'
  export default {
    data(){
      return{
        ordingInfo: null,
      }
    },
    methods: {
      getOrdingInfo(){
        service('get','/user/query/myBill',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.ordingInfo = data.data;
          console.log(this.ordingInfo);
        })
      }
    },
    mounted() {
      this.getOrdingInfo();
    }
  }
</script>
<style scoped>
  .body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .center-div {
    width: 90%;
    height: 90%;
    background-color: darkseagreen;
    opacity: 0.8;
    margin-top: 5%;
    margin-left: 5%;
  }
</style>
