<template>
    <div class="mv">
        <div class="l">
            <div class="info">
                <h1 v-if="mv"><i :title="mv.name"></i><p :title="mv.name">{{mv.name}}</p><router-link :to="{path:'/fxyy/artist',query:{id:mv.artists[0].id}}" tag="span">{{mv.artistName}}</router-link></h1>
                <div class="video">
                   <video :src="mvUrl" controls autoplay></video> 
                   <span></span>
                </div>
            </div>
            <div class="btns">
                <div>
                    <div><i></i>赞</div>
                </div>
                <div>
                    <div>+</div>
                </div>
                <div>
                    <div>分享</div>
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
                                <div>
                                    <span>{{getDate(item.time)}}</span>
                                    <p><span><i></i>{{item.likedCount?'('+item.likedCount+')':''}}</span><span>|</span><span>回复</span></p>
                                </div>
                            </div>
                        </li>
                    </ul>
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
    name:'Mv',
    data() {
        return {
            mvUrl:'',
            mv:null,
            pl:null,
        }
    },
    methods: {
        getDate:function(value){
            let date = new Date(value);
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            return  h + ':' + m ;
        },
        init:function(){
            var that=this
            console.log(that.$route.query.id)
            //mv地址
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/mvUrl?id='+that.$route.query.id+'&isRedirect=0'
            }).then(function(res){
                console.log(res.data.data)
                that.mvUrl=res.data.data
            }).catch(function(error){
                
            })
            //mv信息
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/mv?id='+that.$route.query.id
            }).then(function(res){
                console.log(res.data.data.data)
                that.mv=res.data.data.data
            }).catch(function(error){
                
            })
            //评论
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/comment/mv?id='+that.$route.query.id
            }).then(function(res){
                console.log(res.data.data)
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
    .mv{
        width: 980px;
        margin: 0 auto;
        min-height: 700px;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url(https://s2.music.126.net/style/web2/img/frame/wrap4.png?4d25030810c5d0d086b484afc0560cf9) center 0 repeat-y;
        display: flex;
    }
    .mv>.l{
        width: 709px;
        padding: 47px 30px 40px 39px;
        box-sizing: border-box;
    }
    .mv h1{
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
        color: #333;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .mv h1 i{
        width: 29px;
        height: 18px;
        margin-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/icon2.png?086242b4f3f017f36b5c635619f0e4f8) -230px -480px;
    }
    .mv h1 p{
        width: 500px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .mv h1 span{
        font-size: 12px;
        margin : 10px 0 0 8px;
        color: #0c73c2;
        cursor: pointer;
    }
    .mv h1 span:hover{
        text-decoration: underline;
    }
    .mv .video{
        width: 640px;
        height: 360px;
    }
    .mv video{
        width: 100%;
        height: 100%;
    }
    .mv .btns{
        height: 31px;
        margin: 12px 0 45px;
        display: flex;
    }
    .mv .btns>div{
        margin-right: 10px;
    }
    .mv .btns>div{
        cursor: pointer;
    }
    .mv .btns>div:nth-of-type(1){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -100px;
    }
    .mv .btns>div:nth-of-type(1):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -182px;
    }
    .mv .btns>div:nth-of-type(1)>div{
        height: 100%;
        display: flex;
        line-height: 31px;
        padding: 0 5px 0 10px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -59px;
    }
    .mv .btns>div:nth-of-type(1)>div:hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -141px;
    }
    .mv .btns>div:nth-of-type(1)>div i{
        width: 17px;
        height: 15px;
        margin: 8px 6px 0 0;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -95px;
    }
    .mv .btns>div:nth-of-type(2){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .mv .btns>div:nth-of-type(2):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .mv .btns>div:nth-of-type(2):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1063px;
    }
    .mv .btns>div:nth-of-type(2)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -977px;
    }
    .mv .btns>div:nth-of-type(3){
        padding-right: 5px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1020px;
    }
    .mv .btns>div:nth-of-type(3):hover{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) right -1106px;
    }
    .mv .btns>div:nth-of-type(3):hover >div{
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1268px;
    }
    .mv .btns>div:nth-of-type(3)>div{
        padding-right: 2px;
        padding-left: 28px;
        line-height: 31px;
        background: url(https://s2.music.126.net/style/web2/img/button2.png?f24c5467ce25cee88722018c3c30d7c7) 0 -1225px;
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
</style>

