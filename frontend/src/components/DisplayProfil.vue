<template>
  <div class="userData">
    <div class="profileImage">
    <button class="btnModalProfile" @click="openUpdateProfile">
        <img v-if="user[0].imageURL" :src="user[0].imageURL" alt="image du profil">
    </button>
    </div>

    <div class="profileInfo">
        <p>email : {{ user[0].email }}</p>
        <p>Poste: {{ user[0].poste }}</p>
        <p>Description: {{ user[0].description }}</p>
        <p>Nom d'utilisateur: {{ user[0].username }}</p>
    </div>

    <div id="updateProfile">      
        <UpdatePofile :user="user" @close-modal='closeModal' class="updateProfile-content" ></UpdatePofile>
    </div>

    <div class="deleteUser">
        <button @click="deleteUser(user[0].id)" aria-label="Supprimer utilisateur" title="Supprimer l'utilisateur">
          <font-awesome-icon class="icon fa-lg" icon="user-minus" />
        </button>  
    </div>
      
      
  </div>
</template>

<script>
window.onclick = function(event) {
let modalUpdateProfile = document.getElementById("updateProfile");
  if (event.target == modalUpdateProfile ) {
    modalUpdateProfile .style.display = "none";
  }
}
import ServiceAuth from '@/service/ServiceAuthentification'

import UpdatePofile from '@/components/UpdateProfile'

export default {
    name: 'blocProfil',

    components: {
        UpdatePofile,
    },
    props:['user'],
    data () {
        return {
            userData: null,
        }
    },
 
    methods: {
        openUpdateProfile () {
            var modalUpdateProfile = document.getElementById("updateProfile");
           modalUpdateProfile.style.display = "block";
        },

        closeModal(){
            var modalUpdateProfile  = document.getElementById("updateProfile");
            modalUpdateProfile .style.display = "none";
        },

       async deleteUser(user_id){
           if( confirm('Etes-vous sûre de vouloir supprimer ce compte ?')){
               await ServiceAuth.deleteUser(user_id);
                localStorage.clear();
                this.$router.push({
                    name: 'LogIn',  
                }); 
           }
          
           

        },
        
    },
}
    
</script>

<style lang="scss">
    .userData{
        display: flex;
        width: 50%;
        border: 2px solid black;
        border-radius: 13px;
        margin: auto;

        padding: 10px;
        .profileImage{
            width: 25%;
                .btnModalProfile{
                    background-color: white;
                    border: none;
                    height: 100%;
                }
                img{
                max-width: 150px;
                width: 50%;
                height: 50%;
                text-align: center;
                border-radius: 100%;
            }
        }
    
        .profileInfo{
            width: 75%;

            p{
                padding: 10px;
            }
        }

    #updateProfile {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

        .updateProfile-content {
                background-color: #fefefe;
                margin: 15% auto; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid #888;
                border-radius: 13px;
                width: 60%; /* Could be more or less, depending on screen size */
        }
    }
    .deleteUser{
        button{
            background-color: white;
            border: none;
            cursor: pointer;
            &:hover{
                color: #d00000;
            }
        }
    }   
    }
@media (max-width: 900px){
    .userData{
        display: flex;
        width: 80%;
    }
    .profileInfo{
            width: 65%;
        }
}
</style>