<template>
  <div class="tj">
    <div class="banner" :style=" bannerShow?'background:url('+banner[index].backgroundUrl+')':''">
      <div>
        <div class="banner-c">
          <router-link
            v-if="bannerShow&&banner[index].targetId!=0"
            :to="'/fxyy'+banner[index].url"
            tag="img"
            :src="banner[index].picUrl"
            alt="banner"
          ></router-link>
          <a v-if="bannerShow&&banner[index].targetId==0" :href="banner[index].url">
            <img :src="banner[index].picUrl" alt="banner" />
          </a>
          <div class="download">
            <div>
              <em href class="downBtn"></em>
              <p class="downTit">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
            </div>
            <span></span>
            <span></span>
          </div>
        </div>
        <span v-on:click="btnl"></span>
        <span v-on:click="btnr"></span>
        <div class="bottomBtn">
          <span
            v-for="(a,b) in banner"
            :key="b"
            :style="b==index?'background-position:-16px -343px;':''"
            v-on:click="select(b)"
          ></span>
        </div>
      </div>
    </div>
    <div>
      <div class="l">
        <div class="rmtj">
          <div class="title">
            <h1>热门推荐</h1>
            <ul>
              <router-link :to="{path:'/fxyy/gd',query:{type:'华语'}}" tag="li">华语</router-link>
              <router-link :to="{path:'/fxyy/gd',query:{type:'流行'}}" tag="li">流行</router-link>
              <router-link :to="{path:'/fxyy/gd',query:{type:'摇滚'}}" tag="li">摇滚</router-link>
              <router-link :to="{path:'/fxyy/gd',query:{type:'民谣'}}" tag="li">民谣</router-link>
              <router-link :to="{path:'/fxyy/gd',query:{type:'电子'}}" tag="li">电子</router-link>
            </ul>
            <div class="more">
              <router-link to="/fxyy/gd" tag="p">更多</router-link>
              <span></span>
            </div>
          </div>
          <ul class="rmtjList">
            <li v-for="(item,index) in rmtjList" :key="index">
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
        <div class="xdsj">
          <div class="title">
            <h1>新碟上架</h1>
            <div class="more">
              <router-link to="/fxyy/xdsj" tag="p">更多</router-link>
              <span></span>
            </div>
          </div>

          <div class="xdsjList">
            <swiper
              :options="swiperOption"
              class="swiper-wrap"
              ref="mySwiper"
              v-if="xdsjList1.length!=0"
            >
              <swiper-slide>
                <div v-for="(item,index) in xdsjList1" :key="index">
                  <div>
                    <router-link
                      :to="'/fxyy/album?id='+item.song.album.id"
                      tag="img"
                      :src="item.song.album.picUrl"
                      alt
                    ></router-link>
                    <span></span>
                  </div>
                  <router-link :to="'/fxyy/album?id='+item.song.album.id" tag="p">{{item.name}}</router-link>
                  <p>
                    <span v-for="(a,b) in item.song.artists" :key="b">
                      <em>{{a.name}}</em>
                      <i>{{b==item.song.artists.length-1?"":" / "}}</i>
                    </span>
                  </p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div v-for="(item,index) in xdsjList2" :key="index">
                  <div>
                    <router-link
                      :to="'/fxyy/album?id='+item.song.album.id"
                      tag="img"
                      :src="item.song.album.picUrl"
                      alt
                    ></router-link>
                    <span></span>
                  </div>
                  <router-link :to="'/fxyy/album?id='+item.song.album.id" tag="p">{{item.name}}</router-link>
                  <p>
                    <span v-for="(a,b) in item.song.artists" :key="b">
                      <em>{{a.name}}</em>
                      <i>{{b==item.song.artists.length-1?"":" / "}}</i>
                    </span>
                  </p>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
        <!-- <div class="bd">
                    <div class="title">
                        <h1>榜单</h1>
                        <div class="more">
                            <p>更多</p>
                            <span></span>
                        </div>
                    </div>
        </div>-->
      </div>
      <div class="r">
        <div class="yhdl"></div>
        <div class="rzgs"></div>
        <div class="rmzb"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tj",
  data() {
    return {
      bannerShow: false,
      banner: [],
      index: 0,
      timer: null,
      rmtjList: [],
      xdsjList1: [],
      xdsjList2: [],

      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        navigation: {
          nextEl: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
          prevEl: ".swiper-button-prev", //后退按钮的css选择器或HTML元素。
          hideOnClick: true, //点击slide时显示/隐藏按钮
          disabledClass: "my-button-disabled", //前进后退按钮不可用时的类名。
          hiddenClass: "my-button-hidden" //按钮隐藏时的Class
        }
      }
    };
  },
  methods: {
    btnl: function() {
      var that = this;
      clearInterval(that.timer);
      if (that.index <= 0) {
        that.index = that.banner.length - 1;
      } else {
        that.index--;
      }
      that.timer = setInterval(function() {
        if (that.index >= that.banner.length - 1) {
          that.index = 0;
        } else {
          that.index++;
        }
      }, 5000);
    },
    btnr: function() {
      var that = this;
      clearInterval(that.timer);
      if (that.index >= that.banner.length - 1) {
        that.index = 0;
      } else {
        that.index++;
      }
      that.timer = setInterval(function() {
        if (that.index >= that.banner.length - 1) {
          that.index = 0;
        } else {
          that.index++;
        }
      }, 5000);
    },
    select(num) {
      var that = this;
      clearInterval(that.timer);
      that.index = num;
      that.timer = setInterval(function() {
        if (that.index >= that.banner.length - 1) {
          that.index = 0;
        } else {
          that.index++;
        }
      }, 5000);
    }
  },
  mounted() {
    var that = this;
    //banner
    axios({
      method: "get",
      url: "https://v1.itooi.cn/netease/banner"
    })
      .then(function(res) {
        // console.log(res.data.data)
        that.banner = res.data.data;
        that.bannerShow = true;
        that.timer = setInterval(function() {
          if (that.index >= that.banner.length - 1) {
            that.index = 0;
          } else {
            that.index++;
          }
        }, 5000);
      })
      .catch(function(error) {});
    //热门推荐
    axios({
      method: "get",
      url:
        "https://v1.itooi.cn/netease/songList/hot?cat=%E5%85%A8%E9%83%A8&pageSize=8&page=0"
    })
      .then(function(res) {
        // console.log(res.data.data)
        that.rmtjList = res.data.data;
      })
      .catch(function(error) {});
    //新碟上架
    axios({
      method: "get",
      url: "https://v1.itooi.cn/netease/song/newest"
    })
      .then(function(res) {
        // console.log(res.data.data)
        that.xdsjList1 = res.data.data.slice(0, 5);
        that.xdsjList2 = res.data.data.slice(5, 10);
      })
      .catch(function(error) {});
  }
};
</script>

<style scoped>
.banner {
  height: 336px;
}
.banner > div {
  height: 336px;
  width: 984px;
  margin: 0 auto;
  position: relative;
}
.banner-c {
  width: 984px;
  height: 100%;
}
.banner-c img {
  width: 730px;
  height: 100%;
  cursor: pointer;
  float: left;
}
.banner > div > span {
  position: absolute;
  width: 37px;
  height: 63px;
  top: 50%;
  margin-top: -31px;
  cursor: pointer;
}
.banner > div > span:first-of-type {
  left: -68px;
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?bfcee4948c20d700ef90039b43b94f24)
    0 -360px no-repeat;
}
.banner > div > span:first-of-type:hover {
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?bfcee4948c20d700ef90039b43b94f24)
    0 -430px no-repeat;
}
.banner > div > span:last-of-type {
  right: -68px;
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?bfcee4948c20d700ef90039b43b94f24)
    0 -507px no-repeat;
}
.banner > div > span:last-of-type:hover {
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?bfcee4948c20d700ef90039b43b94f24)
    0 -578px no-repeat;
}
.bottomBtn {
  position: absolute;
  bottom: 6px;
  width: 730px;
  height: 20px;
  text-align: center;
}
.bottomBtn span {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?6d1f0bb1d48a1bc0c2e770438785ee9e)
    3px -343px no-repeat;
}
.bottomBtn span:hover {
  background-position: -16px -343px;
}
.download {
  position: relative;
  width: 254px;
  height: 100%;
  float: right;
}
.download > div {
  overflow: hidden;
  width: 254px;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/index/download.png?9948aa803a0eb0fbd430a36192428bc6)
    no-repeat;
}
.download span {
  position: absolute;
  top: 0;
  width: 20px;
  height: 336px;
  background: url(https://s2.music.126.net/style/web2/img/index/banner.png?6d1f0bb1d48a1bc0c2e770438785ee9e)
    no-repeat;
}
.download span:first-of-type {
  left: -20px;
  background-position: -1px 0;
}
.download span:last-of-type {
  right: -20px;
  background-position: -20px 0;
}
.downBtn {
  display: block;
  width: 215px;
  height: 56px;
  margin: 212px 0 0 19px;
  cursor: pointer;
}
.downBtn:hover {
  background: url(https://s2.music.126.net/style/web2/img/index/download.png?9948aa803a0eb0fbd430a36192428bc6)
    0 -340px no-repeat;
}
.downTit {
  margin: 10px auto;
  text-align: center;
  color: #8d8d8d;
  font-size: 12px;
}
.tj > div:nth-of-type(2) {
  width: 980px;
  background: url(https://s2.music.126.net/style/web2/img/frame/wrap1.png?0b8ba03be93b33572b8440020bb918d0);
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
}
.tj .l {
  width: 729px;
  box-sizing: border-box;
  padding: 20px 20px 40px;
}
.tj .r {
  width: 250px;
}
.l .title {
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  display: flex;
  padding: 0 10px 0 34px;
  justify-content: space-between;
  align-items: center;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?1b149e45c2e120a28b26f88ed7bd2d67) -225px -152px
    no-repeat;
}
.l .title h1 {
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
}
.l .title ul {
  display: flex;
  flex: 1;
  margin-left: 5px;
}
.l .title li {
  height: 14px;
  line-height: 14px;
  padding: 0 10px;
  color: #666;
  border-right: 3px solid #ccc;
  cursor: pointer;
}
.l .title li:hover {
  text-decoration: underline;
}
.l .title .more {
  display: flex;
  align-items: center;
}
.l .title .more p {
  cursor: pointer;
  color: #666;
}
.l .title .more p:hover {
  text-decoration: underline;
}
.l .title .more span {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?1b149e45c2e120a28b26f88ed7bd2d67)
    0 -240px no-repeat;
}
.rmtjList {
  width: 689px;
  height: 438px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 40px;
}
.rmtjList li {
  width: 140px;
  margin-top: 30px;
}
.rmtjList li > div {
  position: relative;
}
.rmtjList li > div > div {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?02b03e5391ee1dcffeed29e976c08277)
    0 -537px no-repeat;
}
.rmtjList li > div > div span {
  position: absolute;
  color: #ccc;
}
.rmtjList li > div > div span:nth-of-type(1) {
  left: 30px;
  top: 7px;
}
.rmtjList li > div > div span:nth-of-type(2) {
  width: 14px;
  height: 11px;
  background-position: 0 -24px;
  margin: 9px 5px 9px 10px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -24px no-repeat;
}
.rmtjList li > div > div span:nth-of-type(3) {
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 0 no-repeat;
}
.rmtjList li > div > div span:nth-of-type(3):hover {
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -60px no-repeat;
}
.rmtjList img {
  cursor: pointer;
}
.rmtjList li>p {
  margin: 8px 0 3px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.rmtjList li>p:hover {
  text-decoration: underline;
}
.xdsjList {
  width: 687px;
  height: 186px;
  border: 1px solid #d3d3d3;
  background: #f5f5f5;
  margin: 20px 0 37px;
  padding: 0 16px;
  padding-top: 28px;
  box-sizing: border-box;
  position: relative;
}
.swiper-container {
  height: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: space-around;
}
.swiper-slide > div {
  width: 118px;
  height: 150px;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?1b149e45c2e120a28b26f88ed7bd2d67) -260px
    100px no-repeat;
}
.swiper-slide > div > div {
  width: 118px;
  height: 100px;
  margin-bottom: 7px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?02b03e5391ee1dcffeed29e976c08277)
    0 -570px no-repeat;
  position: relative;
  cursor: pointer;
}
.swiper-slide > div > div img {
  width: 100px;
  height: 100px;
}
.swiper-slide > div > div span {
  position: absolute;
  left: 70px;
  bottom: 5px;
  width: 22px;
  height: 22px;
}
.swiper-slide > div > div:hover span {
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -85px no-repeat;
}
.swiper-slide > div > div span:hover {
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -110px no-repeat;
}
.swiper-slide > div p {
  width: 90%;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.swiper-slide > div p:first-of-type:hover {
  cursor: pointer;
  text-decoration: underline;
}
.swiper-slide > div em {
  font-style: normal;
  cursor: pointer;
  color: #666;
}
.swiper-slide > div em:hover {
  text-decoration: underline;
}
.swiper-slide > div i {
  font-style: normal;
  color: #666;
}
.swiper-button-prev {
  width: 17px;
  height: 17px;
  left: 3px;
  outline: none;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?1b149e45c2e120a28b26f88ed7bd2d67) -260px -75px
    no-repeat;
}
.swiper-button-next {
  width: 17px;
  height: 17px;
  right: 3px;
  outline: none;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?1b149e45c2e120a28b26f88ed7bd2d67) -300px -75px
    no-repeat;
}
</style>
