<template>
  <div class="home">
    <Menu />
    <div class="main">
      <MenuLateral class="menuLateral" />
      <div class="publication">
        <CreatePost @rerenderComponent="forceRerender" class="bloc-post displayPost" :key="componentKey"/>
        <div class="postList" v-for="post in posts" :post="post"  :key="post.id_post">
          <Post  class="bloc-post post" :post="post" />
        </div>
        
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
  created() {
        this.$store.dispatch('loadPosts');
    },
  data(){
    return{
      userId: this.$route.params.userId,
      componentKey: 0,
    }
  },
  computed: {
        posts() {
            return this.$store.state.posts;
        },
    },
  methods:{
   forceRerender() {
      this.componentKey += 1;
    }
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