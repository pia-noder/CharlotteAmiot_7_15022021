<template>
  <div class="btnConnection">
      <router-link to="/"><button>Connexion</button></router-link>
      
  </div>
</template>

<script>
export default {
    name: 'btnConnection',
}
</script>

<style>
    button {
        background: linear-gradient(270deg, rgba(229, 115, 155, 0.9), rgba(229, 115, 155, 0.3));
        font-size: 24px;
        padding: 20px 47px;
        border-radius: 27px;
        border:none;
    }
</style>