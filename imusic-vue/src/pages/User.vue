<template>
    <div class="user" v-if="userPlayList&&userInfo">
        <div class="info">
            <div class="info-l">
                <img :src="userPlayList[0].creator.avatarUrl" alt="">
            </div>
            <div class="info-r">
                <h1><p>{{userPlayList[0].creator.nickname}}</p><span :class="userPlayList[0].creator.gender==1?'man':'woman'"></span></h1>
                <ul>
                    <li><div><h3>{{userInfo.follows}}</h3><span>关注</span></div></li>
                    <li><div><h3>{{userInfo.followeds}}</h3><span>粉丝</span></div></li>
                </ul>
                <p v-if="userInfo.signature">个人介绍：{{userInfo.signature}}</p>
            </div>
        </div>
        <div class="song"></div>
        <div class="playList">
            <h3>{{userInfo.nickname}}的歌单&ensp;({{userPlayList.length}})</h3>
            <ul class="gdList">
                <li v-for="(item,index) in userPlayList" :key="index">
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'User',
    data() {
        return {
            userPlayList:null,
            userInfo:null
        }
    },
    methods: {
        init:function(){
            var that=this
            // console.log(that.$route.query.id)
            //用户歌单
            axios({
                method: "get",
                url:"https://v1.itooi.cn/netease/songList/user?uid="+that.$route.query.id
            })
            .then(function(res) {
                // console.log(res.data.data)
                that.userPlayList = res.data.data;
                //用户信息
                axios({
                    method:'get',
                    url:'https://v1.itooi.cn/netease/search?keyword='+that.userPlayList[0].creator.nickname+'&type=user&pageSize=4&page=0&&format=1'
                    }).then(function(res){
                        // console.log(res.data.data.userprofiles[that.$route.query.num])
                        that.userInfo=res.data.data.userprofiles[that.$route.query.num]
                    }).catch(function(err){
                    })
                })
            .catch(function(error) {});
        }
    },
    mounted() {
        this.init()
        
    },
    watch: {
        // 方法1
        '$route' (to, from) { //监听路由是否变化
            // console.log(to.query.id)
            if(to.query.id){
                this.init()
            }
        } ,
        /* //方法2
        '$route'(to, from) {
            if (to.path == "/page") {  /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
            this.message = this.$route.query.msg     
            }
        }   */
    }
}
</script>

<style scoped>
.user {
  width: 900px;
  min-height: 700px;
  _height: 700px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
}
.info{
    display: flex;
    margin-bottom: 43px;
}
.info-l{
    width: 188px;
    margin-right: 40px;
}
.info-l img{
    display: block;
    width: 180px;
    height: 180px;
    padding: 3px;
    background: #fff;
    border: 1px solid #d5d5d5;
}
.info-r{
    width: 100%;
}
.info-r h1{
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
}
.info-r h1 p{
    font-size: 22px;
    font-weight: normal;
    line-height: 30px;
}
.info-r h1 span{
    width: 20px;
    height: 20px;
    margin-left: 10px;
}
.info-r h1 span.man{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -41px -57px;
}
.info-r h1 span.woman{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -41px -27px;
}
.info-r ul{
    display: flex;
}
.info-r ul li{
    padding: 0 40px 0 20px;
    border-left: 1px solid #ddd;
}
.info-r ul li div{
    cursor: pointer;
}
.info-r ul li div:hover h3{
    color: #0c73c2;
}
.info-r ul li div:hover span{
    color: #0c73c2;
}
.info-r ul li:first-of-type{
    border: none;
}
.info-r ul li h3{
    font-size: 24px;
    font-weight: normal;
    color: #666;
}
.info-r ul li span{
    color: #666;
}

.playList h3{
    height: 33px;
    font-size: 20px;
    line-height: 28px;
    font-weight: normal;
    border-bottom: 2px solid #c20c0c;
}
.gdList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
}
.gdList li {
  width: 140px;
  margin-top: 30px;
  padding: 0 10px;
}
.gdList li > div {
  position: relative;
}
.gdList li > div > div {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?02b03e5391ee1dcffeed29e976c08277)
    0 -537px no-repeat;
}
.gdList li > div > div span {
  position: absolute;
  color: #ccc;
}
.gdList li > div > div span:nth-of-type(1) {
  left: 30px;
  top: 7px;
}
.gdList li > div > div span:nth-of-type(2) {
  width: 14px;
  height: 11px;
  background-position: 0 -24px;
  margin: 9px 5px 9px 10px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -24px no-repeat;
}
.gdList li > div > div span:nth-of-type(3) {
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 0 no-repeat;
}
.gdList li > div > div span:nth-of-type(3):hover {
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?fb2cd6471db62dd617f29a68fcb86abe)
    0 -60px no-repeat;
}
.gdList img {
  cursor: pointer;
}
.gdList li>p {
  margin: 8px 0 3px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.gdList li>p:hover {
  text-decoration: underline;
}
</style>

