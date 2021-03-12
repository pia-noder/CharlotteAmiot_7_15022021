<template>
  <div class="updateProfile">
      <form id="formUpdateProfile" @submit.prevent="onSubmitProfile">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" name="username">

          <label for="poste">Poste</label>
          <input type="text" name="Poste">

          <label for="description">Description</label>
          <input type="text" name="description">

          <label for="imageProfile">Changer image profile</label>
          <input type="file" name="imageProfile">

        <button type="submit">Editer</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'updateProfile'
}
</script>

<style>
    #formUpdateProfile{
        display: flex;
        flex-direction: column;
    }
</style>