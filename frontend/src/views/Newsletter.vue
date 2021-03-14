<template>
  <div class="Newsletter">
      <Menu />
      <main>
        <MenuLateral class="menuLateral"/>
        <div class="blocArticles">
            <h1>Newsletter</h1>
        </div>
      </main>
      
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import MenuLateral from '@/components/MenuLateral.vue'
export default {
    nom: 'Newsletter',
    components: {
        Menu,
        MenuLateral,
    }
}
</script>

<style lang='scss'>

    main{
        display: flex;

        .menuLateral {
            flex: 1;
        }

        .blocArticles {
            flex: 3;
        }

    }

</style>