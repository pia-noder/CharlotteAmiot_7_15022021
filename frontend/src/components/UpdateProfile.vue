<template>
  <div class="updateProfile">
      <form id="formUpdateProfile" @submit.prevent="onSubmitProfile">
          <label for="username">Nom d'utilisateur</label>
          <input v-model="user.username" @click="updateValue" type="text" name="username"  >

          <label for="poste">Poste occupé</label>
          <input v-model="user.poste" @click="updateValue" type="text" name="Poste" >

          <label for="description">Description</label>
          <input v-model="user.description" @click="updateValue" type="text" name="description">

          <label for="imageProfile">Choisir une image de profile</label>
          <input type="file" 
                name="multimedia"
                @change="onSelectImage">

        <button type="submit">Editer</button>
      </form>
  </div>
</template>

<script>
import ServiceAuth from '@/service/ServiceAuthentification'

export default {
    name: 'updateProfile',

    data(){
        return{
         
            user:{}
        }
    },

    methods:{
         
        updateValue(){
            if(!this.user.username){
              this.user = JSON.parse(localStorage.getItem('userData'));  
            }
             
        },
        
       async onSubmitProfile(){
            console.log(this.$route.params.userId)
            const formData = new FormData();
            formData.append('username', this.user.username)
            formData.append('poste', this.user.poste)
            formData.append('description', this.user.description)
            formData.append('multimedia', this.user.imageURL)
            /*for(let fd of formData.entries()){
                console.log(fd[0] + ' , ' + fd[1])
            }*/
           let updatedProfile =  await ServiceAuth.modifyUser(this.$route.params.userId, formData);
           console.log(updatedProfile);
           localStorage.setItem('userData', updatedProfile)
            this.message = 'formData Uploaded !!! Mise à jour des données utilisateur'
        },
        onSelectImage(event){
         
            this.user.imageURL = event.target.files[0];
            console.log(event.target.files[0])
        }

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