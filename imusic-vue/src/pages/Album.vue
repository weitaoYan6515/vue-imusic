<template>
    <div class="album">
        <div class="l">
            <div class="zj"  >
                <div v-if="album">
                    <img :src="album.picUrl" alt="">
                </div>
                <div v-if="album">
                    <div class="title">
                        <span></span>
                        <p>{{album.name}}</p>
                    </div>
                    <div class="user">
                        
                        <p>歌手：<router-link :to="{path:'/fxyy/artist',query:{id:album.artist.id}}" tag="span">{{album.artist.name}}</router-link></p>
                        <p>发行时间：<span>{{formatDate1(album.publishTime)}}</span></p>
                        <p>发行公司：<span>{{album.company}}</span></p>
                    </div>
                    <div class="btns">
                        <div>
                            <div><div v-on:click="play"><div></div>播放</div></div>
                            <div></div>
                        </div>
                        <div>
                            <div>收藏</div>
                        </div>
                        <div>
                            <div>({{album.info.shareCount}})</div>
                        </div>
                        <div>
                            <div>下载</div>
                        </div>
                        <div>
                            <div>({{album.info.commentCount}})</div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="js" v-if="album">
                <h3>专辑介绍：</h3>
                <p v-if="hide" class="hide">{{album.description}}</p>
                <p v-else>{{album.description}}</p>
                <div><span v-on:click="flag" :class="!hide?'zhedie':''">{{status}}<i></i></span></div>
            </div>
            <div class="gqlb">
                <div v-if="list&&album">
                    <div class="tit">
                        <div>
                            <h3>包含歌曲列表</h3>
                            <span>{{list.length}}首歌</span>
                        </div>
                        <div>
                            <div><i></i><span>生成外链播放器</span></div>
                            <div>播放：<span>{{album.playCount}}</span>次</div>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th><div></div></th>
                                <th><div>歌曲标题</div></th>
                                <th><div>时长</div></th>
                                <th><div>歌手</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in list" :key="index">
                                <td><div>{{index+1}}</div></td>
                                <td><router-link :to="{path:'/fxyy/song',query:{id:item.id}}" tag="div">{{item.name}}</router-link></td>
                                <td><div>{{formatDate2(item.dt)}}</div></td>
                                <td><div :title="getDate(item.ar)"><span v-for="(a,b) in item.ar" :key="b"><router-link :to="{path:'/fxyy/artist',query:{id:a.id}}" tag="em">{{a.name}}</router-link><i v-if="b!=item.ar.length-1">/</i></span></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="r">

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Album',
    data() {
        return {
            album:null,
            list:[],
            hide:true,
            status:'展开'
        }
    },
    methods: {
        formatDate1: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            /* let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s; */
            // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            return y + '-' + MM + '-' + d ;
        },
        formatDate2: function (value) {
            let date = new Date(value);
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return m + ':' + s;
        },
        getDate(arr){
            var str=''
            arr.map(function(item){
                str+='/'+item.name
            })
            return str.substr(1)
        },
        flag:function(){
          if(this.hide){
              this.hide=false
              this.status='收起'
          }else{
              this.hide=true
              this.status='展开'
          }
        },
        play: function() {
            var that = this;
            var arr=[]
            var arr1=[]
            that.list.map(function(item){
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
        init:function(){
            var that=this
            // console.log(that.$route.query.id)
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/album?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.album=res.data.data.album
                that.list=res.data.data.songs
            }).catch(function(error){
                
            })
        },
    
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
    .album{
        width: 980px;
        min-height: 700px;
        _height: 700px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        display: files;
    }
    .album .l{
        width: 710px;
        min-height: 700px;
        _height: 700px;
        border-right: 1px solid #d3d3d3;
        padding: 47px 30px 40px 39px;
        box-sizing: border-box;
    }
    .album .zj{
        min-height: 230px;
        display: flex;
        justify-content: space-between;
    }
    .album .zj>div:first-of-type{
        width: 208px;
        height: 208px;
        background: url(https://s2.music.126.net/style/web2/img/coverall.png?564bbdcc29cb000b23715f9156c98a7a) 0 -1285px;
        padding: 4px;
        box-sizing: border-box;
    }
    .album .zj>div:last-of-type{
        width: 410px;
    }
    .zj .title{
        height: auto;
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    .zj .title span{
        width: 54px;
        height: 24px;
        position: relative;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?ab4b4974b299de9965c980118e1c8196) 0 -186px;
    }
    .zj .title p{
        width: 346px;
        line-height: 24px;
        font-size: 20px;
        font-weight: normal
    }
    .zj .user{
        width: 100%;
    }
    .zj .user p{
        color: #666;
        margin: 10px 0;
    }
    .zj .user p:first-of-type span{
        color: #0c73c2;
    }
    .zj .user p:first-of-type span:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .zj .btns{
        height: 31px;
        margin-bottom: 25px;
        display: flex;
    }
    .zj .btns>div{
        margin-right: 5px;
    }
    .zj .btns>div{
        cursor: pointer;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type{
        float: left;
        width: 61px;
        height: 31px;
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -428px;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -510px;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type:hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -469px;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type:hover >div>div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -28px -1622px;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type>div{
        width: 46px;
        height: 31px;
        padding: 0 7px 0 8px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -387px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
    }
    .zj .btns>div:nth-of-type(1)>div:first-of-type>div>div{
        width: 20px;
        height: 18px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1622px;
    }
    .zj .btns>div:nth-of-type(1)>div:last-of-type{
        float: left;
        margin-left: -3px;
        width: 31px;
        height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1588px;
    }
    .zj .btns>div:nth-of-type(1)>div:last-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -40px -1588px;
    }
    .zj .btns>div:nth-of-type(2){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .zj .btns>div:nth-of-type(2):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .zj .btns>div:nth-of-type(2):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1063px;
    }
    .zj .btns>div:nth-of-type(2)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -977px;
    }
    .zj .btns>div:nth-of-type(3){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .zj .btns>div:nth-of-type(3):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .zj .btns>div:nth-of-type(3):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1268px;
    }
    .zj .btns>div:nth-of-type(3)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1225px;
    }
    .zj .btns>div:nth-of-type(4){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .zj .btns>div:nth-of-type(4):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .zj .btns>div:nth-of-type(4):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -2805px;
    }
    .zj .btns>div:nth-of-type(4)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -2761px;
    }

    .zj .btns>div:nth-of-type(5){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .zj .btns>div:nth-of-type(5):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .zj .btns>div:nth-of-type(5):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1508px;
    }
    .zj .btns>div:nth-of-type(5)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1465px;
    }
    .zj .bq{
        display: flex;
        align-items: center;
    }
    .zj .bq p{
        color: #666;
    }
    .zj .bq div{
        cursor: pointer;
        margin-right: 10px;
        padding-right: 10px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f) right -27px;
    }
    .zj .bq div:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f) right -1430px;
    }
    .zj .bq div:hover span{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f) 0 -1400px;
    }
    .zj .bq div span{
        color: #777;
        float: left;
        line-height: 22px;
        padding: 0 3px 0 13px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?308b57f1e3480a352608753e5f28d46f) 0 0;
    }
    .js p{
        width: 100%;
        margin-top: 4px;
        line-height: 24px;
        color: #666;
        white-space: pre-wrap;
        margin-left: 2em;
    }
    .js .hide{
        display: -webkit-box;
        /* -webkit-box-orient: vertical; */
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .js div span{
        float: right;
        display: flex;
        align-items: center;
        color: #0c73c2;
        cursor: pointer;
    }
    .js div span:hover{
        text-decoration: underline;
    }
    .js div span i{
        margin-left: 3px;
        width: 11px;
        height: 8px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -65px -520px;
    }
    .js div .zhedie i{
        background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -45px -520px;
    }
    .gqlb{
        margin-top: 27px;
    }
    .gqlb .tit{
        display: flex;
        justify-content: space-between;
        height: 33px;
        border-bottom: 2px solid #c20c0c;
    }
    .gqlb .tit>div{
        display: flex;
        align-items: center;
    }
    .gqlb .tit>div:first-of-type h3{
        font-size: 20px;
        font-weight: normal;
    }
    .gqlb .tit>div:first-of-type span{
        margin-left: 20px;
        color: #666;
    }
    .gqlb .tit>div div:first-of-type{
        margin-right: 20px;
        cursor: pointer;
        display: flex;
    }
    .gqlb .tit>div div:first-of-type i{
        width: 16px;
        height: 16px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -34px -863px;
    }
    .gqlb .tit>div div:first-of-type span{
        color: #4996d1;
        text-decoration: underline;
    }
    .gqlb .tit>div div:last-of-type{
        color: #666;
    }
    .gqlb .tit>div div:last-of-type span{
        color: #c20c0c;
        font-weight: bold;
    }
    table{
        width: 100%;
        border: 1px solid #d9d9d9;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
    }
    table th{
        height: 36px;
        background: url(https://s2.music.126.net/style/web2/img/table.png?362e4b963bfdcf99d0249a6dc7440d04) 0 0;
    }
    table th div{
        text-align: left;
        font-weight: normal;
        color: #666;
        padding: 8px 10px;
        background-position: 0 -56px;
        background: url(https://s2.music.126.net/style/web2/img/table.png?362e4b963bfdcf99d0249a6dc7440d04) 0 -56px no-repeat;
    }
    table th:first-of-type div{
        background: none;
    }
    table td{
        padding: 6px 10px;
    }
    table th:nth-of-type(1){
        width: 74px;
    }
    table th:nth-of-type(2){
        width: 237px;
    }
    table th:nth-of-type(3){
        width: 111px;
    }
    table th:nth-of-type(4){
        width: 89px;
    }
    table th:nth-of-type(5){
        width: 127px;
    }
    table td div{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    table td div p{
        white-space: nowrap;
    }
    table td div span em{
        font-style: normal;
        cursor: pointer;
    }
    table td div span i{
        font-style: normal;
    }
    table td div span em:hover{
        text-decoration: underline
    }
    table tbody tr:nth-of-type(2n+1){
        background-color: #f7f7f7;
    }
    table tr td:nth-of-type(2){
        cursor: pointer;
    }
    table tr td:nth-of-type(2):hover{
        text-decoration: underline;
    }
    .pl .r{
        width: 270px;
    }
</style>

