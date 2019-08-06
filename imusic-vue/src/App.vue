<template>
  <div id="app">
    
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    font-size: 12px;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
    background: #f5f5f5;
    overflow: hidden;
  }
  #app{
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  img{
    display: block;
    width: 100%;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  
</style>
