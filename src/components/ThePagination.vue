<template>
  <div>
    <ul id="pagination-flickr">
      <router-link to="?page=prev">
      <button class="btn" @click="prevPage" :disabled="pageNumber===0">
        « Предыдущая
      </button>
      </router-link>
      <li v-for="(p, idx) in pageCount" @click="pageNumber=idx">
        <router-link class="a" :class="pageNumber === idx ? 'act' : ''" :to="`?page=${idx}`">{{idx+1}}</router-link>
      </li>
      <router-link to="?page=next">
        <button class="btn" @click="nextPage" :disabled="pageNumber === pageCount - 1">
          Следующая »
        </button>
      </router-link>
    </ul>
  </div>
</template>

<script>

import {computed, onMounted, ref} from "vue"
import {useStore} from 'vuex'

export default {
  props:{
    listData:{
      type:Array,
      required:true
    },
    size:{
      type:Number,
      required:false,
      default: 10
    }
  },
  emits: ['paginatedData'],
  setup(props, {emit}) {
    const store = useStore()
    const pageNumber = ref(0)
    const nextPage = function () {
      pageNumber.value++
    }
    const prevPage = function () {
      pageNumber.value--
    }

    const pageCount = computed(() => {
      return Math.ceil(props.listData.length/props.size) //=3
    })

    if (!pageNumber.value) {
      onMounted(async () => {
        await store.dispatch('products/loadAllProducts')
      })
    }

    const paginatedData = computed(() => {
      const start = pageNumber.value * props.size, //0
          end = start + props.size; //10
      return props.listData.slice(start, end); //10
    })

    emit('paginatedData', paginatedData)

    return {
      pageNumber,
      nextPage,
      prevPage,
      pageCount,
      paginatedData
    }
  }
}
</script>

<style scoped>
#pagination-flickr {
  border:0; margin:0; padding:0;
  display: flex;
  justify-content: center;
}

#pagination-flickr li{
  border:0; margin:0; padding:0;
  font-size:16px;
  list-style:none;
}

#pagination-flickr .a{
  border:solid 1px #DDDDDD;
  margin-right:2px;
}

#pagination-flickr .a:link,
#pagination-flickr .a:visited
{
  color:#0063e3;
  display:block;
  float:left;
  padding:3px 12px;
  text-decoration:none;
}

#pagination-flickr .act:visited
{
  border:solid 1px #ff0084;
}

#pagination-flickr .a:hover {
  border:solid 1px #666666;
}

.btn {
  margin-right: 2px;
}


</style>
