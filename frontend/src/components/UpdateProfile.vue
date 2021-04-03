<template>
  <div class="updateProfile">
      <form id="formUpdateProfile" @submit.prevent="onSubmitProfile">
          <label for="username">Nom d'utilisateur</label>
          <input v-model="user[0].username" @click="updateValue" type="text" name="username"  >

          <label for="poste">Poste occupé</label>
          <input v-model="user[0].poste" @click="updateValue" type="text" name="Poste" >

          <label for="description">Description</label>
          <input v-model="user[0].description" @click="updateValue" type="text" name="description">

          <label for="imageProfile">Choisir une image de profile</label>
          <input type="file" 
                name="multimedia"
                @change="onSelectImage">

        <button type="submit">Editer</button>
      </form>
  </div>
</template>

<script>
//import ServiceAuth from '@/service/ServiceAuthentification'

export default {
    name: 'updateProfile',
    props:['user'],

    methods:{
         
        updateValue(){
            if(!this.user[0].username){
              this.user[0] = JSON.parse(localStorage.getItem('userData'));  
            }
             
        },

        onSelectImage(event){
         
            this.user[0].imageURL = event.target.files[0];
        },

        onSubmitProfile(){
            const formData = new FormData();
            formData.append('username', this.user[0].username)
            formData.append('poste', this.user[0].poste)
            formData.append('description', this.user[0].description)
            formData.append('multimedia', this.user[0].imageURL)
            /*for(let fd of formData.entries()){
                console.log(fd[0] + ' , ' + fd[1])
            }*/
            const userId = this.$route.params.userId
            this.$store.dispatch('modifyUser', {userId, formData});
            
            this.$emit('close-modal');
        }, 

    }
}
</script>

<style lang="scss">
    #formUpdateProfile{
        display: flex;
        flex-direction: column;

        label{
            color: #E57373;
            font-weight: bold;
            margin-top: 10px;
        }
        input{
            border-radius: 5px;
            margin-top: 5px;
        }
        button{
            margin-top: 10px;
        }
    }
</style>