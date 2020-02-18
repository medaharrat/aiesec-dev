<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Header'
import Home from '@/views/Home'

export default {
  name: 'App',
  data(){
    return{
      //data
    }
  },
  components: {
    Navbar, Home
  }
}
</script>

