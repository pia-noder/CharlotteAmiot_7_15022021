<template>

  <div class="profil">
    <Menu />
    <main>
      <MenuLateral class="menuLateral" />
      <div class="blocProfil">
        <h2>Bienvenue {{user.username}} sur votre page de profile</h2>
        <DisplayProfil />
        <UserPosts class="userPosts" />
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

  data(){
    return{
      user:{
        username: 'Jade',
      }
    }
  }
}
</script>

<style lang='scss'>

  main{
    display: flex;

    .blocProfil {
      flex: 3;
      .userPosts{
        width: 75%;
      }
    }

  }
</style>