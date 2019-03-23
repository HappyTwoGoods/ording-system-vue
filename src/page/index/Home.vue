<template>
  <div class="body">
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
    <div class="list-top-div">
      <div class="goods-title">
        <p>商品列表</p>
      </div>
    </div>
    <div class="list-div">
      <div v-for="(result, index) in searchBack" class="box">
        <div class="content">
          <div class="img_div">
            <img src="../../assets/home/111.jpg" class="image_style"/>
          </div>
          <div class="info_div">
            <h5 class="h5_brand_name">{{result.name}}</h5>
            <h5 class="h5_floor">￥{{result.price}}</h5>
          </div>
          <div class="num-div">
            <img src="../../assets/home/add.png" @click="reduceNum('index'+index,result.id,result.price,result.name)" style="width: 20px; height: auto"/>
              <span :id ="'index'+index" class="num-input">0</span>
            <img src="../../assets/home/reduce.png" @click="addNum('index'+index,result.id,result.price,result.name)" style="width: 20px; height: auto"/>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-div">
      <img src="../../assets/home/shop.png" style="width: 80%; height: auto; margin-top: 5px" @click="ordingInfoShow = true"/>
    </div>
    <div class="dialog" v-show="dialogShow">
      <div class="mask"></div>
      <div class="float_frame">
        <div v-for="(types,index) in typeArray">
          <div class="type-div" :id ="'index'+index" @click="getId(types.id)"><p>{{types.value}}</p></div>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShow=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="searchs()"><p class="p_style">确定</p></div>
        </div>
      </div>
    </div>
    <div class="dialog" v-show="ordingInfoShow">
      <div class="mask"></div>
      <div class="float_frame_ordingInfo">
        <h2>所选菜品：</h2>
        <div class="center-ording-div">
          <div v-for="(goods,index) in goodsArray" class="goods-list">
            <div class="little-div">{{goods.goodsName}}</div>
            <div class="little-div">{{goods.num}}</div>
            <div class="little-div">{{goods.price}}</div>
          </div>
        </div>
        <div class="click_ording_div">
          <div class="click_left" @click="ordingInfoShow=false"><p class="p_style">关闭</p></div>
          <div class="click_right" @click="getOrding()"><p class="p_style">下单</p></div>
        </div>
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
        dialogShow: false,
        ordingInfoShow: false,
        typeId: null,
        discount: null,
        goodsId: null,
        typeArray: [
          {
            id: 1,
            value: '主食'
          },
          {
            id: 2,
            value: '饮品'
          },
          {
            id: 3,
            value: '汤羹'
          },
          {
            id: 4,
            value: '炒菜'
          },
          {
            id: 5,
            value: '凉菜'
          },
          {
            id: 6,
            value: '烧烤'
          },
        ],
        goodsArray:[]
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
      reduceNum(id,goodsId,price,name) {
        this.goodsId = goodsId;
        console.log(this.goodsId);
        if (document.getElementById(id).innerHTML <= 0){
          alert("您未选择该商品！");
          return;
        }
        document.getElementById(id).innerHTML=parseInt(document.getElementById(id).innerHTML)-1;
        for (let i = 0; i < this.goodsArray.length; i++) {
          if (goodsId === this.goodsArray[i].id) {
            if (document.getElementById(id).innerHTML === 0){
              console.log(1111);
              this.goodsArray.splice(i,4);
            }
            this.goodsArray[i].num = document.getElementById(id).innerHTML;
          }
        }
      },
      addNum(id,goodsId,price,name) {
        this.goodsId = goodsId;
        console.log(this.goodsId);
        document.getElementById(id).innerHTML=parseInt(document.getElementById(id).innerHTML)+1;
        for (let i = 0; i < this.goodsArray.length; i++){
          if (goodsId === this.goodsArray[i].id) {
            this.goodsArray[i].num = document.getElementById(id).innerHTML;
          }
        }
        let goods = {};
        goods.goodsId = this.goodsId;
        goods.goodsName = name;
        goods.num = document.getElementById(id).innerHTML;
        goods.price = price;
        this.goodsArray.push(goods);
        console.log(this.goodsArray)
      },
      searchs() {
        service('get','/user/goodsList',{
          goodName: this.goodsName,
          goodType: this.typeId,
          discount: this.discount
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          this.searchBack = data.data;
          this.dialogShow = false;
          this.goodsName = null;
          this.typeId = null;
          this.discount = null;
        })
      },
      getOrding() {
        for (let i = 0; i < this.goodsArray.length; i++) {
          service('get', '/user/getOrder', {
            billDetail: this.goodsArray[i]
          }).then(data => {
            if (data.code !== 200) {
              alert(data.message);
              return;
            }
            this.sleep(5000);
          })
        }
        this.ordingInfoShow = false;
      },
      sleep(n) {
        let start = new Date().getTime();//定义起始时间的毫秒数
        while (true) {
          console.log(1111111);
          let time = new Date().getTime();//每次执行循环取得一次当前时间的毫秒数
          if (time - start > n) {//如果当前时间的毫秒数减去起始时间的毫秒数大于给定的毫秒数，即结束循环
            break;
          }
        }
      },
      getId(id){
        console.log(id);
        this.typeId = id;
      }
    }
  }
</script>
<style scoped>
  @import "../../../node_modules/swiper/dist/css/swiper.min.css";
  .body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .top-div {
    position: fixed;
    width: 100%;
    height: 40px;
    background: url("../../assets/home/littleflower.jpeg") 100% 100% no-repeat;
    top:0;
  }

  .h3-style {
    font-family:'思源黑体';
    font-size:18px;
  }

  .search-div{
    width: 100%;
    height: 50px;
    margin-top: 40px;
  }
  #my-swiper{
    position: fixed;
    width: 100%;
    height: 150px;
    z-index: -1;
  }

  .search_div {
    position: fixed;
    width: 100%;
    height: 50px;
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
    width: 50px;
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
    position: fixed;
    bottom: 33px;
    width: 50px;
    height: 50px;
    opacity: 0.9;
    background-color: darkgrey;
    border-radius: 50%;
    margin-left: 3%;
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
    overflow-y: hidden;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .float_frame {
    width: 100%;
    height: 200px;
    background-color: white;
    top: 120px;
    position: fixed;
    overflow-y: hidden;
  }

  .float_frame_ordingInfo {
    width: 80%;
    height: 400px;
    background-color: white;
    top: 80px;
    position: fixed;
    margin-left: 10%;
  }

  .type-div {
    float: left;
    width: 30%;
    height: 40px;
    background-color: cadetblue;
    margin-left: 2.5%;
    margin-top: 10px;
  }

  .type-div:focus{
    background: olive;
  }

  .click_div {
    width: 100%;
    height: 40px;
    margin-top: 160px;
  }

  .click_ording_div{
    width: 100%;
    height: 40px;
    margin-top: 40px;
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

  .p_style {
    margin-top: 10px;
  }

  .list-div {
    /*position: absolute;*/
    margin-top: 200px;
    z-index: -2;
  }

  .list-top-div {
    position: fixed;
    width: 100%;
    height: 40px;
    margin-top: 150px;
    background-color: white;
  }

  .goods-title {
    width: 20%;
    height: 20px;
    margin-left: 5%;
    border-left: 5px solid black;
  }

  .center-ording-div {
    width: 90%;
    height: 250px;
    background-color: blanchedalmond;
    overflow-y: scroll;
    margin-left: 5%;
    opacity: 0.8;
    border-radius: 6%;
  }

  .goods-list {
    margin-top: 20px;
    margin-left: 5%;
    width: 90%;
    height: 30px;
    border-bottom: solid 1px black;
  }

  .little-div {
    float: left;
    width: 30%;
    margin-left: 3%;
  }

</style>
