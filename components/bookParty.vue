<template>
  <div class="min-h-screen flex flex-col p-2">
    <main class="flex-grow container mx-auto mt-8">
      <div class="w-full h-full mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Book a Party</h2>
        <div class="flex w-full gap-2 justify-between">
          <div class="mb-6 w-1/2 ml-6 justify-center items-center">
            <iframe 
              src="https://www.youtube.com/embed/-Un8IOE_7mg" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="w-full h-full rounded-lg"
            ></iframe>
          </div>
          <div class="w-1/2">
            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label for="name" class="block text-sm font-bold text-gray-500">Name :</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  placeholder="Enter your name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-bold text-gray-500">Email :</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  placeholder="Enter your email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="phone" class="block text-sm font-bold text-gray-500">Phone Number :</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="Enter your phone number" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="date" class="block text-sm font-bold text-gray-500">Party Date :</label>
                <input 
                  type="date" 
                  id="date" 
                  v-model="form.date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="time" class="block text-sm font-bold text-gray-500">Party Time :</label>
                <input 
                  type="time" 
                  id="time" 
                  v-model="form.time" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="guests" class="block text-sm font-bold text-gray-500">Number of Guests :</label>
                <input 
                  type="number" 
                  id="guests" 
                  v-model="form.guests" 
                  min="1" 
                  placeholder="Enter number of guests" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="requests" class="block text-sm font-bold text-gray-500">Additional Requests :</label>
                <textarea 
                  id="requests" 
                  v-model="form.requests" 
                  placeholder="Enter any additional requests" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                ></textarea>
              </div>
              <div class="text-center">
                <button 
                  type="submit" 
                  class="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';

const form = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 1,
  requests: ''
});

const submitForm = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Pleased to serve you`,
    showConfirmButton: false,
    timer: 1500
  });
  form.value = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    requests: ''
  };
};
</script>
