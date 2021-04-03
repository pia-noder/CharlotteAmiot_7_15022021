<template>
  <div class="home">
    <Menu />
    <div class="main">
      <MenuLateral class="menuLateral" />
      <div class="publication">
        <CreatePost  class="bloc-post" />

        <div v-if="posts[0]" class="if-post">
          <div v-for="post in posts" :post="post"  :key="post.id">
            <Post  
              class="bloc-post post" 
              :post="post"
              :user="user" 
              />
            
          </div>
        </div>
        <div v-else class="text-default__post">
            <p>- Aucun Poste Publié Pour Le Moment -</p>
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
  async beforeCreate() {
    await  this.$store.dispatch('loadPosts');
    await  this.$store.dispatch('loadUser', this.$route.params.userId );
    },
  computed: {
        posts() {
            return this.$store.state.posts;
        },
        user(){
      return this.$store.state.user;
      }
    },  
  data(){
    return{
      userId: this.$route.params.userId,
    }
  },
  

 
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.main{
  display: flex;

      .publication {
           margin-top: 15vh;
           width: 100%;
        .bloc-post {
          margin-top: 30px;
          margin: auto;
          width: 35%;
        }
        .post{
          margin-top:23px;
        }
        .text-default__post{
        color: rgb(229, 115, 115);
        text-align: center;
        margin-top: 30px;

        font-size: 1.5em;
      }

      }
  
}

@media (max-width:900px){
 .main{
      .publication {

        .bloc-post {
          margin: auto;
          width: 85%;
        }
        .post{
          margin-top:23px;
        }
      }
  }
    
}
</style>