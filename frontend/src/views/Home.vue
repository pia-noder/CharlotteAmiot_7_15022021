<template>
  <div class="home">
    <Menu />
  </div>
</template>

<script>
// @ is an alias to /src

import Menu from '@/components/Menu.vue'

export default {
  name: 'Home',
  components: {
    Menu
  },
  data() {
    return{
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
