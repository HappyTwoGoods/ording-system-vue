<template>
  <div id="max">
    <div id="logo">
      <span id="realLogo">猫の饭</span>
    </div>
    <div class="input-div">
      <div class="inputClass">
        <input v-model="userName" type="text" placeholder="用户名"
               class="one" v-on:focus="flagOne=true" v-on:blur="flagOne=false" />
        <!--<input type="text" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="password" type="password" placeholder="密码"
               id="verifyCode1" onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagTwo=true" v-on:blur="flagTwo=false"/>
        <!--<input type="password" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="password2" type="password" placeholder="确认密码"
               id="verifyCode2" onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagTwo=true" v-on:blur="flagTwo=false"/>
        <!--<input type="password" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="price" type="text" placeholder="充值金额"
               id="verifyCode3" onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagTwo=true" v-on:blur="flagTwo=false"/>
        <!--<input type="password" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div id="buttonOne"><span id="buttonContentOne" v-on:click="register()">注册</span></div>
      <div class="font-div"><a href="Login.vue"><p style="font-family: 'Arial Black'">已有账号，去登陆》》》</p></a></div>
    </div>
  </div>
</template>
<script>
  import {service} from "../js/api";
  export default {
    data(){
      return{
        userName: null,
        password: null,
        password2: null,
        price: 0
      }
    },
    methods: {
      register(){
        if (this.password !== this.password2){
          alert("两次密码输入不一致！");
          return
        }
        service('post','/user/register',{
          userName: this.userName,
          password: this.password,
          price: this.price
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            console.log("注册失败！")
          }else{
            window.location.href = "/Login"
          }
        })
      }
    }
  }
</script>
<style scoped>
  #max {
    height: 100%;
    width: 100%;
    background: url("../assets/imgs/backgroud.jpg") no-repeat 75% 80%;
  }
  .input-div {
    padding-top: 100px;
    width: 100%;
    height: 500px;
  }
  .inputClass {
    padding: 10% 12% 0;
    vertical-align: bottom;
    outline: none;
    font-size: 150%;
    width: 100%;
    height: 10%;
  }

  .inputClass input {
    font-family: 宋体;
    border: none;
    background-color: transparent;
    vertical-align: bottom;
  }

  .inputClass input:focus {
    outline: none;
  }

  .one {
    width: 38%;
  }

  .two {
    width: 33%;
  }

  hr {
    margin: -1% 15%;
  }

  #buttonOne {
    width: 100%;
    height: 15%;
  }

  #buttonContentOne {
    display: inline-block;
    margin-top: 17%;
    width: 25%;
    font-size: 200%;
    font-family: 宋体;
    border-radius: 25px;
    background-color: rgba(238, 154, 73, 0.2);
    border:1px solid 	#EE7942;
    color: white;
  }

  #logo {
    width: 100%;
    height: 50px;
  }

  .font-div {
    width: 70%;
    height: 50px;
    font-size: 15px;
    margin-left: 15%;
    margin-top: 50px;
  }

  #realLogo {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 250%;
    font-family: 宋体;
    padding-top: 20px;
    color: rgba(87, 15, 18, 0.8);
    vertical-align: bottom;
  }
</style>
