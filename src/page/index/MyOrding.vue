<template>
  <div class="body">
    <div class="center-div">
      <h2>我的订单</h2>
      <div class="ording-list-div">
        <div v-for="(ording, index) in ordingInfo" class="ording-list">
          <div class="ording-div">{{ording.goodsId}}</div>
          <div class="ording-div">{{ording.num}}</div>
          <div class="ording-div">{{ording.price}}</div>
          <div class="ording-div">{{ording.status == 0 ? '取消' : ording.status == 1 ? '下单' : '完成'}}</div>
          <div class="ording-div"><button class="button-style" @click="cancelOrding(ording.id)">取消</button></div>
        </div>
      </div>
      <hr />
      <div>总价格：<span>{{totalPrice}}</span></div>
      <button class="pay-div" @click="passwordInfo = true">结账</button>
      <p>您的满意，是我们最大的幸福！</p>
    </div>
    <div class="float-div" v-show="passwordInfo">
      <div class="mask"></div>
      <div class="float_frame">
        <div>
          <label>请输入密码：</label><br/>
          <input style="margin-top: 20px" v-model="password"/>
        </div>
        <div class="click_div">
          <div class="click_left" @click="passwordInfo = false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="settleAccounts()"><p class="p_style">确定</p></div>
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
        totalPrice: null,
        password: null,
        passwordInfo: false,
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
      },
      cancelOrding(id) {
        service('get','/user/cancel/order',{
          billDetailId: id
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          alert("取消成功！");
          parent.location.reload();
        })
      },
      queryPrice(){
        service('get','/user/queryPrice',{
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          console.log(data.data);
          this.totalPrice = data.data.price
        })
      },
      settleAccounts() {
        service('get','/user/settle/accounts',{
          userPassword: this.password
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          alert("结账完成！");
          parent.location.reload();
        })
      }
    },
    mounted() {
      this.getOrdingInfo();
      this.queryPrice();
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

  .ording-list {
    border-bottom: solid 1px #7e8c8d;
  }

  .ording-div {
    float: left;
    width: 16%;
    height: 20px;
    margin-left: 3%;
    margin-top: 30px;
    border-bottom: solid 1px #7e8c8d;
  }

  .button-style {
    border-radius: 10%;
  }

  .ording-list-div {
    width: 100%;
    height: 400px;
    /*background-color: cadetblue;*/
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .pay-div {
    width: 80px;
    height: 40px;
    border-radius: 10%;
    border-color: #eb415b;
    margin-left: 70%;
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .float_frame {
    width: 75%;
    height: 200px;
    background-color: white;
    top: 120px;
    position: fixed;
    border-radius: 5%;
    margin-left: 12.5%;
  }

  .click_div {
    width: 100%;
    height: 40px;
    margin-top: 98px;
  }
  .click_left {
    float: left;
    width: 49%;
    height: 40px;
    text-align: center;
    background-color: #e0e0e0;
  }
  .click_right {
    float: left;
    width: 50.9%;
    height: 40px;
    background-color: #eb415b;
  }
</style>
