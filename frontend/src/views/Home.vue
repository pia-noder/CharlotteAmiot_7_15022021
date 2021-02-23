<template>
  <div class="home">
    <Menu />
    <div class="main">
      <MenuLateral class="menuLateral" />
      <div class="publication">
        <DisplayToPost class="bloc-post" />
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
import DisplayToPost from '@/components/DisplayToPost.vue'

export default {
  name: 'Home',
  components: {
    Menu,
    MenuLateral,
    DisplayToPost
  },
  
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.main{
  display: flex;

      .menuLateral{
        
        flex: 1;
        
      }
      .publication {
        flex: 3;
        
        margin-top: 30px;

        .bloc-post {
          width: 60%;
        }
      }
}
</style>