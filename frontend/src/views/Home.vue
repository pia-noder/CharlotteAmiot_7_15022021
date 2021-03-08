<template>
  <div class="home">
    <Menu />
    <div class="main">
      <MenuLateral class="menuLateral" />
      <div class="publication">
        <CreatePost class="bloc-post displayPost" />
        <Post class="bloc-post post" />
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Posts.vue'

export default {
  name: 'Home',
  components: {
    Menu,
    MenuLateral,
    CreatePost,
    Post,
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
        margin-left: 1.5%;

        .bloc-post {
          width: 50%;
        }
        .post{
          margin-top:23px;
        }
      }
}
</style>