<template>
  <div class="index">
    <header>
      <div>
        <div class="c">
          <div class="l">
            <div class="logo"></div>
            <ul class="headerNav">
              <router-link to="/fxyy" tag="li"><p>发现音乐</p><sub></sub></router-link>
              <router-link to="/wdyy" tag="li"><p>我的音乐</p><sub></sub></router-link>
              <router-link to="/py" tag="li"><p>朋友</p><sub></sub></router-link>
              <router-link to="/sc" tag="li"><p>商城</p><sub></sub></router-link>
              <router-link to="/yyr" tag="li"><p>音乐人</p><sub></sub></router-link>
              <router-link to="/xzkhd" tag="li"><p>下载客户端</p><sub></sub><sup></sup></router-link>
            </ul>
          </div>
          <div class="r">
            <div class="search">
              <span></span>
              <input type="text" placeholder="音乐/视频/电台/用户" v-model="ipt" v-on:input="search"  v-on:click.stop="searchIsShow=true">
              <div class="searchWrap" v-show="(songs.length||artist.length||album.length||mv.length||playList.length||user.length)&&searchIsShow" v-on:click.stop="searchIsShow=true">
                <p><span>搜“{{ipt}}”相关</span>&ensp;&gt;</p>
                <div class="serachW" v-if="songs">
                  <h3><i class="dqIcon"></i>单曲</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/fxyy/song',query:{id:item.id}}" tag="li" v-for="(item,index) in songs" :key="index" v-on:click.stop="searchIsShow=false" :title="item.name+'-'+item.singer"><p>{{item.name}}-{{item.singer}}</p></router-link>
                    </ul>
                  </div>
                </div>
                <div class="serachW" v-if="artist">
                  <h3><i class="gsIcon"></i>歌手</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/fxyy/artist',query:{id:item.id}}" tag="li" v-for="(item,index) in artist" :key="index" v-on:click.stop="searchIsShow=false" ><p>{{item.name}}</p></router-link>
                    </ul>
                  </div>
                </div>
                <div class="serachW" v-if="album">
                  <h3><i class="zjIcon"></i>专辑</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/fxyy/album',query:{id:item.id}}" tag="li" v-for="(item,index) in album" :key="index" v-on:click.stop="searchIsShow=false"><p>{{item.name}}-{{item.artist.name}}</p></router-link>
                    </ul>
                  </div>
                </div>
                <div class="serachW" v-if="mv">
                  <h3><i class="mvIcon"></i>mv</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/fxyy/mv',query:{id:item.id}}" tag="li" v-for="(item,index) in mv" :key="index" v-on:click.stop="searchIsShow=false" :title="item.name"><p>{{item.name}}-{{item.artistName}}</p></router-link>
                    </ul>
                  </div>
                </div>
                <div class="serachW" v-if="playList">
                  <h3><i class="gdIcon"></i>歌单</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/fxyy/playlist',query:{id:item.id}}" tag="li" v-for="(item,index) in playList" :key="index" v-on:click.stop="searchIsShow=false" :title="item.name"><p>{{item.name}}</p></router-link>
                    </ul>
                  </div>
                </div>
                <div class="serachW" v-if="user">
                  <h3><i class="yhIcon"></i>用户</h3>
                  <div>
                    <ul class="searchN">
                      <router-link :to="{path:'/user',query:{id:item.userId,num:index}}" tag="li" v-for="(item,index) in user" :key="index" v-on:click.stop="searchIsShow=false" :title="item.nickname"><p>{{item.nickname}}</p></router-link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="czzzx">创作者中心</div>
            <div class="login">
              <div>
                <div><p>登录</p><span></span></div>
                <div class="list">
                  <span></span>
                  <ul>
                    <li><span></span><p>手机号登录</p></li>
                    <li><span></span><p>微信登录</p></li>
                    <li><span></span><p>QQ登录</p></li>
                    <li><span></span><p>新浪微博登录</p></li>
                    <li><span></span><p>网易邮箱账号登录</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="bottom">
        <div class="bottom-c">
          <div class="l">
            <p>
              <a href="">服务条款</a><span>|</span><a href="">隐私政策</a><span>|</span><a href="">版权投诉指引</a><span>|</span><a href="">意见反馈</a><span>|</span>
            </p>
            <p>网易公司版权所有©1997-2019杭州乐读科技有限公司运营：<a href="">浙网文[2018]3506-263号</a></p>
            <p>违法和不良信息举报电话：0571-89853516 举报邮箱：<a href="">ncm5990@163.com</a></p>
          </div>
          <div class="r">
            <div>
              <a href=""></a>
              <span></span>
            </div>
            <div>
              <a href=""></a>
              <span></span>
            </div>
            <div>
              <a href=""></a>
              <span></span>
            </div>
            <div>
              <a href=""></a>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div :class="lock?'unlock playbar':'lock playbar'" >
        <audio id="audio" :src="this.$store.state.songUrl.length?this.$store.state.songUrl[index].url:''" autoplay v-on:ended="isEnded" v-on:error="isError"></audio>
        <div class="updn">
          <span :class="lock?'updn-unlock':'updn-lock'" v-on:click="isLock"></span>
        </div>
        <div class="open" ></div>
        <div class="right"></div>
        <div class="bg"></div>
        <div class="wrap">
            <div>
              <div class="btns">
                <span v-on:click="shang"></span>
                <span v-on:click="play" :class="isPlay?'isPlay':''"></span>
                <span v-on:click="xia"></span>
              </div>
              <div class="head">
                <img :src="this.$store.state.songInfo.length?this.$store.state.songInfo[index].al.picUrl:''">
              </div>
              <div class="play">
                
                <div class="play_info">
                  <router-link :to="{path:'/fxyy/song',query:{id:this.$store.state.songInfo.length?this.$store.state.songInfo[index].id:''}}" tag="span">{{this.$store.state.songInfo.length?this.$store.state.songInfo[index].name:''}}</router-link>
                  <router-link :to="{path:'/fxyy/artist',query:{id:this.$store.state.songInfo.length?this.$store.state.songInfo[index].ar[0].id:''}}" tag="span">{{this.$store.state.songInfo.length?this.$store.state.songInfo[index].ar[0].name:''}}</router-link>
                </div>
                <div class="play_jindu">
                  <div class="jindu">
                    <div><span></span></div>
                  </div>
                  <p class="time"><span>00:00</span>/<span>{{this.$store.state.songInfo.length?formatDate2(this.$store.state.songInfo[index].dt):'00:00'}}</span></p>
                </div>
              </div>
              <div class="oper">
                <span></span>
                <span></span>
              </div>
              <div class="crtl">
                <div v-show="crtl_isShow">
                  <div><div><span></span></div></div>
                </div>
                <span v-on:click="crtl"></span>
                <span></span>
                <span><em v-on:click.stop="listWrap">{{this.$store.state.songInfo.length}}</em><i v-show="isAdd">已开始播放</i></span>
              </div>
            </div>
        </div>
        <div class="lists" v-show="list_isShow" v-on:click.stop="list_isShow=true">
          <div class="listsHead">
            <div class="listsHeadC">
              <h3>播放列表({{this.$store.state.songInfo.length}})</h3>
              <div class="clear" v-on:click="clear"><span></span>清除</div>
              <div class="colse" v-on:click.stop="list_isShow=false"></div>
            </div>
          </div>
          <div class="listsBody">
            <img :src="this.$store.state.songInfo.length?this.$store.state.songInfo[index].al.picUrl:''" alt="">
            <div class="listsBodyL">
              <ul v-if="this.$store.state.songInfo.length">
                <li v-for="(a,b) in this.$store.state.songInfo" :key="b" :class="index==b?'on':''" v-on:click="select(b)"><div></div><div><span>{{a.name}}</span></div><div></div><div><span v-for="(m,n) in a.ar" :key="n" :title="getDate(a.ar)"><em>{{m.name}}</em><i v-if="n!=a.ar.length-1">/</i></span></div><div>{{formatDate2(a.dt)}}</div><div v-on:click.stop="del(b)"></div></li>
              </ul>
            </div>
            <div class="listsBodyR">
              有空再搞歌词滚动
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      index:0,
      ipt:'',
      timer:null,
      searchIsShow:true,
      songs:[],
      artist:[],
      album:[],
      mv:[],
      playList:[],
      user:[],
      lock:true,
      crtl_isShow:false,
      isPlay:true,
      list_isShow:false,
      isAdd:false,
      isAdd_Timer:null,
    }
  },
  methods: {
    isLock:function(){
      if(this.lock){
        this.lock=false
      }else{
        this.lock=true
      }
    },
    crtl:function(){
      if(this.crtl_isShow){
        this.crtl_isShow=false
      }else{
        this.crtl_isShow=true
      }
    },
    listWrap:function(){
      if(this.list_isShow){
        this.list_isShow=false
      }else{
        this.list_isShow=true
      }
    },
    show:function(){
      var that=this
      that.isAdd=true
      clearTimeout(that.isAdd_Timer)
      that.isAdd_Timer=setTimeout(() => {
        that.isAdd=false
      }, 2000);
    },
    shang:function(){
      if(this.index>0){
        this.index--
      }else{
        this.index=this.$store.state.songInfo.length-1
      }
        this.isPlay=true
    },
    play:function(){
      var audio =document.querySelector('#audio');
      if(this.$store.state.songInfo.length>0){
        if(this.isPlay){
          this.isPlay=false
          audio.pause()
        }else{
          this.isPlay=true
          audio.play()
        }
      }
    },
    isError:function(){
      var audio =document.querySelector('#audio');
      // console.log(this.index)
      // this.$store.dispatch('delSong',this.index)
      if(this.$store.state.songInfo.length==1){
          audio.pause()
      }else{
        this.xia()
      }
      // console.log(this.index)
    },
    isEnded:function(){
      var audio =document.querySelector('#audio');
      if(this.index<this.$store.state.songInfo.length-1){
        this.index++
      }else{
        this.index=0
        audio.play()
      }
    },
    xia:function(){
      if(this.index<this.$store.state.songInfo.length-1){
        this.index++
      }else{
        this.index=0
      }
        this.isPlay=true
        // console.log(this.index)
    },
    select:function(value){
      this.index=value
      this.isPlay=true
    },
    del:function(value){
      if(value<this.index){
        this.index--
      }
      this.$store.dispatch('delSong',value)
    },
    clear:function(){
      this.$store.dispatch('clearAll')
    },
    formatDate2: function (value) {
      let date = new Date(value);
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return m + ':' + s;
    },
    getDate(arr) {
      var str = "";
      arr.map(function(item) {
        str += "/" + item.name;
      });
      return str.substr(1);
    },
    getSearchData:function(){
      var that=this
      if(that.ipt!=''){
        that.songs=[]
        that.artist=[]
        that.album=[]
        that.mv=[]
        that.playList=[]
        that.user=[]
        //歌曲
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=song&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('歌曲:::')
          console.log(res.data.data) */
          that.songs=res.data.data
        }).catch(function(err){
        })
        //歌手
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=singer&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('歌手:::')
          console.log(res.data.data.artists) */
          that.artist=res.data.data.artists
        }).catch(function(err){
        })
        //专辑
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=album&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('专辑:::')
          console.log(res.data.data.albums) */
          that.album=res.data.data.albums
        }).catch(function(err){
        })
        //mv
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=mv&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('mv:::')
          console.log(res.data.data.mvs) */
          that.mv=res.data.data.mvs
        }).catch(function(err){
        })
        //歌单
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=songList&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('歌单:::')
          console.log(res.data.data.playlists) */
          that.playList=res.data.data.playlists
        }).catch(function(err){
        })
        //用户
        axios({
          method:'get',
          url:'https://v1.itooi.cn/netease/search?keyword='+that.ipt+'&type=user&pageSize=4&page=0&&format=1'
        }).then(function(res){
          /* console.log('用户:::')
          console.log(res.data.data.userprofiles) */
          that.user=res.data.data.userprofiles
        }).catch(function(err){
        })
      }else{
        that.songs=[]
        that.artist=[]
        that.album=[]
        that.mv=[]
        that.playList=[]
        that.user=[]
      }
    },
    search:function(){
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer=setTimeout(()=>{this.getSearchData()},500)
    },
    
  },
  mounted() {
    //播放完毕 切下一首
    var that=this
    document.getElementsByTagName('body')[0].addEventListener('click',function(){
       that.searchIsShow=false
       that.list_isShow=false
    })
    /* var audio =document.querySelector('#audio');
    audio.addEventListener('ended',function () {
      if(that.index<that.$store.state.songInfo.length-1){
        that.index++
      }else{
        that.index=0
        audio.play()
      }
    }) */
  },
}
</script>

<style>
 
  header{
    height: 70px;
    box-sizing: border-box;
    background: #242424;
    border-bottom: 1px solid #000;
  }
 /*  header>div{
    width: 90%;
    height: 100%;
  } */
  header .c{
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .c>div{
    height: 100%;
  }
  header .l{
    display: flex
  }
  header .logo{
    width: 176px;
    height:70px;
    background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?050a097addaac9ce4e51f0617dda2f78) no-repeat 0 0;
  }
  .headerNav{
    display: flex;
    height:70px;
  }
  .headerNav li{
    height:70px;
    line-height: 70px;
    padding: 0 19px;
    position: relative;
    cursor: pointer;
  }
  .headerNav .router-link-active{
    background: #000;
  }
  .headerNav li:hover{
    background: #000;
  }
  .headerNav li:hover p{
    color: #fff;
  }
  .headerNav li sub{
    display: block;
    position: absolute;
    left: 50%;
    top: 64px;
    width: 12px;
    height: 7px;
    margin-left: -6px;
    overflow: hidden;
  }
  .headerNav .router-link-active sub{
    background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?5569234c558ba9eb8d9b984041458e5b) -226px 0;
  }
  .headerNav li sup{
    display: block;
    position: absolute;
    top: 21px;
    left: 100px;
    width: 28px;
    height: 19px;
    background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?5569234c558ba9eb8d9b984041458e5b) -190px 0;
  }
  .headerNav p{
    font-size: 14px;
    color: #ccc;
  }
  header .r{
    display: flex;
    align-items: center;
  }
  header .search{
    width: 158px;
    height: 32px;
    background-color: #fff;
    border-radius: 32px;
    /* overflow: hidden; */
    display: flex;
    align-items: center;
    position: relative;
  }
  .search>span{
    display: block;
    width: 30px;
    height: 16px;
  }
  .search>input{
    line-height: 16px;
    width: 95%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 12px;
  }
  header .search .searchWrap{
    /* display: none; */
    width: 240px;
    position: absolute;
    z-index: 2;
    top: 40px;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  header .search .searchWrap>p{
    height: 17px;
    padding: 11px 10px;
    border-bottom: 1px solid #e2e2e2;
  }
  header .search .searchWrap>p>span{
    cursor: pointer;
  }
  header .search .searchWrap>p>span:hover{
    background:#e3e5e7;  
    color: #666;
  }
  .serachW{
    display: flex;
  }
  .serachW>h3{
    width: 60px;
    height: 17px;
    font-size: 12px;
    box-sizing: border-box;
    margin: 10px 0 0 10px;
    display: flex;
    font-weight: normal;
  }
  .serachW>h3 i{
    display: block;
    width: 14px;
    height: 15px;
    margin: 2px 4px 0 0;
  }
  .dqIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -35px -300px no-repeat;
  }
  .gsIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -50px -300px no-repeat;
  }
  .zjIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -35px -320px no-repeat;
  }
  .mvIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -60px -862px no-repeat;
  }
  .gdIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -50px -320px no-repeat;
  }
  .yhIcon{
    background: url(https://s2.music.126.net/style/web2/img/icon.png?00f79a42341c9486afcd03edd145cbaf) -50px -300px no-repeat;
  }
  .serachW>div{
    width: 177px;
    padding: 6px 0 5px;
    border-top: 1px solid #e2e2e2;
    border-left: 1px solid #e2e2e2;
  }
  .serachW>div:first-of-type{
    margin-top: -1px;
  }
  .serachW>div li p{
    width: 160px;
    line-height: 24px;
    text-indent: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .serachW>div li:hover{
    background:#e3e5e7;  
  }
  .czzzx{
    width: 90px;
    height: 32px;
    margin-left:12px;
    box-sizing: border-box;
    padding-left: 16px;
    border: 1px solid #4F4F4F;
    background-position: 0 -140px;
    line-height: 33px;
    color: #ccc;
    border-radius: 20px;
    cursor: pointer;
  }
  .czzzx:hover{
    color: #fff;
    border: 1px solid #fff;
  }
  .login{
    width: 50px;
    height: 16px;
    margin-left: 20px;
  }
  .login>div{
    width: 100%;
    height: 45px;
    position: relative;
  }
  .list{
    width: 158px;
    height:194px;
    background: #2b2b2b;
    border: 1px solid #202020;
    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
    position: absolute;
    top: 38px;
    right: -43px;
    display: none;
    z-index: 99;
  }
  .list>span{
    position: absolute;
    top: -8px;
    left: 50%;
    width: 14px;
    height: 8px;
    background: url(https://s2.music.126.net/style/web2/img/frame/toplist.png?503a5d38dc6089bd842c526049d274c4) -20px 0;
    margin-left: -7px;
  }
  .list ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .login>div:hover .list{
    display: block;
  }
  .list li{
    height: 38px;
    border-bottom: 1px solid #232323;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list li:last-of-type{
    border: none;
  }
  .login>div>div:first-of-type{
      display: flex;
  }
  .login>div>div>p{
      cursor: pointer;
  }
  .login>div>div>p:hover{
      text-decoration: underline;
  }
  .login>div ul span{
    display: block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .login>div p{
    color: #787878;
    width: 100px;
  }
  .login>div ul li{
      cursor: pointer;
  }
  .login>div ul li:hover{
      background: #353535;
  }
  .login>div ul li p{
      color: #ccc;
  }
  .login>div ul li:hover p{
      color: #fff;
  }

  .bottom{
    height: 149px;
    border-top: 1px solid #d3d3d3;
    background: #f2f2f2;
    padding-top: 15px;
    box-sizing: border-box;
  }
  .bottom-c{
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .bottom-c .l p{
    height: 24px;
    line-height: 24px;
    color: #666;
  }
  .bottom-c .l p a{
    color: #666;
  }
  .bottom-c .l p:nth-of-type(1) a{
    color: #999;
  }
  .bottom-c .l p a:hover{
    text-decoration: underline;
  }
  .bottom-c .l p:nth-of-type(1) span{
    margin: 0 8px 0 10px;
    color: #999;
  }
  .bottom-c .r{
    width: 330px;
    display: flex;
    justify-content: space-around;
  }
  .bottom-c .r div{
    width: 60px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .bottom-c .r div a{
    display: block;
    width: 50px;
    height: 45px;
  }
  .bottom-c .r div:nth-of-type(1) a{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_new.png?464500f13d8849ef220ab143c3aecb4b) -62px -101px no-repeat;
    background-size: 110px 450px;
  }
  .bottom-c .r div:nth-of-type(2) a{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_new.png?464500f13d8849ef220ab143c3aecb4b) 1px 0px no-repeat;
    background-size: 110px 450px;
  }
  .bottom-c .r div:nth-of-type(3) a{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_new.png?464500f13d8849ef220ab143c3aecb4b) -62px -50px no-repeat;
    background-size: 110px 450px;
  }
  .bottom-c .r div:nth-of-type(4) a{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_new.png?464500f13d8849ef220ab143c3aecb4b) 2px -101px no-repeat;
    background-size: 110px 450px;
  }
  .bottom-c .r div span{
    display: block;
    width: 52px;
    height: 14px;
  }
  .bottom-c .r div:nth-of-type(1) span{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_tt.png?a8da8f39a74e52c7dcbed08190d6f2e5) 0px -91px no-repeat;
    background-size: 180px 100px;
  }
  .bottom-c .r div:nth-of-type(2) span{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_tt.png?a8da8f39a74e52c7dcbed08190d6f2e5) 0px 0px no-repeat;
    background-size: 180px 100px;
  }
  .bottom-c .r div:nth-of-type(3) span{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_tt.png?a8da8f39a74e52c7dcbed08190d6f2e5) 0px -54px no-repeat;
    background-size: 180px 100px;
  }
  .bottom-c .r div:nth-of-type(4) span{
    background: url(https://s2.music.126.net/style/web2/img/foot_enter_tt.png?a8da8f39a74e52c7dcbed08190d6f2e5) 0px -72px no-repeat;
    background-size: 180px 100px;
  }
  .playbar{
    position: fixed;
    z-index: 999;
    zoom: 1;
    bottom: -46px;
    height: 53px;
    width: 100%;
    transition: bottom 0.5s;
  }
  .playbar:hover{
    bottom: 0;
  }
  .playbar.lock{
    bottom: 0;
  }
  .playbar .open{
    position: absolute;
    top: -10px;
    width: 100%;
    height: 20px;
    cursor: pointer;
    z-index: -1;
  }
  .playbar .updn{
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?32ec2ab14285cc048765860a71979540) 0 -380px;
  }
  .playbar .updn span{
    display: block;
    width: 18px;
    height: 18px;
    margin: 6px 0 0 17px;
    cursor: pointer;
  }
  .playbar .updn-unlock{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?dd3bbb8fee8c7ad9dce83dcf2201a6da) -80px -380px;
  }
  .playbar .updn-unlock:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?dd3bbb8fee8c7ad9dce83dcf2201a6da) -80px -400px;
  }
  .playbar .updn-lock{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?dd3bbb8fee8c7ad9dce83dcf2201a6da) -100px -380px;
  }
  .playbar .updn-lock:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?dd3bbb8fee8c7ad9dce83dcf2201a6da) -100px -400px;
  }
  .playbar .right{
    position: absolute;
    top: -1px;
    right: 0;
    width: 15px;
    height: 54px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?32ec2ab14285cc048765860a71979540) -52px -393px ;
  }
  .playbar .bg{
    height: 53px;
    margin-right: 67px;
    zoom: 1;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?32ec2ab14285cc048765860a71979540)  0 0 repeat-x;
  }
  .playbar .wrap{
    position: absolute;
    left: 0;
    right: 0;
    top: 7px;
    z-index: 15;
    width: 980px;
    height: 45px;
    margin: 0 auto;
    padding-right: 20px;
  }
  .playbar .wrap>div{
    width: 980px;
    height: 45px;
    display: flex;
  }
  .playbar .wrap>div .btns{
    width: 137px;
    height: 42px;
    display: flex;
    margin-top: 6px;
  }
  .playbar .wrap>div .btns span{
    margin-right: 8px;
    cursor: pointer;
  }
  .playbar .wrap>div .btns span:nth-of-type(1){
    width: 28px;
    height: 28px;
    margin-top: 5px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) 0 -130px;
  }
  .playbar .wrap>div .btns span:nth-of-type(1):hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -30px -130px;
  }
  .playbar .wrap>div .btns span:nth-of-type(2){
    width: 36px;
    height: 36px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) 0 -204px;
  }
  .playbar .wrap>div .btns span:nth-of-type(2):hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -40px -204px;
  }
  .playbar .wrap>div .btns span:nth-of-type(2).isPlay{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) 0 -165px;
  }
  .playbar .wrap>div .btns span:nth-of-type(2).isPlay:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -40px -165px;
  }
  .playbar .wrap>div .btns span:nth-of-type(3){
    width: 28px;
    height: 28px;
    margin-top: 5px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -80px -130px;
  }
  .playbar .wrap>div .btns span:nth-of-type(3):hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -110px -130px;
  }
  .playbar .wrap>div .head{
    width: 34px;
    height: 34px;
    margin: 6px 15px 0 0;
    cursor: pointer;
  }
  .playbar .wrap>div .play{
    width: 608px;
    height: 37px;
  }
  .playbar .wrap>div .play>div:first-of-type{
    width: 100%;
    height: 28px;
    line-height: 28px;
  }
  .playbar .wrap>div .play>div:first-of-type span:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  .playbar .wrap>div .play>div:first-of-type span:first-of-type{
    color: #e8e8e8;
  }
  .playbar .wrap>div .play>div:first-of-type span:last-of-type{
    margin-left: 15px;
    color: #9b9b9b;
  }
  .playbar .wrap .play_jindu{
    width: 100%;
    height: 9px;
    display: flex;
  }
  .playbar .wrap .jindu{
    width: 493px;
    height: 9px;
    background: url(https://s2.music.126.net/style/web2/img/frame/statbar.png?9803d8f51244e744bad7cf89e3132636) left 0 no-repeat;
  }
  .playbar .wrap .jindu div{
    position: relative;
    height: 9px;
    background: url(https://s2.music.126.net/style/web2/img/frame/statbar.png?9803d8f51244e744bad7cf89e3132636) left -66px no-repeat;
  }
  .playbar .wrap .jindu div span{
    position: absolute;
    top: -7px;
    right: -13px;
    width: 22px;
    height: 24px;
    margin-left: -11px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?f7b776459442dd8461baf3f17b333bd6) 0 -250px;
  }
  .playbar .wrap .jindu div span:hover{
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?f7b776459442dd8461baf3f17b333bd6) 0 -280px;
  }
  .playbar .wrap .play_jindu .time{
     color: #797979;
     margin-top: -3px;
     margin-left: 15px;
  }
  .playbar .wrap .play_jindu .time span:first-of-type{
    color: #a1a1a1;
  }
  .playbar .wrap .play_jindu .time span:last-of-type{
     color: #797979;
  } 
  .playbar .wrap>div .oper{
    width: 60px;
    height: 36px;
    display: flex;
  }
  .playbar .wrap>div .oper span{
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    cursor: pointer;
  }
  .playbar .wrap>div .oper span:first-of-type{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -88px -163px;
  }
  .playbar .wrap>div .oper span:first-of-type:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -88px -189px;
  }
  .playbar .wrap>div .oper span:last-of-type{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -114px -163px;
  }
  .playbar .wrap>div .oper span:last-of-type:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -114px -189px;
  }

  .playbar .wrap>div .crtl{
    position: relative;
    width: 113px;
    height: 36px;
    padding-left: 13px;
    display: flex;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -147px -238px no-repeat;
  }
  .playbar .wrap>div .crtl>div{
    position: absolute;
    top: -113px;
    left: 9px;
    clear: both;
    width: 32px;
    height: 113px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) 0 -503px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .playbar .wrap>div .crtl>div>div{
    width: 4px;
    height: 93px;
    position: relative;
  }
  .playbar .wrap>div .crtl>div>div>div{
    width: 4px;
    height: 1%;
    position: absolute;
    bottom: 0;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -40px bottom;
  }
  .playbar .wrap>div .crtl>div>div>div span{
    position: absolute;
    top: -9px;
    left: -7px;
    display: block;
    width: 18px;
    height: 20px;
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?f7b776459442dd8461baf3f17b333bd6) -40px -250px;
  }
  .playbar .wrap>div .crtl>span{
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
  }
  .playbar .wrap>div .crtl>span:first-of-type{
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -2px -248px;
  }
  .playbar .wrap>div .crtl>span:first-of-type:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -31px -248px;
  }
  .playbar .wrap>div .crtl>span:nth-of-type(2){
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -3px -344px;
  }
  .playbar .wrap>div .crtl>span:nth-of-type(2):hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -33px -344px;
  }
  .playbar .wrap>div .crtl>span:last-of-type{
    width: 59px;
    height: 25px;
    display: flex;
    flex-direction: column;
    position: relative;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -42px -68px;
  }
  .playbar .wrap>div .crtl>span:last-of-type em{
    cursor: pointer;
    height: 25px;
    line-height: 27px;
    text-align: center;
    padding-left: 21px;
    font-style: normal;
    color: #666;
  }
  .playbar .wrap>div .crtl>span:last-of-type i{
    position: absolute;
    top: -62px;
    left: -65px;
    clear: both;
    width: 152px;
    height: 49px;
    text-align: center;
    color: #fff;
    line-height: 37px;
    font-style: normal;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?f5910deeb620958329fa4e861a50fd72) 0 -287px;
  }
  .playbar .wrap>div .crtl>span:last-of-type:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?12b38d2ba2326c3eb208471f8aa51dea) -42px -98px;
  }
  .playbar .lists{
    position: absolute;
    bottom: 47px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 986px;
    height: 301px;
    color: #e2e2e2;
  }
  .playbar .listsHead{
    height: 41px;
    padding: 0 5px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?0875bc532d980a4cca49a4d65baa2f2b) 0 0 no-repeat;
  }
  .playbar .listsHeadC{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .playbar .listsHeadC h3{
    margin-left: 25px;
    height: 39px;
    line-height: 39px;
    font-size: 14px;
  }
  .playbar .listsHeadC .clear{
    cursor: pointer;
    display: flex;
    height: 15px;
    line-height: 15px;
  }
  .playbar .listsHeadC .clear span{
    width: 13px;
    height: 16px;
    margin-right: 6px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -51px 0;
  }
  .playbar .listsHeadC .clear:hover{
    text-decoration: underline;
  }
  .playbar .listsHeadC .clear:hover span{
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -51px -20px;

  }
  .playbar .listsHeadC .colse{
    cursor: pointer;
    margin: 6px 8px 0 0;
    width: 30px;
    height: 30px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -195px 9px;
  }
  .playbar .listsHeadC .colse:hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -195px -21px;
  }
  .playbar .listsBody{
    width: 986px;
    height: 260px;
    display: flex;
    overflow: hidden;
    position: relative;
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?0875bc532d980a4cca49a4d65baa2f2b) -1014px 0 repeat-y;
  }
  .playbar .listsBody>img{
    position: absolute;
    left: 2px;
    top: -360px;
    z-index: 0;
    width: 980px;
    height: auto;
    opacity: .5;
  }
  .playbar .listsBody>div{
    z-index: 1;
  }
  .playbar .listsBodyL ul{
    margin-left: 2px;
    width: 556px;
    height: 260px;
    overflow: auto;
    overflow-y: auto;
    background: #121212;
    opacity: 0.7;
  }
  .playbar .listsBodyL li{
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 28px;
  }
  .playbar .listsBodyL li:hover{
    background-color: rgba(0,0,0,0.5);
    background-color: rgba(216, 121, 121, 0.2);
  }
  .playbar .listsBodyL li>div{
    margin-left: 10px;
  }
  .playbar .listsBodyL li>div:nth-child(1){
    width: 10px;
    height: 13px;
  }
  .playbar .listsBodyL li.on{
    background-color: rgba(0,0,0,0.5);
    background-color: rgba(216, 121, 121, 0.2);
    color: #fff;
  }
  .playbar .listsBodyL li.on>div:nth-of-type(1){
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -182px 0;
  }
  .playbar .listsBodyL li>div:nth-child(2){
    width: 256px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .playbar .listsBodyL li>div:nth-child(2) span:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  .playbar .listsBodyL li>div:nth-child(3){
    width: 78px;
  }
  .playbar .listsBodyL li>div:nth-child(4){
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .playbar .listsBodyL li>div:nth-child(4) em,.playbar .listsBodyL li>div:nth-child(4) i{
    font-style: normal;
  }
  .playbar .listsBodyL li>div:nth-child(4) em:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  .playbar .listsBodyL li>div:nth-of-type(6){
    width: 13px;
    height: 16px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -51px 0;
  }
  .playbar .listsBodyL li>div:nth-of-type(6):hover{
    background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?ab5f8c57b2e26e43e8867a4c979ef42d) -51px -20px;
  }
  .playbar .listsBodyR{
    width: 425px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
