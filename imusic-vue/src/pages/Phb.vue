<template>
    <div class="phb">
            <div class="l">
                <h1 v-for="(item,index) in nav" :key="index" :class="num==index?'active':''" v-on:click="tab(index)">{{item}}</h1>
            </div>
            <div class="r">
                <div class="tit">
                    <div>
                        <h3>{{nav[num].slice(0,2)}}列表</h3>
                        <span>{{list.length}}{{nav[num].slice(0,2)}}</span>
                    </div>
                </div>
                <table v-if="num==0">
                    <thead>
                        <tr>
                            <th><div></div></th>
                            <th><div>歌手</div></th>
                            <th><div>歌曲数量</div></th>
                            <th><div>专辑数量</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <td><div>{{index+1}}</div></td>
                            <td><div><img :src="item.picUrl" alt=""><router-link :to="{path:'/fxyy/artist',query:{id:item.id}}" tag="span" >{{item.name}}</router-link></div></td>
                            <td><div>{{item.musicSize}}</div></td>
                            <td><div>{{item.albumSize}}</div></td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="num==1">
                    <thead>
                        <tr>
                            <th><div></div></th>
                            <th><div>MV</div></th>
                            <th><div>歌手</div></th>
                            <th><div>播放次数</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <td><div>{{index+1}}</div></td>
                            <td><div><img :src="item.cover" alt=""><router-link :to="{path:'/fxyy/mv',query:{id:item.id}}" tag="span" :title="item.name">{{item.name}}</router-link></div></td>
                            <td><div><router-link :to="{path:'/fxyy/artist',query:{id:item.artistId}}" tag="span" :title="item.artistName">{{item.artistName}}</router-link></div></td>
                            <td><div>{{item.playCount}}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Phb',
    data() {
        return {
            num:0,
            nav:['歌手排行榜','MV排行榜'],
            list:[],
            url:['https://v1.itooi.cn/netease/artist/top?page=0&pageSize=20','https://v1.itooi.cn/netease/mv/top?page=0&pageSize=20']
        }
    },
    methods: {
        tab(index){
            this.num=index
            var that=this
            axios({
                method:'get',
                url:that.url[that.num]
            }).then(function(res){
                that.list=res.data.data
            }).catch(function(error){

            })
        }
    },
    mounted() {
        var that=this
        axios({
            method:'get',
            url:that.url[0]
        }).then(function(res){
            that.list=res.data.data
        }).catch(function(error){

        })
    },
}
</script>

<style scoped>
    .phb{
        width: 980px;
        margin: 0 auto;
        min-height: 700px;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url(https://s2.music.126.net/style/web2/img/frame/wrap3.png?86738f1b8cbf38fb8bbc24628a996b07) center 0 repeat-y;
        display: flex;
    }
    .phb .l{
        width: 240px;
        padding: 40px 0;
    }
    .phb .l h1{
        padding: 20px 0;
        text-align: center;
        cursor: pointer;
    }
    .phb .l h1.active{
        background: #e6e6e6;
    }
    .phb .l h1:hover{
        background: #f4f2f2;
    }
    .phb .r{
        width: 740px;
        box-sizing: border-box;
        padding: 40px;
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
        width: 20px;
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
    table td div span{
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    table td div p{
        white-space: nowrap;
    }
    table tbody tr td:nth-of-type(2) div{
        display: flex;
        align-items: center;
    }
    table tbody tr td:nth-of-type(2) div img{
        width: 50px;
        height: 50px;
    }
    table tbody tr td:nth-of-type(2) div span{
        cursor: pointer;
        margin-left: 30px;
    }
    table tbody tr td:nth-of-type(2) div span:hover{
        text-decoration: underline;
    }
    table tbody tr td:nth-of-type(3) div span{
        cursor: pointer;
    }
    table tbody tr td:nth-of-type(3) div span:hover{
        text-decoration: underline;
    }
    table tbody tr:nth-of-type(2n+1){
        background-color: #f7f7f7;
    }
</style>

