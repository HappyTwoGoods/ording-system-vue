<template>
  <div id="max">
    <!--<div id="backgroundDiv">-->
      <!--<img src="../assets/imgs/backgroud.jpg" id="background"/>-->
    <!--</div>-->
    <div id="content">
      <div id="logo">
        <span id="realLogo">猫の饭</span>
      </div>
      <div class="inputClass">
        <input v-model="userName" type="text" placeholder="请输入用户名" id="phone"
               class="one" v-on:focus="flagOne=true" v-on:blur="flagOne=false" />
        <!--<input type="text" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="login"
               id="verifyCode" onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagTwo=true" v-on:blur="flagTwo=false"/>
        <!--<input type="text" value="" readonly class="two"/>-->
      </div>
      <hr/>
      <div id="buttonOne"><span id="buttonContentOne" v-on:click="login">登录</span></div>
      <div id="buttonTwo"><span id="buttonContentTwo" v-on:click="register()">注册</span></div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import {service} from "../js/api";
//  import $ from 'jquery'

  export default {
    name: "Login",
    data() {
      return {
        userName: null,
        password: null,
        countdown: 60,
        flagOne:false,
        flagTwo:false,
      }
    },
    methods: {
      login: function () {
        if (this.userName === null || this.password === null) {
          alert('请完成所有输入再登录');
          return
        }
        if (this.password.length !== 6) {
          alert('请输入正确密码格式！');
          return
        }
        service('post', '/user/login', {
          userName: this.userName,
          password: this.password,
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
          } else {
            alert("登录成功！");
//            window.location.href = "/Home";
            this.$router.push({path: '/Home'})
          }
        });
      },
      register(){
        this.$router.push({path: '/Register'});
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

  #backgroundDiv {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
  }

  #background {
    height: 100%;
    width: 100%;
  }

  #content {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }

  #logo {
    width: 100%;
    height: 40%;
  }

  #realLogo {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 350%;
    font-family: 宋体;
    padding-top: 50px;
    color: rgba(87, 15, 18, 0.8);
    vertical-align: bottom;
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

  #buttonContentTwo {
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

</style>
