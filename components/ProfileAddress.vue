<template>
  <div class="address-container p-6 bg-gray-100 rounded-lg shadow-lg">
    <h2 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Your Addresses</h2>
    <div class="address-form mb-6">
      <form @submit.prevent="saveAddress">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block mb-2 font-semibold" for="street">Street *</label>
            <input type="text" id="street" v-model="form.street" class="border p-2 w-full rounded" required />
          </div>
          <div>
            <label class="block mb-2 font-semibold" for="city">City *</label>
            <input type="text" id="city" v-model="form.city" class="border p-2 w-full rounded" required />
          </div>
          <div>
            <label class="block mb-2 font-semibold" for="state">State *</label>
            <input type="text" id="state" v-model="form.state" class="border p-2 w-full rounded" required />
          </div>
          <div>
            <label class="block mb-2 font-semibold" for="zip">ZIP Code *</label>
            <input type="text" id="zip" v-model="form.zip" class="border p-2 w-full rounded" required />
          </div>
        </div>
        <button type="submit" class="mt-6 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors font-bold">
          {{ editMode ? 'Update Address' : 'Add Address' }}
        </button>
      </form>
    </div>
    <div class="address-list">
      <h3 class="text-xl font-bold mb-4 text-gray-800">Saved Addresses</h3>
      <ul>
        <li v-for="(address, index) in addresses" :key="index" class="mb-4 p-4 bg-white rounded-lg shadow">
          <p>{{ address.street }}, {{ address.city }}, {{ address.state }} {{ address.zip }}</p>
          <div class="mt-2 flex space-x-4">
            <button @click="editAddress(index)" class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">Edit</button>
            <button @click="confirmDeleteAddress(index)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      addresses: [],
      editMode: false,
      editIndex: null
    };
  },
  methods: {
    saveAddress() {
      if (this.editMode) {
        this.addresses.splice(this.editIndex, 1, { ...this.form });
        this.editMode = false;
        this.editIndex = null;
      } else {
        this.addresses.push({ ...this.form });
      }
      this.resetForm();
    },
    editAddress(index) {
      this.form = { ...this.addresses[index] };
      this.editMode = true;
      this.editIndex = index;
    },
    confirmDeleteAddress(index) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAddress(index);
          Swal.fire('Deleted!', 'The address has been deleted.', 'success');
        }
      });
    },
    deleteAddress(index) {
      this.addresses.splice(index, 1);
    },
    resetForm() {
      this.form = {
        street: '',
        city: '',
        state: '',
        zip: ''
      };
    }
  }
};
</script>

<style scoped>
.address-container {
  background-color: #f7fafc;
}

.address-form form {
  max-width: 600px;
}

.address-list ul {
  list-style-type: none;
  padding: 0;
}

.address-list li {
  border: 1px solid #e2e8f0;
}
</style>