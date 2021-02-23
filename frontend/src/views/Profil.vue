<template>

  <div class="profil">

    <Menu />
    <main>
      <MenuLateral class="menuLateral" />
      <div class="blocProfil">
        <h1>Page en construction</h1>
      </div>
    </main>
    
  </div>
  
</template>

<script>
import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'

export default {
  nom: 'profil',
  components: {
    Menu,
    MenuLateral
  },

}
</script>

<style lang='scss'>

  main{
    display: flex;

    .blocProfil {
      flex: 3;
    }

  }
</style>