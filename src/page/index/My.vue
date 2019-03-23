<template>
  <div class="body">
    <div>
      <img src="" class="res-img"/>
    </div>
    <div class="head-div">
      <img src="../../assets/my/title.jpg" style="width: 100%; height: 100%; border-radius: 50%"/>
    </div>
    <div class="my-div">
      <div class="content-div"><label>姓名：</label><p>{{userName}}</p></div>
      <div><label>余额：</label><p>{{price}}</p></div>
    </div>
    <div class="button-div">
      <button class="button-style" @click="dialogShowPrice = true">充值</button>
      <button class="button-style" @click="dialogShowEdit = true">修改信息</button>
    </div>
    <div>
      <button class="button-style" style="margin-top: 40px; margin-left: 60%" @click="userLogout()">用户退出</button>
    </div>
    <div class="dialog" v-show="dialogShowPrice">
      <div class="mask"></div>
      <div class="float_frame">
        <div>
         <label>请输入充值金额：</label><br/>
          <input style="margin-top: 20px" v-model="money"/>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShowPrice=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="dialogShowPrice=false; dialogShowPassword=true"><p class="p_style">确定</p></div>
        </div>
      </div>
    </div>
    <div class="dialog" v-show="dialogShowPassword">
      <div class="mask"></div>
      <div class="float_frame">
        <div>
          <label>请输入密码：</label><br/>
          <input style="margin-top: 20px" v-model="password"/>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShowPassword=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="clickRight()"><p class="p_style">确定</p></div>
        </div>
      </div>
    </div>
    <div class="dialog" v-show="dialogShowEdit1">
      <div class="mask"></div>
      <div class="float_frame">
        <div>
          <label>请输入旧密码：</label><br/>
          <input style="margin-top: 20px" v-model="password"/>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShowPassword=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="clickRight()"><p class="p_style">确定</p></div>
        </div>
      </div>
    </div>
    <div class="dialog" v-show="dialogShowEdit2">
      <div class="mask"></div>
      <div class="float_frame">
        <div>
          <label>请输入新密码：</label><br/>
          <input style="margin-top: 20px" v-model="password"/>
          <label>确认密码：</label><br/>
          <input style="margin-top: 20px" v-model="passwordAgain"/>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShowPassword=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="clickRight()"><p class="p_style">确定</p></div>
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
      userName: "Alice",
      price: 220.22,
      dialogShowPrice: false,
      dialogShowPassword: false,
      dialogShowEdit1: false,
      dialogShowEdit2: false,
      money: 0,
      password: 0,
      passwordAgain: 0,
      userData: null
    }
  },
  mounted() {
    this.queryUser();
  },
  methods: {
    clickRight(){
      service('get','/user/add/price',{
        addPrice: this.money,
        password: this.password
      }).then(data => {
        if (data.code !== 200) {
          alert(data.message);
          return;
        }
        console.log("充值成功！")
      })
    },
    queryUser(){
      service('get','/user/query/id',{
      }).then(data => {
//        if (data.code === 403){
//          this.$router.push({path: '/'});
//          return
//        }
        if (data.code !== 200) {
          alert(data.message);
          return;
        }
        this.userData = data.data;
        this.userName = data.data.name;
        this.price = data.data.price;
        console.log(this.userData)
      })
    },
    userLogout() {
      service('get','/user/logout',{
      }).then(data => {
        if (data.code !== 200){
          alert(data.message);
          return;
        }
        this.$router.push({path: '/'})
      })
    }
  }
}
</script>
<style scoped>
  .body {
    width: 100%;
    height: 100%;
    background-color: #7e8c8d;
  }

  .res-img{
    width: 100%;
    height: 200px;
    background-color: #eb415b;
  }

  .my-div {
    width: 70%;
    height: 200px;
    background-color: darksalmon;
    border-radius: 15%;
    margin-left: 14%;
    margin-top: -50px;
  }

  .head-div {
    width: 30%;
    height: 90px;
    border-radius: 50%;
    margin-left: 34%;
  }

  .content-div {
    padding-top: 50px;
  }

  .button-div {
    margin-top: 20px;
  }

  .button-style {
    width: 30%;
    height: 40px;
    border-radius: 10%;
    border-color: darksalmon;
    color: #7e8c8d;
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
