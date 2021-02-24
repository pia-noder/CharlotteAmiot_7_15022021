<template>

  <div class="menuLateral">
      <router-link class="link" to="/Notifications">Notifications</router-link>
      <router-link class="link" to="/Newsletter">Newsletter</router-link>
      <button class="btnDisplayToPost">Publier</button>
  </div>

</template>

<script>
export default {
    nom: 'MenuLateral',
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.menuLateral {
    display: flex;
    flex-direction: column;

    margin-top: 95px;

    .link {
        margin-left: 25%;
        font-size: 1.5rem;
        font-family: 'Montserrat', sans-serif;
    }

    .btnDisplayToPost {
        width: 25%;
        margin-left: 25%;
        padding: 10px 0px;
        border-radius: 13px;
    }
}

</style>