<template>
  <div class="notifications">
      <Menu />
      <main>
          <MenuLateral class="menuLateral" />
          <div class="blocNotification">
              <h1>Notifications</h1>
          </div>
      </main>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
export default {
    nom: 'Notifications',
    components: {
        Menu,
        MenuLateral
    }
}
</script>

<style lang='scss'>

main{
    display: flex;

    .blocNotification {
        flex: 3;
    }
}

</style>