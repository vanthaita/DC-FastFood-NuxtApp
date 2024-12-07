<template>
  <div class="reset-password-container p-6 bg-gray-100 rounded-lg shadow-lg">
    <h2 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Reset Password</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-2 font-semibold" for="currentPassword">Current Password *</label>
        <input type="password" id="currentPassword" v-model="form.currentPassword" class="border p-2 w-full rounded" required />
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-semibold" for="newPassword">New Password *</label>
        <input type="password" id="newPassword" v-model="form.newPassword" class="border p-2 w-full rounded" required />
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-semibold" for="confirmPassword">Confirm New Password *</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" class="border p-2 w-full rounded" required />
      </div>
      <div v-if="errorMessage" class="mb-4 text-red-600">
        {{ errorMessage }}
      </div>
      <button type="submit" class="mt-6 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors font-bold">
        Reset Password
      </button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.errorMessage = "New password and confirmation do not match.";
        return;
      }
      this.errorMessage = '';
      this.confirmResetPassword();
    },
    confirmResetPassword() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reset your password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetPassword();
          Swal.fire('Reset!', 'Your password has been reset.', 'success');
        }
      });
    },
    resetPassword() {
      this.form.currentPassword = '';
      this.form.newPassword = '';
      this.form.confirmPassword = '';
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  background-color: #f7fafc;
}
</style>