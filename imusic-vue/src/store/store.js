import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state={//数据
    songList:[],
    songUrl:[],
    songInfo:[]
};
const getters = {   //实时监听state值的变化(最新状态)
    upData(state) {  //方法名随意,主要是来承载变化的值
       return state.songList,state.songUrl,state.songInfo
    },
};
const mutations = {
    add(state,value){
        state.songList.push(value)
    },
    getUrl(state,value){
        state.songUrl.push(value)
    },
    getInfo(state,value){
        state.songInfo.push(value)
    },
    del(state,value){
        state.songList.splice(value,1)
        state.songUrl.splice(value,1)
        state.songInfo.splice(value,1)
    },
    clear(state){
        state.songList=[]
        state.songUrl=[]
        state.songInfo=[]
    }
};
const actions = {
    addSong(context,value){
        context.commit('add',value)
    },
    getSongInfo(context,value){
        //获取歌曲地址
        var timestamp = (new Date()).getTime()
        axios({
            method:'get',
            url:'https://v1.itooi.cn/netease/url?id='+value+'&isRedirect=0&timestamp='+timestamp
        }).then(function(res1){
            //歌曲信息
            axios({
                method:'get',
                url:'https://v1.itooi.cn/netease/song?id='+value+'&timestamp='+timestamp
            }).then(function(res2){
                var obj={'id':value,'url':res1.data.data}
                context.commit('getUrl',obj)
                context.commit('getInfo',res2.data.data.songs[0])
            }).catch(function(error){
            })
        }).catch(function(error){
        })
    },
    delSong(context,value){
        context.commit('del',value)
    },
    clearAll(context){
        context.commit('clear')
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;