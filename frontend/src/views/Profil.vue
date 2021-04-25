<template>

  <div class="profil">
    <Menu />
    <main>
      <MenuLateral class="menuLateral" />
      <div class="blocProfil">
        <DisplayProfil :user="user" />
        <div class="loop" v-for="post in posts"  :key="post.id">
          <UserPosts class="userPosts" :post="post" :user="user" />
        </div>
      
        
      </div>
    </main>
    
  </div>
  
</template>

<script>


import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
import DisplayProfil from '@/components/DisplayProfil.vue'
import UserPosts from '@/components/userPosts.vue'


export default {
  nom: 'profil',
  components: {
    Menu,
    MenuLateral,
    DisplayProfil,
    UserPosts
  },
  async beforeCreate (){
    await this.$store.dispatch('loadUserPosts',this.$route.params.userId);
    //this.$store.dispatch('loadUser', this.$route.params.userId );
    },
  computed: {
    posts(){
      return this.$store.state.userPosts;
    },
    user(){
      return this.$store.state.user;
      }
  },

}
</script>

<style lang='scss'>

  main{
    margin-top: 15vh ;

    .blocProfil {
      width: 100%;
      margin-top: 5vh;

      .loop{
        margin-top: 30px;

        .userPosts{
        width: 50%;
        margin: auto;
        }
      }  
    }
  }

  @media (max-width: 900px){
  main{

    .blocProfil {
      
      .loop{

        .userPosts{
          width: 80%;
        }
      }
    }
  }
}
</style>