<template>
  <div class="min-h-screen flex flex-col p-8">
    <h2 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Previous Orders</h2>
    <div v-if="previousOrders.length" class="bg-white p-6 shadow rounded-lg">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 text-left">Order #</th>
            <th class="py-2 text-left">Item</th>
            <th class="py-2 text-center">Quantity</th>
            <th class="py-2 text-right">Price</th>
            <th class="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(order, orderIndex) in previousOrders" :key="orderIndex">
            <tr v-for="(item, itemIndex) in order" :key="item.id" class="border-t">
              <td v-if="itemIndex === 0" :rowspan="order.length" class="py-2 text-left align-top">{{ orderIndex + 1 }}</td>
              <td class="py-2 text-left">{{ item.name }}</td>
              <td class="py-2 text-center">{{ item.quantity }}</td>
              <td class="py-2 text-right">${{ item.price.toFixed(2) }}</td>
              <td class="py-2 text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="mt-4 text-right">
        <button @click="clearPreviousOrders" class="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded hover:bg-red-700 font-bold">
          Clear All Previous Orders
        </button>
      </div>
    </div>
    <div v-else class="bg-white p-6 shadow rounded-lg">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 text-left">Order #</th>
            <th class="py-2 text-left">Item</th>
            <th class="py-2 text-center">Quantity</th>
            <th class="py-2 text-right">Price</th>
            <th class="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t">
            <td colspan="5" class="py-2 text-center">No previous orders found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/store';

const cartStore = useCartStore();

const previousOrders = computed(() => cartStore.previousOrders);

const clearPreviousOrders = () => {
  cartStore.clearPreviousOrders();
};
</script>