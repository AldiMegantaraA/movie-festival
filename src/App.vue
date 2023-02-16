<template>
  <div class="h-100">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './routes';
export default {
  name: 'App',
  mounted() {
    let token = localStorage.getItem('accesToken')
    if(!token) {
      router.push('/login')
    }
  }
};
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>

