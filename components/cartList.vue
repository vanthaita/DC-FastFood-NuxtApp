<template>
  <div class="min-h-screen flex flex-col bg-gray-100 p-8">
    <main class="flex-grow container mx-auto mt-4 flex flex-col space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Your Shopping Cart</h1>
      </div>
      <div v-if="cartItems && cartItems.length" class="bg-white p-6 shadow rounded">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 text-left">Item</th>
              <th class="py-2 text-center">Quantity</th>
              <th class="py-2 text-right">Delivery</th>
              <th class="py-2 text-right">Delivery Cost</th>
              <th class="py-2 text-right">Price</th>
              <th class="py-2 text-right">Total</th>
              <th class="py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="border-t">
              <td class="py-2 text-left">{{ item.name }}</td>
              <td class="py-2 flex items-center justify-center">
                <button @click="decreaseQuantity(item.id)" class="bg-gray-300 text-gray-700 text-xl font-bold px-2 py-1 rounded-l hover:bg-red-400">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  class="w-16 p-2 border-t border-b border-gray-300 rounded-none text-center"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <button @click="increaseQuantity(item.id)" class="bg-gray-300 text-gray-700 text-xl font-bold px-2 py-1 rounded-r hover:bg-green-400">+</button>
              </td>
              <td class="py-2 text-right">{{ item.deliveryOption.name }}</td>
              <td class="py-2 text-right">${{ item.deliveryOption.cost.toFixed(2) }}</td>
              <td class="py-2 text-right">${{ item.price.toFixed(2) }}</td>
              <td class="py-2 text-right">${{ calculateTotal(item).toFixed(2) }}</td>
              <td class="py-2 text-center">
                <button @click="confirmRemove(item.id)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center flex flex-col items-center justify-center space-y-4">
        <table class="min-w-full bg-white p-4">
          <tbody>
            <tr class="border-t">
              <td class="py-2 text-center">Your cart is empty. <router-link to="/" class="text-blue-600 underline hover:text-blue-800">Continue Shopping</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <PackageInf />
      <div class="mt-4 text-right">
        <h3 class="text-xl font-bold">Total: ${{ cartTotal.toFixed(2) }}</h3>
        <button class="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700" @click="checkout">
          Checkout
        </button>
      </div>
      <h2 class="text-xl font-semibold text-gray-800">Recommend your choice with:</h2>
      <ProductRecommend />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../store';
import Swal from 'sweetalert2';
import ProductRecommend from './ProductRecommend.vue';
import { useRouter } from 'vue-router'; 

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.cartItems || []);
const cartTotal = computed(() => cartStore.cartTotal || 0);

const calculateTotal = (item: any) => {
  const deliveryCost = item.deliveryOption ? item.deliveryOption.cost : 0;
  return item.price * item.quantity + deliveryCost;
};

const updateQuantity = (itemId: number, newQuantity: number) => {
  console.log(itemId, newQuantity);
  const item = cartItems.value.find((item) => item.id === itemId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    cartStore.updateCart(cartItems.value);
  }
};

const increaseQuantity = (itemId: number) => {
  const item = cartItems.value.find((item) => item.id === itemId);
  if (item) {
    item.quantity++;
    cartStore.updateCart(cartItems.value);
  }
};

const decreaseQuantity = (itemId: number) => {
  const item = cartItems.value.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    cartStore.updateCart(cartItems.value);
  }
};

const confirmRemove = (itemId: number) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to remove this item from your cart?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, remove it!',
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.deleteItem(itemId);
      Swal.fire({
        title: 'Processing...',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      setTimeout(() => {
        Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Item removed from cart.',
    showConfirmButton: false,
    timer: 1000
  });
      }, 900);
    }
  });
};

const checkout = () => {
  if (cartItems.value.length === 0) {
    Swal.fire({
      title: 'Your cart is empty',
      text: 'Please add some items to your cart before proceeding to checkout.',
      icon: 'warning',
    });
    return;
  }
  Swal.fire({
    title: 'Proceed to Checkout',
    text: 'Are you sure you want to proceed to checkout?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Processing...',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      setTimeout(() => {
        Swal.fire('Success!', 'Proceeding to checkout...', 'success');
        cartStore.addPreviousOrder([...cartItems.value]);
        cartStore.clearCart();
      }, 1500);
    }
  });
};
</script>

<style scoped>
@media (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
  }
  th,
  td {
    min-width: 120px;
  }
}
</style>
