<template>
  <div class="pl">
    <div class="l">
      <div class="gd">
        <div v-if="playlist">
          <img :src="playlist.coverImgUrl" alt />
        </div>
        <div v-if="playlist">
          <div class="title">
            <span>
              <i></i>
            </span>
            <p>{{playlist.name}}</p>
          </div>
          <div class="user">
            <img :src="playlist.creator.avatarUrl" alt />
            <p>{{playlist.creator.nickname}}</p>
            <span>{{formatDate1(playlist.createTime)}} 创建</span>
          </div>
          <div class="btns">
            <div>
              <div v-on:click="play">
                <div>
                  <div></div>播放
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <div>({{playlist.subscribedCount}})</div>
            </div>
            <div>
              <div>({{playlist.shareCount}})</div>
            </div>
            <div>
              <div>下载</div>
            </div>
            <div>
              <div>({{playlist.commentCount}})</div>
            </div>
          </div>
          <div class="bq">
            <p>标签：</p>
            <div v-for="(item,index) in playlist.tags" :key="index">
              <span>{{item}}</span>
            </div>
          </div>
          <div class="info">
            <p v-if="hide" class="hide">介绍：{{playlist.description}}</p>
            <p v-else>介绍：{{playlist.description}}</p>
            <div>
              <span v-on:click="flag" :class="!hide?'zhedie':''">
                {{status}}
                <i></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="gqlb">
        <div v-if="playlist">
          <div class="tit">
            <div>
              <h3>歌曲列表</h3>
              <span>{{playlist.trackCount}}首歌</span>
            </div>
            <div>
              <div>
                <i></i>
                <span>生成外链播放器</span>
              </div>
              <div>
                播放：
                <span>{{playlist.playCount}}</span>次
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  <div></div>
                </th>
                <th>
                  <div>歌曲标题</div>
                </th>
                <th>
                  <div>时长</div>
                </th>
                <th>
                  <div>歌手</div>
                </th>
                <th>
                  <div>专辑</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in playlist.tracks" :key="index">
                <td>
                  <div>{{index+1}}</div>
                </td>
                <td>
                  <div><router-link :to="{path:'/fxyy/song',query:{id:item.id}}" tag="span">{{item.name}}</router-link><router-link :to="{path:'/fxyy/mv',query:{id:item.mvid}}" tag="i" v-if="item.mvid"></router-link></div>
                </td>
                <td>
                  <div>{{formatDate2(item.duration)}}</div>
                </td>
                <td>
                  <div :title="getDate(item.artists)">
                    <span v-for="(a,b) in item.artists" :key="b">
                      <router-link :to="{path:'/fxyy/artist',query:{id:a.id}}" tag="em">{{a.name}}</router-link>
                      <i v-if="b!=item.artists.length-1">/</i>
                    </span>
                  </div>
                </td>
                <td>
                  <router-link
                    :to="{path:'/fxyy/album',query:{id:item.album.id}}"
                    tag="div"
                    :title="item.album.name"
                  >{{item.album.name}}</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="r"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Playlist",
  data() {
    return {
      playlist: null,
      hide: true,
      status: "展开"
    };
  },
  methods: {
    formatDate1: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      /* let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s; */
      // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      return y + "-" + MM + "-" + d;
    },
    formatDate2: function(value) {
      let date = new Date(value);
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },
    getDate(arr) {
      var str = "";
      arr.map(function(item) {
        str += "/" + item.name;
      });
      return str.substr(1);
    },
    flag: function() {
      if (this.hide) {
        this.hide = false;
        this.status = "收起";
      } else {
        this.hide = true;
        this.status = "展开";
      }
    },
    play: function() {
      var that = this;
      // console.log(that.$store.state)
      var arr=[]
      var arr1=[]
      that.playlist.tracks.map(function(item){
        arr1.push(item.id)
      })
      var arr2=that.$store.state.songList
      arr=arr1.filter(items => {
        if (!arr2.includes(items)) return items;
      })
      arr.map(function(item){
        // that.$store.dispatch('addSong',item)
        that.$store.dispatch('getSongInfo',item)
      })
    },
    init: function() {
      var that = this;
      // console.log(that.$route.query.id)
      axios({
        method: "get",
        url: "https://v1.itooi.cn/netease/songList?id=" + that.$route.query.id
      })
      .then(function(res) {
        // console.log(res.data.data);
        that.playlist = res.data.data;
      })
      .catch(function(error) {});
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    // 方法1
    $route(to, from) {
      //监听路由是否变化
      // console.log(to.query.id)
      if (to.query.id) {
        this.init();
      }
    }
  }
};
</script>

<style scoped>
.pl {
  width: 980px;
  min-height: 700px;
  _height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
}
.pl .l {
  width: 710px;
  min-height: 700px;
  _height: 700px;
  border-right: 1px solid #d3d3d3;
  padding: 47px 30px 40px 39px;
  box-sizing: border-box;
}
.pl .gd {
  min-height: 230px;
  display: flex;
  justify-content: space-between;
}
.pl .gd > div:first-of-type {
  width: 208px;
  height: 208px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?564bbdcc29cb000b23715f9156c98a7a)
    0 -1285px;
  padding: 4px;
  box-sizing: border-box;
}
.pl .gd > div:last-of-type {
  width: 410px;
}
.gd .title {
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.gd .title span {
  width: 54px;
  height: 24px;
  position: relative;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?ab4b4974b299de9965c980118e1c8196)
    0 -243px;
}
.gd .title span i {
  position: absolute;
  width: 8px;
  height: 8px;
  top: 2px;
  left: 34px;
  background: url(https://s2.music.126.net/style/web2/img/white-r-icon@3x.png?93fdea1f7bd080e68ab904c5616277fd);
  background-size: cover;
}
.gd .title p {
  width: 346px;
  line-height: 24px;
  font-size: 20px;
  font-weight: normal;
}
.gd .user {
  display: flex;
  width: 100%;
  height: 35px;
  margin-bottom: 20px;
}
.gd .user img {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.gd .user p {
  line-height: 35px;
  margin: 0 15px 0 10px;
  font-family: "Yahei";
  cursor: pointer;
  color: #0c73c2;
}
.gd .user p:hover {
  text-decoration: underline;
}
.gd .user span {
  line-height: 35px;
  color: #999;
}
.gd .btns {
  height: 31px;
  margin-bottom: 25px;
  display: flex;
}
.gd .btns > div {
  margin-right: 5px;
}
.gd .btns > div {
  cursor: pointer;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type {
  float: left;
  width: 61px;
  height: 31px;
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -428px;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type:hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -510px;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type:hover > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -469px;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type:hover > div > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -28px -1622px;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type > div {
  width: 46px;
  height: 31px;
  padding: 0 7px 0 8px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -387px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
.gd .btns > div:nth-of-type(1) > div:first-of-type > div > div {
  width: 20px;
  height: 18px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1622px;
}
.gd .btns > div:nth-of-type(1) > div:last-of-type {
  float: left;
  margin-left: -3px;
  width: 31px;
  height: 31px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1588px;
}
.gd .btns > div:nth-of-type(1) > div:last-of-type:hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -40px -1588px;
}
.gd .btns > div:nth-of-type(2) {
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1020px;
}
.gd .btns > div:nth-of-type(2):hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1106px;
}
.gd .btns > div:nth-of-type(2):hover > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1063px;
}
.gd .btns > div:nth-of-type(2) > div {
  padding-right: 2px;
  padding-left: 28px;
  line-height: 31px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -977px;
}
.gd .btns > div:nth-of-type(3) {
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1020px;
}
.gd .btns > div:nth-of-type(3):hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1106px;
}
.gd .btns > div:nth-of-type(3):hover > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1268px;
}
.gd .btns > div:nth-of-type(3) > div {
  padding-right: 2px;
  padding-left: 28px;
  line-height: 31px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1225px;
}
.gd .btns > div:nth-of-type(4) {
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1020px;
}
.gd .btns > div:nth-of-type(4):hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1106px;
}
.gd .btns > div:nth-of-type(4):hover > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -2805px;
}
.gd .btns > div:nth-of-type(4) > div {
  padding-right: 2px;
  padding-left: 28px;
  line-height: 31px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -2761px;
}

.gd .btns > div:nth-of-type(5) {
  padding-right: 5px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1020px;
}
.gd .btns > div:nth-of-type(5):hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    right -1106px;
}
.gd .btns > div:nth-of-type(5):hover > div {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1508px;
}
.gd .btns > div:nth-of-type(5) > div {
  padding-right: 2px;
  padding-left: 28px;
  line-height: 31px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7)
    0 -1465px;
}
.gd .bq {
  display: flex;
  align-items: center;
}
.gd .bq p {
  color: #666;
}
.gd .bq div {
  cursor: pointer;
  margin-right: 10px;
  padding-right: 10px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f)
    right -27px;
}
.gd .bq div:hover {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f)
    right -1430px;
}
.gd .bq div:hover span {
  background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f)
    0 -1400px;
}
.gd .bq div span {
  color: #777;
  float: left;
  line-height: 22px;
  padding: 0 3px 0 13px;
  background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f)
    0 0;
}
.gd .info p {
  width: 100%;
  margin-top: 4px;
  line-height: 18px;
  color: #666;
  white-space: pre-wrap;
}
.gd .info .hide {
  display: -webkit-box;
  /* -webkit-box-orient: vertical; */
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.gd .info div span {
  float: right;
  display: flex;
  align-items: center;
  color: #0c73c2;
  cursor: pointer;
}
.gd .info div span:hover {
  text-decoration: underline;
}
.gd .info div span i {
  margin-left: 3px;
  width: 11px;
  height: 8px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -65px -520px;
}
.gd .info div .zhedie i {
  background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -45px -520px;
}
.gqlb {
  margin-top: 27px;
}
.gqlb .tit {
  display: flex;
  justify-content: space-between;
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.gqlb .tit > div {
  display: flex;
  align-items: center;
}
.gqlb .tit > div:first-of-type h3 {
  font-size: 20px;
  font-weight: normal;
}
.gqlb .tit > div:first-of-type span {
  margin-left: 20px;
  color: #666;
}
.gqlb .tit > div div:first-of-type {
  margin-right: 20px;
  cursor: pointer;
  display: flex;
}
.gqlb .tit > div div:first-of-type i {
  width: 16px;
  height: 16px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -34px -863px;
}
.gqlb .tit > div div:first-of-type span {
  color: #4996d1;
  text-decoration: underline;
}
.gqlb .tit > div div:last-of-type {
  color: #666;
}
.gqlb .tit > div div:last-of-type span {
  color: #c20c0c;
  font-weight: bold;
}
table {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}
table th {
  height: 36px;
  background: url(https://s2.music.126.net/style/web2/img/table.png?362e4b963bfdcf99d0249a6dc7440d04)
    0 0;
}
table th div {
  text-align: left;
  font-weight: normal;
  color: #666;
  padding: 8px 10px;
  background-position: 0 -56px;
  background: url(https://s2.music.126.net/style/web2/img/table.png?362e4b963bfdcf99d0249a6dc7440d04)
    0 -56px no-repeat;
}
table th:first-of-type div {
  background: none;
}
table td {
  padding: 6px 10px;
}
table th:nth-of-type(1) {
  width: 74px;
}
table th:nth-of-type(2) {
  width: 237px;
}
table th:nth-of-type(3) {
  width: 111px;
}
table th:nth-of-type(4) {
  width: 89px;
}
table th:nth-of-type(5) {
  width: 127px;
}
table td div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
table tr td:nth-of-type(2) div{
  display: flex;
  align-items: center;
}
table tr td:nth-of-type(2) div span{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
table tr td:nth-of-type(2) div i{
  width: 23px;
  height: 17px;
  margin-left: 10px;
  cursor: pointer;
  background: url(https://s2.music.126.net/style/web2/img/table.png?d40c07aa53228a3fa5f823c5fa01c033) 0 -151px;
}
table tr td:nth-of-type(2) div i:hover{
  background: url(https://s2.music.126.net/style/web2/img/table.png?d40c07aa53228a3fa5f823c5fa01c033) -30px -151px;
}
table td div p {
  white-space: nowrap;
}
table td div span em {
  font-style: normal;
  cursor: pointer;
}
table td i {
  font-style: normal;
}
table td div span em:hover {
  text-decoration: underline;
}
table tbody tr:nth-of-type(2n + 1) {
  background-color: #f7f7f7;
}
table tr td:nth-of-type(2) span:hover {
  cursor: pointer;
  text-decoration: underline;
}
table tr td:nth-of-type(5):hover {
  cursor: pointer;
  text-decoration: underline;
}
.pl .r {
  width: 270px;
}
</style>

