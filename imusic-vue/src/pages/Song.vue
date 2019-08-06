<template>
    <div class="song">
        <div class="l">
            <div class="dq" v-if="dq">
                <div class="ll">
                    <div><img :src="dq.al.picUrl" alt=""></div>
                    <div><i></i><span>生成外链播放器</span></div>
                </div>
                <div class="rr">
                    <div>
                        <div class="title">
                            <span></span>
                            <p :title="dq.name">{{dq.name}}</p>
                            <router-link :to="{path:'/fxyy/mv',query:{id:dq.mv}}" tag="i"  v-if="dq.mv"></router-link>
                        </div>
                        <div class="titles">
                            <span></span>
                            <p>{{dq.alia[0]}}</p>
                        </div>
                        <div class="user">
                            <p>歌手：<router-link :to="{path:'/fxyy/artist',query:{id:dq.ar[0].id}}" tag="span">{{dq.ar[0].name}}</router-link></p>
                            <p>所属专辑：<router-link :to="{path:'/fxyy/album',query:{id:dq.al.id}}" tag="span">{{dq.al.name}}</router-link></p>
                        </div>
                        <div class="btns">
                            <div>
                                <div v-on:click="play"><div><div></div>播放</div></div>
                                <div></div>
                            </div>
                            <div>
                                <div>收藏</div>
                            </div>
                            <div>
                                <div>分享</div>
                            </div>
                            <div>
                                <div v-on:click="download">下载</div>
                            </div>
                            <div>
                                <div v-if="pl">({{pl.total}})</div>
                            </div>
                        </div>
                        <div class="info">
                            <p v-if="hide" class="hide"><span v-for="(item,index) in lrc" :key="index">{{item}}<br/></span></p>
                            <p v-else><span v-for="(item,index) in lrc" :key="index">{{item}}<br/></span></p>
                            <div style="height:16px;"><span v-on:click="flag" :class="!hide?'zhedie':''">{{status}}<i></i></span></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="pl" v-if="pl">
                <div class="tit">
                    <div>
                        <h3>评论</h3>
                        <span>共{{pl.total}}条评论</span>
                    </div>
                </div>
                <div class="mine">
                    <div class="l">
                        <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
                    </div>
                    <div class="r">
                        <textarea placeholder="评论"></textarea>
                        <div><div class="ll"><span></span><span></span></div><div class="rr">评论</div></div>
                    </div>
                </div>
                <div class="other">
                    <div class="t">
                        <h3>精彩评论</h3>
                    </div>
                    <ul class="comments">
                        <li v-for="(item,index) in pl.hotComments" :key="index">
                            <div class="l">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="r">
                                <p><span>{{item.user.nickname}}</span>：{{item.content}}</p>
                                <h6 v-if="item.beReplied.length">
                                    <i><span>◆</span><span>◆</span></i>
                                    <p v-for="(a,b) in item.beReplied" :key="b"><span>{{a.user.nickname}}</span>：{{a.content}}</p>
                                </h6>
                                <div>
                                    <span>{{getDate(item.time)}}</span>
                                    <p><span><i></i>({{item.likedCount}})</span><span>|</span><span>回复</span></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="other">
                    <div class="t">
                        <h3>最新评论({{pl.total}})</h3>
                    </div>
                    <ul class="comments">
                        <li v-for="(item,index) in pl.comments" :key="index">
                            <div class="l">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="r">
                                <p><span>{{item.user.nickname}}</span>：{{item.content}}</p>
                                <h6 v-if="item.beReplied.length">
                                    <i><span>◆</span><span>◆</span></i>
                                    <p v-for="(a,b) in item.beReplied" :key="b"><span>{{a.user.nickname}}</span>：{{a.content}}</p>
                                </h6>
                                <div>
                                    <span>{{getDate(item.time)}}</span>
                                    <p><span><i></i>{{item.likedCount?'('+item.likedCount+')':''}}</span><span>|</span><span>回复</span></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="page">
                <span v-show="current_page>1" v-on:click="s">上一页</span>
                <span :class="current_page==1?'active_page':''" v-on:click="page(1)">1</span>
                <span v-show="current_page>=nums.length">...</span>
                <span  :class="current_page==item?'active_page':''" v-for="(item,index) in nums" :key="index" v-on:click="page(item)">{{item}}</span>
                <span v-show="current_page<=pages-4">...</span>
                <span :class="current_page==pages?'active_page':''" v-on:click="page(pages)">{{pages}}</span>
                <span v-show="current_page<pages" v-on:click="x">下一页</span>
            </div> -->
        </div>
        <div class="r">

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import saveAs from 'file-saver'
export default {
    name:'Song',
    data() {
        return {
            dq:null,
            lrc:'',
            hide:true,
            status:'展开',
            pl:null,
            url:'',
            current_page:1,//当前页
            pages:50,//总页数
            nums:[2,3,4,5,6],//显示页码
        }
    },
    methods: {
        flag:function(){
          if(this.hide){
              this.hide=false
              this.status='收起'
          }else{
              this.hide=true
              this.status='展开'
          }
        },
        getLrc:function(lrc){
            var lyrics = lrc.split("\n");//this.lrc代表歌词文件内容的引用
            var arr=[]
            for(var i=0;i<lyrics.length;i++){
                var lyric = decodeURIComponent(lyrics[i]);
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                var clause = lyric.replace(timeReg,'').replace(/^\s*/,"");
                arr.push(clause)
            }
            return arr;
        },
        getDate:function(value){
            let date = new Date(value);
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            return  h + ':' + m ;
        },
        play:function(){
            var that=this
            console.log(that.$store.state)
            var arr=[]
            that.$store.state.songInfo.map(function(item){
                arr.push(item.id)
            })
            console.log(arr.includes(that.dq.id))
            if(!arr.includes(that.dq.id)){
                // that.$store.dispatch('addSong',that.dq.id)
                that.$store.dispatch('getSongInfo',that.dq.id)
                // console.log(that)
            }
        },
        download:function(){
            var FileSaver = require('file-saver');
            FileSaver.saveAs(this.url,this.dq.name)
        },
        s:function(){
            this.current_page--
            if(this.current_page>4&&this.current_page<this.pages-2){
                this.nums=[this.current_page-2,this.current_page-1,this.current_page,this.current_page+1,this.current_page+2]
            }
            if(this.current_page<=4){
                this.nums=[2,3,4,5,6]
            }
            if(this.current_page>=this.pages-2){
                this.nums=[this.pages-5,this.pages-4,this.pages-3,this.pages-2,this.pages-1,]
            }
        },
        x:function(){
            this.current_page++
            if(this.current_page>4&&this.current_page<this.pages-2){
                this.nums=[this.current_page-2,this.current_page-1,this.current_page,this.current_page+1,this.current_page+2]
            }
            if(this.current_page<=4){
                this.nums=[2,3,4,5,6]
            }
            if(this.current_page>=this.pages-2){
                this.nums=[this.pages-5,this.pages-4,this.pages-3,this.pages-2,this.pages-1,]
            }
        },
        page:function(value){
            this.current_page=value
            if(this.current_page>4&&this.current_page<this.pages-2){
                this.nums=[this.current_page-2,this.current_page-1,this.current_page,this.current_page+1,this.current_page+2]
            }
            if(this.current_page<=4){
                this.nums=[2,3,4,5,6]
            }
            if(this.current_page>=this.pages-2){
                this.nums=[this.pages-5,this.pages-4,this.pages-3,this.pages-2,this.pages-1,]
            }
        },
        init:function(){
            var that=this
            // console.log(that.$route.query.id)
            //获取歌曲地址
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/url?id='+that.$route.query.id+'&isRedirect=0'
            }).then(function(res){
                // console.log(res.data.data)
                that.url=res.data.data
            }).catch(function(error){
                
            })
            //歌曲信息
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/song?id='+that.$route.query.id
            }).then(function(res){
                console.log(res.data.data)
                that.dq=res.data.data.songs[0]
            }).catch(function(error){
                
            })
            //歌词
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/lrc?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data)
                that.lrc=that.getLrc(res.data)
            }).catch(function(error){
                
            })
            //评论
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/comment/song?id='+that.$route.query.id
            }).then(function(res){
                // console.log(res.data.data)
                that.pl=res.data.data
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
    .song{
        width: 980px;
        margin: 0 auto;
        min-height: 700px;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url(https://s2.music.126.net/style/web2/img/frame/wrap4.png?4d25030810c5d0d086b484afc0560cf9) center 0 repeat-y;
        display: flex;
    }
    .song>.l{
        width: 709px;
        padding: 47px 30px 40px 39px;
        box-sizing: border-box;
    }
    .song>.l .dq{
        display: flex;
        justify-content: space-between;
    }
    .song>.l .dq .ll{
        width: 206px;
        height: 234px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .song>.l .dq .ll>div:first-of-type{
        width: 206px;
        height: 205px;
        background: url(https://s2.music.126.net/style/web2/img/coverall.png?cbead7ee60023a8c3c34c0dfc47f18b4) -140px -580px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .song>.l .dq .ll>div:first-of-type img{
        width: 130px;
        height: 130px;
        border-radius: 50%;
    }
    .song>.l .dq .ll>div:last-of-type{
        display: flex;
    }
    .song>.l .dq .ll>div:last-of-type i{
        width: 16px;
        height: 16px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?6ad9c27cb67fb8b78028bbda54dbaf0c) -34px -863px;
    }
    .song>.l .dq .ll>div:last-of-type span{
        text-decoration: underline;
        cursor: pointer;
        color: #0c73c2;
    }
    .song>.l .dq .rr{
        width: 414px;
    }

    .dq .title{
        height: auto;
        display: flex;
        align-items: center;
    }
    .dq .title span{
        width: 54px;
        height: 24px;
        position: relative;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?ab4b4974b299de9965c980118e1c8196) 0 -463px;
    }
    .dq .title p{
        margin-left: 10px;
        line-height: 24px;
        font-size: 24px;
        color: #333;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .dq .title i{
        cursor: pointer;
        width: 21px;
        height: 18px;
        margin-left: 10px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) 0 -18px;
    }
    .dq .titles{
        display: flex;
        justify-content: space-between;
    }
     .dq .title span{
        width: 54px;
        height: 24px;
    }
    .dq .titles p{
        width: 346px;
        line-height: 24px;
        font-size: 14px;
        color: #bababa;
        font-weight: normal
    }
    .dq .user p{
        margin: 10px 0;
        color: #999;
    }
    .dq .user p span{
        color: #0c73c2;
        cursor: pointer;
    }
    .dq .user p span:hover{
        text-decoration: underline;
    }
    .dq .btns{
        height: 31px;
        margin-bottom: 25px;
        display: flex;
    }
    .dq .btns>div{
        margin-right: 5px;
    }
    .dq .btns>div{
        cursor: pointer;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type{
        float: left;
        width: 61px;
        height: 31px;
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -428px;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -510px;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type:hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -469px;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type:hover >div>div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -28px -1622px;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type>div{
        width: 46px;
        height: 31px;
        padding: 0 7px 0 8px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -387px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
    }
    .dq .btns>div:nth-of-type(1)>div:first-of-type>div>div{
        width: 20px;
        height: 18px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1622px;
    }
    .dq .btns>div:nth-of-type(1)>div:last-of-type{
        float: left;
        margin-left: -3px;
        width: 31px;
        height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1588px;
    }
    .dq .btns>div:nth-of-type(1)>div:last-of-type:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) -40px -1588px;
    }
    .dq .btns>div:nth-of-type(2){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .dq .btns>div:nth-of-type(2):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .dq .btns>div:nth-of-type(2):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1063px;
    }
    .dq .btns>div:nth-of-type(2)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -977px;
    }
    .dq .btns>div:nth-of-type(3){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .dq .btns>div:nth-of-type(3):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .gd .btns>div:nth-of-type(3):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1268px;
    }
    .dq .btns>div:nth-of-type(3)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1225px;
    }
    .dq .btns>div:nth-of-type(4){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .dq .btns>div:nth-of-type(4):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .dq .btns>div:nth-of-type(4):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -2805px;
    }
    .dq .btns>div:nth-of-type(4)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -2761px;
    }

    .dq .btns>div:nth-of-type(5){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .dq .btns>div:nth-of-type(5):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .dq .btns>div:nth-of-type(5):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1508px;
    }
    .dq .btns>div:nth-of-type(5)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1465px;
    }
    
    .dq .info p{
        width: 100%;
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        white-space: pre-wrap;
    }
    .dq .info .hide{
        display: -webkit-box;
        /* -webkit-box-orient: vertical; */
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 13;
        overflow: hidden;
    }
    .dq .info div span{
        float: right;
        display: flex;
        align-items: center;
        color: #0c73c2;
        cursor: pointer;
    }
    .dq .info div span:hover{
        text-decoration: underline;
    }
    .dq .info div span i{
        margin-left: 3px;
        width: 11px;
        height: 8px;
        background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -65px -520px;
    }
    .dq .info div .zhedie i{
        background: url(https://s2.music.126.net/style/web2/img/icon.png?f0bc7856c4ef1af8322a7445ac7584d2) -45px -520px;
    }
    .tit{
        display: flex;
        justify-content: space-between;
        height: 33px;
        border-bottom: 2px solid #c20c0c;
    }
    .tit>div{
        display: flex;
        align-items: center;
    }
    .tit>div:first-of-type h3{
        font-size: 20px;
        font-weight: normal;
    }
    .tit>div:first-of-type span{
        margin-left: 20px;
        color: #666;
    }
    .mine{
        margin : 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .mine .l{
        width: 50px;
        height: 50px;
    }
    .mine .r{
        width: 578px;
        height: 98px;
    }
    .mine .r textarea{
        padding: 5px 6px 6px;
        width: 564px;
        height: 50px;
        resize: none;
        overflow: auto;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        line-height: 19px;
    }
    .mine .r>div{
        height: 25px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .mine .r .ll{
        display: flex;
    }
    .mine .r .ll span{
        width: 18px;
        height: 18px;
        margin-right: 10px;
        cursor: pointer;
    }
    .mine .r .ll span:nth-of-type(1){
        background: url(https://s2.music.126.net/style/web2/img/icon.png?6ad9c27cb67fb8b78028bbda54dbaf0c) -40px -490px;
    }
    .mine .r .ll span:nth-of-type(2){
        background: url(https://s2.music.126.net/style/web2/img/icon.png?6ad9c27cb67fb8b78028bbda54dbaf0c) -60px -490px;
    }
    .mine .r .rr{
        width: 46px;
        height: 25px;
        color: #fff;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        background: url(https://s2.music.126.net/style/web2/img/button.png?4142e23305b59357038bba215c281e00) -84px -64px;  
    }
    .mine .r .rr:hover{
        background: url(https://s2.music.126.net/style/web2/img/button.png?4142e23305b59357038bba215c281e00) -84px -94px;  
    }
    .other{
        margin-bottom: 20px;
    }
    .other h3{
        font-size: 12px;
        height: 20px;
        border-bottom: 1px solid #cfcfcf;
    }
    .other li{
        padding: 15px 0;
        border-top: 1px dotted #ccc;
        display: flex;
        justify-content: space-between;
    }
    .other li:first-of-type{
        border: none;
    }
    .other li .l{
        width: 50px;
        height: 50px;
    }
    .other li .r{
        width: 580px;
    }
    .other li .r>p{
        line-height: 20px;
    }
    .other li .r>p span{
        color: #0c73c2;
        margin-right: 5px;
        cursor: pointer;
    }
    .other li .r>p span:hover{
        text-decoration: underline;
    }
    .other li .r>div{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }
    .other li .r>div>span{
        color: #999;
    }
    .other li .r>div>p{
        display: flex;
    }
    .other li .r>div>p span:nth-of-type(1){
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #333;
    }
    .other li .r>div>p span:nth-of-type(1):hover{
        text-decoration: underline;
    }
    .other li .r>div>p span:nth-of-type(1) i{
        width: 15px;
        height: 14px;
        margin: -4px 5px 0 0;
        background: url(https://s2.music.126.net/style/web2/img/icon2.png?9d99cce28b73740869907f423ad2c9ab) -150px 0;
    }
    .other li .r>div>p span:nth-of-type(2){
        margin: 0 8px;
        color: #ccc;
    }
    .other li .r>div>p span:nth-of-type(3){
        color: #666;
        cursor: pointer;
    }
    .other li .r>div>p span:nth-of-type(3):hover{
        text-decoration: underline;
    }
    .other h6{
        padding: 8px 19px;
        margin-top: 10px;
        line-height: 20px;
        background: #f4f4f4;
        border: 1px solid #dedede;
        position: relative;
        font-weight: normal;
    }
    .other h6 i{
        position: absolute;
        top: -7px;
        left: 20px;
        font-size: 12px;
        line-height: 14px;
        font-style: normal;
        display: flex;
        flex-direction: column;
    }
    .other h6 i span{
        position: absolute;
    }
    .other h6 i span:first-of-type{
        color: #dedede;
    }
    .other h6 i span:last-of-type{
        top: 1px;
        color: #f4f4f4;
    }
    .other h6 p span{
        cursor: pointer;
        color: #0c73c2;
        margin-right: 5px;
    }
    .other h6 p span:hover{
        text-decoration: underline;
    }
    .page .active_page{
        background: orange;
    }
</style>

