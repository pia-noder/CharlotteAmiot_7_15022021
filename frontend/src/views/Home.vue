<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>Shopping List</h1>
    <div class="shopping-list">
      <input type="text" placeholder="Ajout produit" v-model="newItem" v-on:keyup.enter="addToItemList()">
      <ul>
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return{
      state: 'default',
      items:[
        'Salade',
        'Tomate',
        'Banane',
      ],
      newItem: '',
    }
  },
  methods: {
    addToItemList() {
      this.items.push(this.newItem);
      this.newItem = '';
    }
  }
}
</script>
