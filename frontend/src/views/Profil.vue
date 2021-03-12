<template>

  <div class="profil">

    <Menu />
    <main>
      <MenuLateral class="menuLateral" />
      <div class="blocProfil">
        <DisplayProfil />
      </div>
    </main>
    
  </div>
  
</template>

<script>
import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
import DisplayProfil from '@/components/DisplayProfil.vue'

export default {
  nom: 'profil',
  components: {
    Menu,
    MenuLateral,
    DisplayProfil
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