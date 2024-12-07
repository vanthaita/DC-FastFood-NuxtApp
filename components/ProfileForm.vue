<template>
  <div class="profile-form w-3/4 p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Account Details</h2>
    <form @submit.prevent="updateProfile">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-2 font-semibold" for="lastName">Last Name *</label>
          <input type="text" id="lastName" v-model="lastName" class="border p-2 w-full rounded" required />
        </div>

        <div>
          <label class="block mb-2 font-semibold" for="firstName">First Name *</label>
          <input type="text" id="firstName" v-model="firstName" class="border p-2 w-full rounded" required />
        </div>

        <div>
          <label class="block mb-2 font-semibold" for="phone">Phone Number *</label>
          <input type="text" id="phone" v-model="phone" class="border p-2 w-full rounded" required />
        </div>

        <div>
          <label class="block mb-2 font-semibold" for="email">Email Address *</label>
          <input type="email" id="email" v-model="email" class="border p-2 w-full rounded" required readonly />
        </div>

        <div>
          <label class="block mb-2 font-semibold" for="gender">Gender *</label>
          <select id="gender" v-model="gender" class="border p-2 w-full rounded" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-semibold">Date of Birth (optional)</label>
          <div class="flex space-x-2">
            <select v-model="day" class="border p-2 w-1/3 rounded">
              <option disabled value="">Day</option>
              <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
            </select>
            <select v-model="month" class="border p-2 w-1/3 rounded">
              <option disabled value="">Month</option>
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="year" class="border p-2 w-1/3 rounded">
              <option disabled value="">Year</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" class="mt-6 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-2 font-bold px-4 rounded hover:bg-red-700 transition-colors">
        Update Account
      </button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      lastName: 'Tài',
      firstName: 'Lê Thanh',
      phone: '',
      email: '22521276@gm.uit.edu.vn',
      gender: '',
      day: '',
      month: '',
      year: '',
      years: this.getYears()
    };
  },
  methods: {
    getYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 100 }, (_, i) => currentYear - i);
    },
    updateProfile() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update your profile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Updated!', 'Your profile has been updated.', 'success');
        }
      });
    }
  }
}
</script>

<style scoped>
.profile-form {
  padding: 2rem;
}
input, select {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
}
</style>