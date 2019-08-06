import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/pages/Index'

import Fxyy from '@/pages/Fxyy'

import Tj from '@/pages/Tj'
import Phb from '@/pages/Phb'
import Gd from '@/pages/Gd'
import Zbdt from '@/pages/Zbdt'
import Gs from '@/pages/Gs'
import Xdsj from '@/pages/Xdsj'

import Playlist from '@/pages/Playlist'
import Song from '@/pages/Song'
import Album from '@/pages/Album'
import Artist from '@/pages/Artist'
import Mv from '@/pages/Mv'
import User from '@/pages/User'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/fxyy',
      name:'Index',
      component:Index,
      children:[
        {
          path:'/fxyy',
          redirect:'/fxyy/tj',
          name:'Fxyy',
          component:Fxyy,
          children:[
            {
              path:'/fxyy/tj',
              name:'Tj',
              component:Tj
            },
            {
              path:'/fxyy/phb',
              name:'Phb',
              component:Phb
            },
            {
              path:'/fxyy/gd',
              name:'Gd',
              component:Gd
            },
            {
              path:'/fxyy/zbdt',
              name:'Zbdt',
              component:Zbdt
            },
            {
              path:'/fxyy/gs',
              name:'Gs',
              component:Gs
            },
            {
              path:'/fxyy/xdsj',
              name:'Xdsj',
              component:Xdsj
            },
            {
              path:'/fxyy/playlist',
              name:'Playlist',
              component:Playlist
            },
            {
              path:'/fxyy/song',
              name:'Song',
              component:Song
            },
            {
              path:'/fxyy/album',
              name:'Album',
              component:Album
            },
            {
              path:'/fxyy/artist',
              name:'Artist',
              component:Artist
            },
            {
              path:'/fxyy/mv',
              name:'Mv',
              component:Mv
            },
            
          ]
        },
        {
          path:'/wdyy'
        },
        {
          path:'/py'
        },
        {
          path:'/sc'
        },
        {
          path:'/yyr'
        },
        {
          path:'/xzkhd'
        },
        {
          path:'/user',
          name:'User',
          component:User
        }, 
      ]
    } 
  ]
})
