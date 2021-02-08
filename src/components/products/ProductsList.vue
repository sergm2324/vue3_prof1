<template>
  <div class="products-table">
    <div class="product-card" v-for = "product in products" :key="product.id" v-if="products.length">
      <router-link :to="'/product/' + product.id">
        <div class="product-img">
          <img :src="product.img">
        </div>
      </router-link>
      <h4 class="product-title">{{product.title}}</h4>
      <div class="text-center" v-if="product.count > 0">
        <button class="btn" @click="selectProduct(product.id)" v-if="currentProductId !== product.id">{{ currency(product.price) }}</button>
        <div class="product-controls" v-if="showProductControls && currentProductId === product.id">
          <button class="btn danger">-</button>
          <strong>123</strong>
          <button class="btn primary">+</button>
        </div>
      </div>
      <div class="text-center" v-else>
        Нет в наличии
      </div>
    </div>
    <div class="text-center" v-else>
      Таких товаров нет.
    </div>
  </div>
</template>

<script>
export default {
name: "ProductsList"
}
</script>

<style scoped>

</style>
