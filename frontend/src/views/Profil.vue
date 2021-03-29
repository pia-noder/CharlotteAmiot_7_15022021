<template>

  <div class="profil">
    <Menu />
    <main>
      <MenuLateral class="menuLateral" />
      <div class="blocProfil">
        <DisplayProfil />
        <div v-for="post in posts"  :key="post.id">
          <UserPosts class="userPosts" :post="post" />
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
  async created (){
        //await this.prepareDynamicList()
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('loadUserPosts',this.$route.params.userId);
    },
    computed: {
        posts(){
            return this.$store.state.userPosts;
        }
    },
}
</script>

<style lang='scss'>

  main{
    display: flex;
    margin-top: 10px ;

    .blocProfil {
      flex: 3;
      width: 50%;
      .userPosts{
        width: 75%;
      }
    }

  }
</style>