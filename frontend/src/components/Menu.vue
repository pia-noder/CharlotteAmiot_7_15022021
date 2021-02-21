<template>
  <div class='nav'>
      <div class="search">
          <input type="text" name="search" id="search">
      </div>
        <router-link to="/">Home</router-link> |
        <router-link to="/profil">Profil</router-link> |
        <router-link to="/login">Déconnexion</router-link>
  </div>
</template>

<script>
export default {
    name: 'Menu',

}
</script>

<style>
    .nav{
        font-family: 'Montserrat', sans-serif;
    }
</style>