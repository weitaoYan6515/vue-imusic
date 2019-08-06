<template>
  <div class="gd">
    <div id="contentBox">
      <h3>
        <div class="h3-l">
          <h2>{{categoryType}}</h2>
          <div class="fl" v-on:click.stop="isShow=true">
            <div>
              选择分类
              <i></i>
            </div>
          </div>
          <div class="fenlei" v-show="isShow" v-on:click.stop="isShow=true">
              <div class="fenlei-t"><i></i></div>
              <div class="fenlei-c">
                  <h3><span>全部风格</span></h3>
                  <div v-if="type">
                      <dl v-for="(item,index) in type.categories" :key="index">
                        <dt><i></i>{{item}}</dt>
                        <dd><div v-for="(a,b) in type.sub" :key="b"><p v-if="index==a.category"><span v-on:click="select(a.name)" :class="categoryType==a.name?'active':''">{{a.name}}</span><b>|</b></p></div></dd>
                    </dl>
                  </div>
              </div>
              <div class="fenlei-b"></div>
          </div>
        </div>
        <div class="h3-r" :class="tab">
          <span v-on:click="selectFn(1)">热门</span>
          <span v-on:click="selectFn(2)">最新</span>
        </div>
      </h3>
      <ul class="gdList">
        <li v-for="(item,index) in list" :key="index">
          <div>
            <router-link
              :to="{path:'/fxyy/playlist',query:{id:item.id}}"
              tag="img"
              :src="item.coverImgUrl"
              alt
            ></router-link>
            <div>
              <span>{{item.playCount}}</span>
              <span></span>
              <span></span>
            </div>
          </div>
          <router-link :to="{path:'/fxyy/playlist',query:{id:item.id}}" tag="p" :title="item.name">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div id="buttonBox"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gd",
  data() {
    return {
      tab: "one",
      isShow:false,
      type:null,
      categoryType:'全部',
      orderType:'hot',
      list: []
    };
  },
  methods: {
    selectFn: function(value) {
      if (value == 1) {
        this.tab = "one";
        this.orderType='hot'
        this.init()
      } else if (value == 2) {
        this.tab = "two";
        this.orderType='new'
        this.init()
      }
    },
    select:function(value){
        this.categoryType=value
        this.init()
        this.isShow=false
        console.log(this.isShow)
    },
    wrap:function(){
        this.isShow=true
    },
    init:function(){
        var that = this;
        if(that.$route.query.type){
            that.categoryType=that.$route.query.type
            this.$router.push('/fxyy/gd')
        }
        document.getElementsByTagName('body')[0].addEventListener('click',function(){
             that.isShow=false
        })
        //列表
        this.list=[]
        axios({
            method: "get",
            url:"https://v1.itooi.cn/netease/songList/hot?pageSize=35&page=0",
            params:{
                'categoryType':that.categoryType,
                'orderType':that.orderType
            }
        })
        .then(function(res) {
            // console.log(res.data.data);
            that.list = res.data.data;
        })
        .catch(function(error) {});
    }
  },
  mounted() {
      var that=this
      //分类
        axios({
            method: "get",
            url:"https://v1.itooi.cn/netease/songList/category"
        })
        .then(function(res) {
            // console.log(res.data.data);
            that.type = res.data.data;
        })
        .catch(function(error) {});
    this.init()
  }
};
</script>

<style scoped>
.gd {
  width: 900px;
  min-height: 700px;
  _height: 700px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  position: relative;
}
.fenlei{
    position: absolute;
    top: 75px;
    left: 0;
    z-index: 5;
    width: 720px;
}
.fenlei-t{
    height: 32px;
    background: url(https://s2.music.126.net/style/web2/img/sltlyr.png?408ba8a692eebe83e8942f6b904d9925);
}
.fenlei-t i{
    position: absolute;
    top: 2px;
    left: 132px;
    display: inline-block;
    width: 24px;
    height: 11px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?452866cc158ba3ebf9da5728433b08eb) -48px 0;
}
.fenlei-c{
    width: 700px;
    padding: 0 10px;
    background: url(https://s2.music.126.net/style/web2/img/sltlyr.png?408ba8a692eebe83e8942f6b904d9925) -720px 0;
}
.fenlei-c h3{
    height: 37px;
    padding-left: 26px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: normal;
}
.fenlei-c dl{
    display: flex;
    line-height: 24px;
    font-size: 12px;
}
.fenlei-c dt{
    width: 70px;
    margin-left: 26px;
    padding-top: 15px;
    border-right: 1px solid #e6e6e6;
    font-weight: bold;
    display: flex;
}
.fenlei-c dd{
    flex: 1;
    padding: 16px 15px 0 15px;
    border-left: 1px solid #e6e6e6;
    line-height: 24px;
    display: flex;
    flex-wrap: wrap;
}
.fenlei-c dd span{
    padding: 2px 6px;
    font-size: 12px;
    cursor: pointer;
}
.fenlei-c dd span:hover{
    text-decoration: underline;
}
.fenlei-c dd span.active{
    background: #a7a7a7;
    color: #fff; 
}
.fenlei-c dd b{
    margin: 0 8px 0 10px;
    color: #d8d8d8;
}
.fenlei-b{
    height: 20px;
    background: url(https://s2.music.126.net/style/web2/img/sltlyr.png?408ba8a692eebe83e8942f6b904d9925) -1440px -12px;
}
#contentBox > h3 {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
}
#contentBox .h3-l {
  display: flex;
}
#contentBox .h3-l h2 {
  font-size: 24px;
  font-weight: 500;
}
#contentBox .h3-l .fl {
  width: 86px;
  height: 31px;
  line-height: 31px;
  cursor: pointer;
  font-size: 12px;
  font-weight: normal;
  margin: 2px 0 0 12px;
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?1506582e49a5067c322bd22a460b7578)
    right -100px;
}
#contentBox .h3-l .fl:hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?1506582e49a5067c322bd22a460b7578)
    right -182px;
}
#contentBox .h3-l .fl > div {
  color: #0c73c2;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?1506582e49a5067c322bd22a460b7578)
    0 -59px;
}
#contentBox .h3-l .fl > div:hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?1506582e49a5067c322bd22a460b7578)
    0 -141px;
}
#contentBox .h3-l .fl > div i {
  display: block;
  width: 8px;
  height: 5px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -70px -543px;
  font-style: normal;
  margin-left: 5px;
}
#contentBox .h3-r {
  width: 93px;
  height: 29px;
  display: flex;
}
#contentBox .one {
  background: url(https://s2.music.126.net/style/web2/img/button.png?34648d8181d2233b709dd3f7061bcf6a)
    0 0;
}
.one span:nth-of-type(1) {
  color: white;
}
#contentBox .two {
  background: url(https://s2.music.126.net/style/web2/img/button.png?34648d8181d2233b709dd3f7061bcf6a)
    0 -32px;
}
.two span:nth-of-type(2) {
  color: white;
}
#contentBox .h3-r span {
  width: 46px;
  height: 29px;
  cursor: pointer;
  text-align: center;
  line-height: 29px;
}
#contentBox .gdList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
}
#contentBox .gdList li {
  width: 140px;
  margin-top: 30px;
  padding: 0 10px;
}
#contentBox .gdList li > div {
  position: relative;
}
#contentBox .gdList li > div > div {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?02b03e5391ee1dcffeed29e976c08277)
    0 -537px no-repeat;
}
#contentBox .gdList li > div > div span {
  position: absolute;
  color: #ccc;
}
#contentBox .gdList li > div > div span:nth-of-type(1) {
  left: 30px;
  top: 7px;
}
#contentBox .gdList li > div > div span:nth-of-type(2) {
  width: 14px;
  height: 11px;
  background-position: 0 -24px;
  margin: 9px 5px 9px 10px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -24px no-repeat;
}
#contentBox .gdList li > div > div span:nth-of-type(3) {
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 0 no-repeat;
}
#contentBox .gdList li > div > div span:nth-of-type(3):hover {
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -60px no-repeat;
}
#contentBox .gdList img {
  cursor: pointer;
}
#contentBox .gdList li>p {
  margin: 8px 0 3px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#contentBox .gdList li>p:hover {
  text-decoration: underline;
}
</style>

