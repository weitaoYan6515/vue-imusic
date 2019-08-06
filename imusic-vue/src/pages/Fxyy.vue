<template>
    <div class="fxyy">
        <div class="header">
            <ul class="nav">
                <router-link to="/fxyy/tj" tag="li"><p>推荐</p><span></span></router-link>
                <router-link to="/fxyy/phb" tag="li"><p>排行版</p><span></span></router-link>
                <router-link to="/fxyy/gd" tag="li"><p>歌单</p><span></span></router-link>
                <router-link to="/fxyy/zbdt" tag="li"><p>主播电台</p><span></span></router-link>
                <router-link to="/fxyy/gs" tag="li"><p>歌手</p><span></span></router-link>
                <router-link to="/fxyy/xdsj" tag="li"><p>新碟上架</p><span></span></router-link>
            </ul>
        </div>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
export default {
    name:'Index',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .header{
        height: 35px;
        box-sizing: border-box;
        background-color: #C20C0C;
        border-bottom: 1px solid #a40011;
    }
    .header .nav{
        padding-left: 180px;
        width: 1100px;
        height: 35px;
        margin: 0 auto;
        display: flex;
        box-sizing: border-box;
    }
    .nav li{
        height: 35px;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
    }
    .nav li:nth-of-type(3) span{
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 54px;
        margin-top: -8px;
        background: url(https://s2.music.126.net/style/web2/img/white-r-icon@3x.png?93fdea1f7bd080e68ab904c5616277fd);
        background-size: cover;
    }
    .nav p{
        height: 20px;
        padding: 0 13px;
        margin: 0 17px;
        border-radius: 20px;
        line-height: 21px;
        color: #fff;
    }
    .nav li:hover p{
        background: #9B0909;
    }
    .nav .router-link-active p{
        background: #9B0909;
    }
</style>


