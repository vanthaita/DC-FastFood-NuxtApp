<template>
  <div class="bg-white p-6 shadow-lg rounded-lg mt-6">
    <h3 class="text-4xl text-center font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">DC Locations in HCM</h3>
    <ul>
      <li
        v-for="(location, index) in kfcLocations"
        :key="index"
        class="mb-4 p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg"
        @click="selectAddress(location)"
      >
        <h4 class="font-semibold text-lg text-red-400">{{ location.name }}</h4>
        <p class="text-gray-600">{{ location.address }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kfcLocations: [
        { name: "DC Nguyễn Thái Học", address: "83 Nguyễn Thái Học, P. Cầu Ông Lãnh, Q.1" },
        { name: "DC Phạm Hồng Thái", address: "136 Phạm Hồng Thái, Q.1" },
        { name: "DC Lê Hồng Phong", address: "208 Lê Hồng Phong, P.10, Q.10" },
        { name: "DC Trường Chinh", address: "40 Trường Chinh, Q.Tân Bình" },
        { name: "DC Cộng Hòa", address: "268 Cộng Hòa, Q.Tân Bình" },
        { name: "DC Phú Nhuận", address: "267 Phan Đăng Lưu, Q.Phú Nhuận" },
        { name: "DC Quận 2", address: "231 Đường Nguyễn Thị Định, Q.2" },
      ],
    };
  },
  methods: {
    selectAddress(location) {
      this.$emit('address-selected', location.address);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>