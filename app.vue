<template>
  <div>
    <Header />
     <NuxtLayout>
        <NuxtPage/>
     </NuxtLayout>
    <Footer/>
  </div>
</template>
<script lang="tsx" setup>
import Header from './components/header.vue'
import Footer from './components/Footer.vue'
</script>