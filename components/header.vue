<template>
  <header class="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-4 shadow-lg relative">
    <div class="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
      <div class="flex items-center space-x-4 justify-center">
        <div class="flex gap-x-2 items-center transition-transform hover:scale-105">
          <img
            src="https://res.cloudinary.com/dbonwxmgl/image/upload/v1731220914/d5gjgrzdoft32wmaxlmy.png"
            alt="DC Logo"
            class="h-14 rounded-full shadow-lg"
          />
          <p class="text-4xl font-extrabold tracking-wide drop-shadow-lg">Drunken Clam</p>
        </div>
        <nav class="hidden lg:flex text-gray-100 justify-center text-xl space-x-6 font-medium transition duration-200 mt-2">
          <HeaderItem title="Home" link="/" :activeLink="currentPath" />
          <HeaderItem title="Booking A Party" link="/booking" :activeLink="currentPath" />
          <HeaderItem title="Find DC Store" link="/findkfc" :activeLink="currentPath" />
          <HeaderItem title="Feedback" link="/feedback" :activeLink="currentPath" />
        </nav>
      </div>

      <div class="flex items-center space-x-4">
        <NuxtLink to="/cart" class="relative group" aria-label="Cart">
          <img
            src="https://res.cloudinary.com/dbonwxmgl/image/upload/v1730812260/z6rutifjregmcrcjuecx.png"
            alt="Cart"
            class="h-8 w-8 transition transform group-hover:rotate-12"
          />
          <span
            class="absolute top-0 right-0 bg-white text-red-600 rounded-full text-xs w-4 h-4 flex items-center justify-center shadow-lg"
          >
            {{ cartItems.length }}
          </span>
        </NuxtLink>
        <NuxtLink to="/profile/detail" class="hover:opacity-80" aria-label="Profile">
          <img
            src="https://res.cloudinary.com/dbonwxmgl/image/upload/v1730812166/pgvlfot3advrc9kheorc.png"
            alt="Profile"
            class="h-8 w-8 rounded-full border border-white transition duration-300 hover:shadow-xl"
          />
        </NuxtLink>
        <button @click="toggleSidebar" class="text-white text-2xl hover:scale-110 transform transition-transform">
          ☰
        </button>
      </div>
    </div>
    <div>
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        @click="toggleSidebar"
      ></div>
      <div
        class="fixed top-0 right-0 w-2/3 lg:w-1/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl"
        :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="p-8 flex justify-between items-center bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white">
          <span class="text-2xl font-bold">Menu</span>
          <button @click="toggleSidebar" class="text-2xl">&times;</button>
        </div>
        <ul class="mt-4 divide-y">
          <li
            v-for="item in navItems"
            :key="item.name"
            class="p-4 flex items-center space-x-2 hover:bg-red-100 transition duration-200"
          >
            <NuxtLink :to="item.link" class="text-gray-700 flex items-center p-2 transition hover:text-red-500" @click="toggleSidebar">
              <i :class="item.icon + ' mr-2 text-lg'"></i>
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
        <div class="border-t p-4 text-center">
          <p class="text-sm text-gray-600">Connect with us:</p>
          <div class="flex justify-center space-x-4 mt-2">
            <a href="#" class="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" class="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-125">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" class="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-125">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../store';
import HeaderItem from './headerItem.vue'

const route = useRoute();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems || []);
const isSidebarOpen = ref(false);
const navItems = [
  { name: 'Home', link: '/', icon: 'fas fa-home fa-lg' },
  { name: 'Booking a party', link: '/booking', icon: 'fas fa-calendar-alt fa-lg' },
  { name: 'Find DC store', link: '/findkfc', icon: 'fas fa-map-marker-alt fa-lg' },
  { name: 'Your Profile', link: '/profile/detail', icon: 'fas fa-user fa-lg' },
  { name: 'Feedback', link: '/feedback', icon: 'fas fa-comment-dots fa-lg' },
  { name: 'Log In', link: '/signIn', icon: 'fas fa-sign-in-alt fa-lg' },
];
const currentPath = computed(() => route.path);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
.header-logo img {
  transition: transform 0.3s ease;
}
.header-logo img:hover {
  transform: scale(1.1);
}

nav a:hover {
  text-decoration: underline;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
