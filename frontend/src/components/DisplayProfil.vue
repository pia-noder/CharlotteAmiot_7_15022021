<template>
  <div class="userData">
      <div class="profilImage">
        <button class="btnModalPost" @click="openUpdateProfile">
            <img class="user-image" :src="userData.imageURL" alt="">
        </button>
      </div>

      <div class="profilInfo">
          <p>email : {{ userData.email }}</p>
          <p>Poste: {{ userData.poste }}</p>
          <p>Description: {{ userData.poste }}</p>
          <p>Nom d'utilisateur: {{ userData.username }}</p>
      </div>

      <div id="updateProfile">
          <UpdatePofile class="updateProfile-content" ></UpdatePofile>
      </div>
  </div>
</template>

<script>
window.onclick = function(event) {
var modal = document.getElementById("updateProfile");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

import UpdatePofile from '@/components/UpdateProfile'
export default {
    name: 'blocProfil',

    components: {
        UpdatePofile,
    },

    data () {
        return {
            userData: null,
        }
    },
    async mounted () {
       let user = JSON.parse(localStorage.getItem('userData'));
       this.userData = user;
    },
    methods: {
        openUpdateProfile () {
            var modal = document.getElementById("updateProfile");
           modal.style.display = "block";
        },
    },
}
    
</script>

<style lang="scss">
    .userData{
        display: flex;
        width: 75%;
        border: 2px solid black;
        border-radius: 13px;

        padding: 20px;
        .profilImage{
            width: 25%;

                img{
                width: 50%;
                text-align: center;
            }
        }

        .profilInfo{
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
       
    }
</style>