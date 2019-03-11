<template>
  <div>
    <div class="top-div"><h3 class="h3-style">猫の饭</h3></div>
    <div class="search-div">
      <div class="search_div">
        <input class="search-input" placeholder="输入菜名进行搜索" @keyup.enter="searchs()" v-model="goodsName"/>
        <i class="i_div"></i>
        <div class="screen_div" @click="dialogShow = true">
          <img id="screen_div_img" src="../../assets/home/shaixuan.png"/>
        </div>
      </div>
    </div>
    <div class="swiper-container" id="my-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="../../assets/home/111.jpg" style="height: 100%; width: 100%;"/></div>
        <div class="swiper-slide"><img src="../../assets/home/222.jpg" style="height: 100%; width: 100%;"></div>
        <div class="swiper-slide"><img src="../../assets/home/333.jpg" style="height: 100%; width: 100%;"></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="list-div">
      <div v-for="(result, index) in searchBack" class="box">
        <div class="content">
          <div class="img_div">
            <img src="../../assets/home/111.jpg" class="image_style"/>
          </div>
          <div class="info_div">
            <h5 class="h5_brand_name">{{result.name}}</h5>
            <h5 class="h5_floor">￥{{result.price}}
            </h5>
          </div>
          <div class="num-div">
            <img src="../../assets/home/add.png" @click="reduceNum(index)" style="width: 20px; height: auto"/>
              <span id=index class="num-input">0</span>
            <img src="../../assets/home/reduce.png" @click="addNum(index)" style="width: 20px; height: auto"/>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-div">
      <div>

      </div>
    </div>
    <div class="dialog" v-show="dialogShow">
      <div class="mask"></div>
      <div class="float_frame">

      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from "swiper"
  import {service} from '../../js/api'

  export default {
    data() {
      return {
        searchBack: null,
        goodsName: null,
        num: 0,
        dialogShow: false
      }
    },
    mounted() {
      this._initSwiper();
      this.queryGoods();
    },
    methods: {
      _initSwiper() {
        var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          autoplay: true,
          pagination: '.swiper-pagination',
          prevButton: '.swiper-button-prev',
          autoplayDisableOnInteraction: false,
          observer:true,
        })
      },
      queryGoods(){
        service('GET','/user/goodsList',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.searchBack = data.data;
          console.log(this.searchBack);
        })
      },
      reduceNum(id) {
        document.getElementById(id).innerHTML=document.getElementById(id).innerHTML-1
//        if (this.num <= 0){
//          alert("您未选择该商品！");
//          return;
//        }
//        this.num = this.num - 1;
      },
      addNum() {
        document.getElementById(id).innerHTML=document.getElementById(id).innerHTML-1
      }
    }
  }
</script>
<style scoped>
  @import "../../../node_modules/swiper/dist/css/swiper.min.css";
  .top-div {
    padding-top: 15px;
    width: 100%;
    height: 40px;
    background: url("../../assets/home/littleflower.jpeg") 100% 100% no-repeat;
  }

  .h3-style {
    font-family:'思源黑体';
    font-size:18px;
  }

  .search-div{
    width: 100%;
    height: 50px;
  }
  #my-swiper{
    width: 100%;
    height: 150px;
    z-index: -999;
  }

  .search_div {
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: #faf7fa;
  }

  .search-input {
    margin-top: 5px;
    margin-left: -14%;
    width: 75%;
    height: 30px;
    border: 1px solid #a9a9a9;
    border-radius: 20px;
    padding-left:20px;
    outline:none;
  }

  .content {
    border-bottom: 1px solid #a9a9a9;
    width: 100%;
    height:80px;
    margin-top: 10px;
  }

  .img_div {
    border-radius: 8%;
    width: 20%;
    height:auto;
    margin-left: 20px;
  }

  .image_style {
    width: 100%;
    height: 70px;
    border: 1px solid #9a9a9a;
    border-radius: 10%;
  }

  .info_div {
    width: 80px;
    margin-top: -95px;
    margin-left: 30%;
  }

  .h5_brand_name {
    height: 20px;
  }

  .h5_floor {
    padding-top: -20px;
  }

  .num-input {
    width: 30%;
    height:20px;
    border: 1px solid #9a9a9a;
    border-radius: 25%;
  }

  .num-div {
    width: 80px;
    margin-top: -65px;
    margin-left: 70%;
  }

  .bottom-div {
    position: absolute;
    bottom: 33px;
    width: 100%;
    height: 35px;
    background-color: darkgrey;
  }

  .screen_div{
    margin-top: -27px;
    margin-left: 72%;
  }

  #screen_div_img {
    width: 50%;
    margin-left: 30%;
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .float_frame {
    width: 100%;
    height: 200px;
    background-color: white;
    top: 120px;
    position: fixed;
  }

</style>
