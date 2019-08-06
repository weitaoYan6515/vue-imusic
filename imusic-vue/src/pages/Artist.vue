<template>
    <div class="artist">
        <div class="l">
            <div class="info">
                <h1 v-if="name">{{name}}</h1>
                <div :style="'background:url('+imgUrl+') center center no-repeat'">
                    <div></div>
                    <div></div>
                </div>
            </div>
            <nav>
                <div class="gq" :class="index==1?'active':''" v-on:click='tab(1)'><span><em>热门作品</em></span></div>
                <div class="zj" :class="index==2?'active':''" v-on:click='tab(2)'><span><em>所有专辑</em></span></div>
                <div class="mv" :class="index==3?'active':''" v-on:click='tab(3)'><span><em>相关MV</em></span></div>
                <div class="xx" :class="index==4?'active':''" v-on:click='tab(4)'><span><em>艺人介绍</em></span></div>
            </nav>
            <div v-show="index==1" class="other1">
                <div class="btns">
                    <div class="l">
                        <div>
                            <div><div v-on:click="play"><div></div>播放</div></div>
                            <div></div>
                        </div>
                        <div>
                            <div>收藏热门{{gq.length}}</div>
                        </div>
                    </div>
                    <div class="r">
                        <div>
                            <i>
                                <em>热门单曲</em>
                                <em></em>
                            </i>
                            <ul>
                                <li>热门单曲</li>
                                <li>作词作品</li>
                                <li>作曲作品</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <table>
                                <!-- <router-link :to="{path:'/fxyy/song',query:{id:item.id}}" :title="item.name" tag="div">{{item.name}}</router-link> -->

                    <tr v-for="(item,index) in gq" :key="index"><td><div>{{index+1}}</div></td><td><router-link :to="{path:'/fxyy/song',query:{id:item.id}}" :title="item.name" tag="div">{{item.name}}</router-link></td><td><div>{{formatDate2(item.dt)}}</div></td><td><router-link :to="{path:'/fxyy/album',query:{id:item.al.id}}" :title="item.al.name" tag="div">{{item.al.name}}</router-link></td></tr>
                </table>
            </div>
            <div v-show="index==2" class="other2">
                <div v-for="(item,index) in zj" :key="index">
                    <div>
                        <router-link :to="{path:'/fxyy/album',query:{id:item.id}}" :title="item.name" tag="div">
                            <img :src="item.blurPicUrl" alt="">
                            <span></span>
                        </router-link>
                    </div>
                    <router-link :to="{path:'/fxyy/album',query:{id:item.id}}" :title="item.name" tag="p">{{item.name}}</router-link>
                    <p>{{formatDate1(item.publishTime)}}</p>
                </div>
            </div>
            <div v-show="index==3" class="other3">
                <div v-for="(item,index) in mv" :key="index">
                    <div>
                         <router-link :to="{path:'/fxyy/mv',query:{id:item.id}}" :title="item.name" tag="div">
                            <img :src="item.imgurl" alt="">
                            <span></span>
                         </router-link>
                    </div>
                    <router-link :to="{path:'/fxyy/mv',query:{id:item.id}}" :title="item.name" tag="p">{{item.name}}</router-link>
                </div>
            </div>
            <div v-show="index==4" class="other4">
                <div class="brief">
                    <h3>
                        <i></i>
                        <span>{{name}}简介</span>
                    </h3>
                    <p>{{xx.briefDesc}}</p>
                </div>
                <div class="intro" v-for="(item,index) in xx.introduction" :key="index">
                    <h3><span>{{item.ti}}</span></h3>
                    <p>{{item.txt}}</p>
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
    name:'Artist',
    data() {
        return {
            index:1,
            name:'',
            imgUrl:'',
            gq:[],
            zj:[],
            mv:[],
            xx:[]
        }
    },
    methods: {
        tab:function(value){
            this.index=value
        },
        formatDate1: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
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
        play: function() {
            console.log(this.gq)
            var that = this;
            var arr=[]
            var arr1=[]
            that.gq.map(function(item){
                arr1.push(item.id)
            })
            var arr2=that.$store.state.songList
            arr=arr1.filter(items => {
                if (!arr2.includes(items)) return items;
            })
            arr.map(function(item){
                that.$store.dispatch('addSong',item)
                that.$store.dispatch('getSongUrl',item)
                that.$store.dispatch('getSongInfo',item)
            })
        },
        init:function(){
            var that=this
            // console.log(that.$route.query.id)
            //歌手歌曲
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/song/artist?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.gq=res.data.data
            }).catch(function(error){
                
            })
            //歌手专辑
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/album/artist?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.zj=res.data.data
                that.imgUrl=res.data.data[0].artist.picUrl
                that.name=res.data.data[0].artist.name
            }).catch(function(error){
                
            })
            //歌手MV
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/mv/artist?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.mv=res.data.data
            }).catch(function(error){
                
            })
            //歌手信息
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/artist/info?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.xx=res.data.data
            }).catch(function(error){
                
            })
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
    .artist{
        width: 980px;
        margin: 0 auto;
        min-height: 700px;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url(https://s2.music.126.net/style/web2/img/frame/wrap4.png?4d25030810c5d0d086b484afc0560cf9) center 0 repeat-y;
        display: flex;
    }
    .artist>.l{
        width: 709px;
        padding: 47px 30px 40px 39px;
        box-sizing: border-box;
    }
    .info h1{
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
        color: #333;
    }
    .info>div{
        position: relative;
        height: 300px;
    }
    .info>div div{
        position: absolute;
        height: 32px;
        bottom: 18px;
        cursor: pointer;
    }
    .info>div div:first-of-type{
        width: 96px;
        right: 116px;
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?d4b845275fe7a7f1f4359cbbe04cc345) 0 -1156px;
    }
    .info>div div:first-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?d4b845275fe7a7f1f4359cbbe04cc345) 0 -1196px;
    }
    .info>div div:last-of-type{
        width: 76px;
        right: 20px;
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?d4b845275fe7a7f1f4359cbbe04cc345) 0 -500px;
    }
    .info>div div:last-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?d4b845275fe7a7f1f4359cbbe04cc345) 0 -540px;
    }
    .l nav{
        height: 38px;
        border: 1px solid #ccc;
        border-width: 0 1px;
        background: url(https://s2.music.126.net/style/web2/img/tab.png?7fb5a70fdbe7bf10d9dcc89477cb801c) 0 -1px repeat-x;
        display: flex;
    }
    .l nav div{
        position: relative;
        left: -1px;
    }
    .l nav div span{
        display: block;
        padding-left: 1px;
        height: 100%;
    }
    .l nav div.active span{
        background: url(https://s2.music.126.net/style/web2/img/tab.png?7fb5a70fdbe7bf10d9dcc89477cb801c) left -90px;
    }
    .l nav div span em{
        display: block;
        font-style: normal;
        height: 35px;
        width: 134px;
        padding: 2px 2px 0 0;
        line-height: 36px;
        cursor: pointer;
        text-align: center;
    }
    .l nav div.active span em{
        background: url(https://s2.music.126.net/style/web2/img/tab.png?7fb5a70fdbe7bf10d9dcc89477cb801c) right -90px;
    }
    
    .l nav div:not(.active):hover span em{
        background: url(https://s2.music.126.net/style/web2/img/tab.png?7fb5a70fdbe7bf10d9dcc89477cb801c) right -45px;
    }
    .other1>.btns{
        display: flex;
        justify-content: space-between;
        margin: 20px 0 15px 0;
    }
    .other1>.btns .l{
        display: flex;
    }
    .other1>.btns .l>div:hover{
        cursor: pointer;
    }
    .other1>.btns .l>div:first-of-type{
        margin-right: 5px;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type{
        float: left;
        width: 61px;
        height: 31px;
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) right -428px;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type>div{
        width: 46px;
        height: 31px;
        padding: 0 7px 0 8px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) 0 -387px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) right -510px;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type:hover>div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -469px;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type:hover>div>div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -28px -1622px;
    }
    .other1>.btns .l>div:first-of-type>div:first-of-type>div>div{
        width: 20px;
        height: 18px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) 0 -1622px;
    }
    .other1>.btns .l>div:first-of-type>div:last-of-type{
        float: left;
        margin-left: -3px;
        width: 31px;
        height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) 0 -1588px;
    }
    .other1>.btns .l>div:first-of-type>div:last-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c546…) -40px -1588px;
    }
    .other1 .btns .l>div:nth-of-type(2){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .other1 .btns .l>div:nth-of-type(2):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .other1 .btns .l>div:nth-of-type(2):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1063px;
    }
    .other1 .btns .l>div:nth-of-type(2)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -977px;
    }
    .other1 .btns .r{
        width: 102px;
        height: 31px;
    }
    .other1 .btns .r div{
        cursor: pointer;
        position: relative;
        width: 97px;
        height:31px;
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?9ff2886ffc93fa0666d18e1cdf17ead8) right -100px;
    }
    .other1 .btns .r div:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?9ff2886ffc93fa0666d18e1cdf17ead8) right -182px;
    }
    .other1 .btns .r div i{
        font-style: normal;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 62px;
        height: 31px;
        line-height: 31px;
        padding: 0 15px 0 20px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?9ff2886ffc93fa0666d18e1cdf17ead8) 0 -59px;
    }
    .other1 .btns .r div i:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -141px;
    }
    .other1 .btns .r div i em{
        font-style: normal;
    }
    .other1 .btns .r div i em:last-of-type{
        width: 8px;
        height: 5px;
        background: url(https://s2.music.126.net/style/web2/img/icon3.png?eed3e4107171bcdeba1641d4b67d6702);
    }
    .other1 .btns .r div ul{
        display: none;
        position: absolute;
        width: 100px;
        height: 93px;
        margin-top: -2px;
        line-height: 30px;
        border: solid 1px #c3c3c3;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
        background-color: #fff;
    }
    .other1 .btns .r div:hover ul{
        display: block;
    }
    .other1 .btns .r div ul li{
        width: 80px;
        height: 30px;;
        padding-left: 20px;
        border-bottom: solid 1px rgba(0,0,0,0.1);
    }
    .other1 table{
        border-collapse: collapse;
        border-spacing: 0;
    }
    .other1 table td{
        padding: 6px 10px;
        height:18px;
    }
    .other1 table tr:nth-of-type(2n+1) td{
        background: #f7f7f7;
    }
    .other1 table tr td:nth-of-type(1) div{
        width: 74px;
    }
    .other1 table tr td:nth-of-type(2) div{
        width: 309px;
    }
    .other1 table tr td:nth-of-type(3) div{
        width: 69px;
    }
    .other1 table tr td:nth-of-type(4) div{
        width: 108px;
    }
    .other1 table td div{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other1 table tr td:nth-of-type(1){
        color: #999;
    }
    .other1 table tr td:nth-of-type(3) div{
        color: #666;
    }
    .other1 table tr td:nth-of-type(2n) div:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    .other2{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .other2>div{
        width: 25%;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .other2>div>div{
        width: 145px;
        cursor: pointer;
        background: url(https://s2.music.126.net/style/web2/img/coverall.png?cbead7ee60023a8c3c34c0dfc47f18b4) -170px -850px;
    }
    .other2>div>p{
        width: 145px;
    }
    .other2>div>p:first-of-type{
        margin: 8px 0 3px;
        font-size: 14px;
        cursor: pointer;
    }
    .other2>div>p:last-of-type{
        color: #666;
    }
    .other2>div>p:first-of-type:hover{
        text-decoration: underline;
    }
    .other2>div>div>div{
        width: 120px;
        position: relative;
    }
    .other2>div>div>div span{
        display: none;
        position: absolute;
        width: 28px;
        height: 28px;
        right: 10px;
        bottom: 5px;
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?569ef90914956ffd2db27f8ad548f914) 0 -140px;
    }
    .other2>div>div:hover span{
        display: block;
    }
    .other2>div>div>div span:hover{
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?569ef90914956ffd2db27f8ad548f914) 0 -170px;
    }
    .other3{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
    }
    .other3>div{
        width: 25%;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .other3>div>div{
        width: 137px;
        cursor: pointer;
    }
    .other3>div>p{
        width: 137px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 8px 0 3px;
        font-size: 14px;
        cursor: pointer;
    }
    .other3>div>p:hover{
        text-decoration: underline;
    }
    .other3>div>div>div{
        width: 137px;
        position: relative;
    }
    .other3>div>div>div span{
        position: absolute;
        width: 44px;
        height: 44px;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?569ef90914956ffd2db27f8ad548f914) -30px -135px;
    }
    .other3>div>div>div span:hover{
        background: url(https://s2.music.126.net/style/web2/img/iconall.png?569ef90914956ffd2db27f8ad548f914) -30px -85px;
    }
    .other4 h3{
        margin: 28px 0 8px;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    .other4 .brief h3 i{
        width: 3px;
        height: 14px;
        background: #c10d0c;
    }
    .other4 .brief h3 span{
        margin-left: 7px;
    }
    .other4 .brief p{
        text-indent: 2em;
        line-height: 25px;
        color: #666;
    }
    .other4 .intro p{
        white-space:pre-wrap;
        line-height: 25px;
        color: #666;
    }
</style>
